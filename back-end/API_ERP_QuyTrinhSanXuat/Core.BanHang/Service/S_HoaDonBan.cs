using Common.ApiResponse;
using Common.ExceptionResponse;
using Common.JwtSecurity;
using Common.Utilities;
using Core.BanHang.Interface;
using Core.BanHang.Request;
using Core.BanHang.Response;
using DataContext.Entity;
using DataContext.MyDbContext;
using DataContext.MyDbQuery;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.BanHang.Service
{
    public interface IS_HoaDonBan : IQuanLyBanHang<MRes_HoaDon, MReq_HoaDon> {
        Task<ApiDataResponse<MRes_HoaDon>> GetHoaDonByMaHD(string hoaDonId, string acces);
        Task<ApiDataResponse<bool>> GuiEmail(string email,int id, string acces);
    }
    public class S_HoaDonBan : IS_HoaDonBan
    {
        private MyContext _context;
        public S_HoaDonBan(MyContext context)
        {
            _context = context;
        }

        public async Task<ApiDataResponse<bool>> Create(MReq_HoaDon model, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                string str = "Select  dh.TongGTriDH,pt.SoPhanTramTraTruoc,pt.Id from dh DonHang inner join pt PhuongThucThanhToan where dh.Id = @donHangId ";

                SqlParameter[] parametter = new[]
                {
                    new SqlParameter("@donHangId",model.DonHangId)
                };

                var dt=await MyQuery.GetData(str,_context.Database.GetConnectionString(),CommandType.Text,parametter);

                DataRow dr= dt.Rows[0];

                int tongGtriDH = Convert.ToInt32(dr["TongGTriDH"]);
                int phantramtra = Convert.ToInt32(dr["SoPhanTramTraTruoc"]);
                int phuongThucId = Convert.ToInt32(dr["Id"]);


                var HoaDon = new HoaDon
                {
                    MaHD = model.MaHD,
                    NgayLap = model.NgayLap,
                    DonHangId = model.DonHangId,
                    TinhTrangHoaDon = model.TinhTrangHoaDon,
                    PhuongThucThanhToanId = phuongThucId,
                    SoTienTra = (tongGtriDH * phantramtra) / 100
                };

                _context.AddAsync(HoaDon);
                var save = await _context.SaveChangesAsync();

                if (save == 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.CreateDataSucces, true);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;

            }
        }

        public async Task<ApiDataResponse<bool>> Delete(int id, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {

                var query = await _context.HoaDons.SingleOrDefaultAsync(x => x.Id == id);
                if (query == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }


                _context.HoaDons.Remove(query);
                res = new ApiDataResponse<bool>(ExceptionMesseger.DeleteSucces, true);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_HoaDon>> GetById(int id, string access)
        {
            var res = await JwtSetting<MRes_HoaDon>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var hd = await _context.HoaDons.SingleOrDefaultAsync(x => x.Id==id);

                var donhang = await _context.DonHangs.Include(x => x.KhachHang).Include(x => x.ChiTietDonHangs).SingleOrDefaultAsync(x => x.Id == hd.DonHangId);

                var pt = await _context.PhuongThucThanhToans.SingleOrDefaultAsync(x => x.Id == donhang.PhuongThucThanhToanId);
                MRes_HoaDon h = new MRes_HoaDon
                {
                    Id = hd.Id,
                    MaHD = hd.MaHD,
                    TenKhachHang = donhang.KhachHang.HoTenKh,
                    NgayLap = hd.NgayLap,
                    NgayTra = hd.NgayTra,
                    TinhTrangHoaDon = hd.TinhTrangHoaDon,
                    DonHangId = donhang.Id,
                    PhuongThucThanhToanId = hd.PhuongThucThanhToanId,
                    SoTienTra = hd.SoTienTra,
                    Thue = donhang.Thue,
                    TongGTriDH = donhang.TongGTriDH,
                    PhanTramTra = pt.SoPhanTramTraTruoc,
                    hinhAnhKhach = donhang.KhachHang.HinhAnh

                };

                foreach (var i in donhang.ChiTietDonHangs)
                {
                    h.ChiTietDonHangs.Add(new MRes_ChiTietDonHang
                    {
                        DonHangId = i.DonHangId,
                        SanPhamId = i.SanPhamId,
                        DonGia = i.DonGia,
                        SoLuongHang = i.SoLuongHang,
                        ThanhTien = (i.SoLuongHang * i.DonGia) + (i.SoLuongHang * i.DonGia) * i.Thue / 100,
                        Thue = i.Thue,
                        TrangThai = i.TrangThai,

                    });
                }

                res = new ApiDataResponse<MRes_HoaDon>(ExceptionMesseger.GetDataSucces, h);
                return res;
            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<MRes_HoaDon>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_Pagination<List<MRes_HoaDon>>>> GetByPage(MReq_Pagination model, string access)
        {
            var res = await JwtSetting<MRes_Pagination<List<MRes_HoaDon>>>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var qeury = await _context.HoaDons.ToArrayAsync();

                
                List<MRes_HoaDon> lst = new List<MRes_HoaDon>();
                foreach (var i in qeury)
                {
             
                    MRes_HoaDon k = new MRes_HoaDon
                    {
                        MaHD = i.MaHD,
                        DonHangId = i.DonHangId.Value,
                        NgayLap = i.NgayLap,
                        NgayTra = i.NgayTra,
                        Id = i.Id,
                        SoLan=i.SoLan.Value,
                        CreateAt = i.CreateAt,
                        CreateBy = i.CreateBy,
                        UpdateAt = i.UpdateAt,
                        UpdateBy = i.UpdateBy,
                        TinhTrangHoaDon=i.TinhTrangHoaDon,
                        SoTienTra=i.SoTienTra,
                    };
                    lst.Add(k);

                    var dh = await _context.DonHangs.SingleOrDefaultAsync(x => x.Id == i.DonHangId);
                    if (dh != null)
                    {
                        k.MaDH = dh.MaDH;
                    }
                }

                var pagamin = new MRes_Pagination<List<MRes_HoaDon>>
                {
                    Data = lst,
                };

                res = new ApiDataResponse<MRes_Pagination<List<MRes_HoaDon>>>(ExceptionMesseger.GetDataSucces, pagamin);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<MRes_Pagination<List<MRes_HoaDon>>>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_HoaDon>> GetHoaDonByMaHD(string hoaDonId, string acces)
        {
            var res = await JwtSetting<MRes_HoaDon>.GiaiToken(acces, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var hd = await _context.HoaDons.SingleOrDefaultAsync(x => x.MaHD.Equals(hoaDonId));

                var donhang = await _context.DonHangs.Include(x=>x.KhachHang).Include(x => x.ChiTietDonHangs).Include(x=>x.PhuongThucThanhToan).SingleOrDefaultAsync(x => x.Id == hd.DonHangId);

                MRes_HoaDon h = new MRes_HoaDon
                {
                    Id = hd.Id,
                    MaHD = hd.MaHD,
                    TenKhachHang = donhang.KhachHang.HoTenKh,
                    NgayLap = hd.NgayLap,
                    NgayTra = hd.NgayTra,
                    TinhTrangHoaDon = hd.TinhTrangHoaDon,
                    DonHangId = donhang.Id,
                    PhuongThucThanhToanId = hd.PhuongThucThanhToanId,
                    SoTienTra = hd.SoTienTra,
                    Thue = donhang.Thue,
                    TongGTriDH = donhang.TongGTriDH,
                    SoLan = hd.SoLan.Value,
                    hinhAnhKhach=donhang.KhachHang.HinhAnh
                };

                if(hd.SoLan==1)
                {
                    h.PhanTramTra = donhang.PhuongThucThanhToan.SoPhanTramTraTruoc;
                }
                else
                {
                    h.PhanTramTra = 100 - donhang.PhuongThucThanhToan.SoPhanTramTraTruoc;
                }

                foreach (var i in donhang.ChiTietDonHangs)
                {
                    h.ChiTietDonHangs.Add(new MRes_ChiTietDonHang
                    {
                        DonHangId = i.DonHangId,
                        SanPhamId = i.SanPhamId,
                        DonGia = i.DonGia,
                        SoLuongHang = i.SoLuongHang,
                        ThanhTien =(i.SoLuongHang*i.DonGia)+ (i.SoLuongHang * i.DonGia)*i.Thue/100,
                        Thue = i.Thue,
                        TrangThai = i.TrangThai,
                        
                    });
                }

                res = new ApiDataResponse<MRes_HoaDon>(ExceptionMesseger.GetDataSucces, h);
                return res;
            }catch(Exception ex)
            {
                res=new ApiDataResponse<MRes_HoaDon>("Lỗi hệ thống :"+ex.Message,ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> GuiEmail(string email, int id,string acces)
        {
            var res = await JwtSetting<bool>.GiaiToken(acces, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());

            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var data = await _context.HoaDons.SingleOrDefaultAsync(x => x.Id == id);


                var save = await _context.SaveChangesAsync();
                if (save == 0)
                {
                    return res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                }

                var result = EmailSTMP.SendEmail(email, data);

                if (result == false)
                {
                    res = new ApiDataResponse<bool>("Gửi email thất bại !!!", ExceptionCode.BadRequest);
                    return res;
                }



                res = new ApiDataResponse<bool>("Gửi email thành công !!!", result);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;

            }
        }

        public async Task<ApiDataResponse<bool>> Update(MReq_HoaDon model, int id, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var HoaDonBan = await _context.HoaDons.SingleOrDefaultAsync(k => k.Id == id);
                if (HoaDonBan == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }


                HoaDonBan.UpdateBy = model.UpdateBy;
                HoaDonBan.UpdateAt = DateTime.UtcNow;

                _context.HoaDons.Update(HoaDonBan);

                var save = await _context.SaveChangesAsync();

                if (save == 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.CreateDataSucces, true);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;

            }
        }

        public async Task<ApiDataResponse<bool>> UpdateState(int id, int state, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var query = await _context.HoaDons.SingleOrDefaultAsync(x => x.Id == id);

                if (query.TinhTrangHoaDon != 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                query.TinhTrangHoaDon = state;
                if(state==2)
                {
                    query.NgayTra = DateTime.UtcNow;
                }



                _context.HoaDons.Update(query);
                var save = await _context.SaveChangesAsync();
                if (save == 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.EditSucces, true);
                return res;

            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :"+ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }
        
    }
}
