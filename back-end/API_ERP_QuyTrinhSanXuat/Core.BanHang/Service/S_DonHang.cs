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
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Core.BanHang.Service
{
    public interface IS_DonHang : IQuanLyBanHang<MRes_DonHang,MReq_DonHang> {
        Task<ApiDataResponse<MRes_Pagination<List<MRes_DonHang>>>> GetBaoGia(MReq_Pagination model, string access);
        Task<ApiDataResponse<bool>> CreateBaoGia(MReq_DonHang model, string access);
        Task<ApiDataResponse<MRes_DonHang>> GetBaoGiaById(int id,string access);
        Task<ApiDataResponse<bool>> ChuyenBaoGiaThanhDonHang(int id,string access);
        Task<ApiDataResponse<MRes_DonHang>> GetBaoGiaByMaBG(string maBG,string access);
        Task<ApiDataResponse<MRes_DonHang>> GetDonHangByMaDH(string maDH,string access);
        Task<ApiDataResponse<bool>> KiemTraTon(int idSP,int idDH,string access);
        Task<ApiDataResponse<string>> TaoLenhSX(MReq_SanXuat model, string access);
        Task<ApiDataResponse<string>> TaoHoaDon(int donHangId,int createBy,string access);
        Task<ApiDataResponse<bool>> GuiEmails(int id,string email,string access);
        Task<ApiDataResponse<string>> TaoThanhToan(int donHangId, int createBy, string access);

    }
    public class S_DonHang : IS_DonHang
    {
        private readonly MyContext _context;

        private readonly int Dong_Y = 2;
        private readonly int Gui_Email = 1;
        private readonly int Mac_Dinh = 0;
        public S_DonHang(MyContext context)
        {
            _context = context;
        }

        public async Task<ApiDataResponse<bool>> ChuyenBaoGiaThanhDonHang(int id, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var qeury = await _context.DonHangs.Include(x => x.ChiTietDonHangs).Include(x => x.KhachHang).SingleOrDefaultAsync(x => x.Id == id && x.IsDonHang == false);
                if (qeury == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }


                if (qeury.IsDonHang == true)
                {
                    res = new ApiDataResponse<bool>("Báo giá đã chuyển thành đơn hàng !", ExceptionCode.BadRequest);
                    return res;
                }

                qeury.IsDonHang = true;
                qeury.TrangThai = Mac_Dinh;
                qeury.MaDH = "DH" + qeury.MaDH.Substring(2);

                var save = await _context.SaveChangesAsync();
                if (save == 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.GetDataSucces, true);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> Create(MReq_DonHang model, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var dh = new DonHang
                {
                    MaDH = model.MaDH,
                    KhachHangId = model.KhachHangId,
                    HetHan = model.HetHan,
                    NgayDatHang = model.NgayDatHang,
                    NgayGiaoHang = model.NgayGiaoHang,
                    Thue = model.Thue,
                    IsDonHang = true,
                    PhuongThucThanhToanId = model.PhuongThucThanhToanId,
                    TrangThai = Mac_Dinh,
                    HieuLuc = DateTime.UtcNow,
                    KhoChuaId = model.KhoChuaId,
                    CreateBy = model.CreateBy,
                    CreateAt = model.CreateAt,
                };





                foreach (var i in model.ChiTietDonHangs)
                {
                    dh.TienTruocThue =dh.TienTruocThue+(i.SoLuongHang*i.DonGia)+(i.SoLuongHang*i.DonGia)/100;
                    dh.TongHang += i.SoLuongHang;

                    var ctdh = new ChiTietDonHang
                    {
                        SanPhamId = i.SanPhamId,
                        DonGia = i.DonGia,
                        SoLuongHang = i.SoLuongHang,
                        ThanhTien = (i.SoLuongHang * i.DonGia) + (i.SoLuongHang * i.DonGia * (i.Thue / 100)),
                        Thue = i.Thue,
                        DonViTinh = i.DVTinhId
                    };
                    //await _context.ChiTietDonHangs.AddAsync(ctdh);
                    dh.ChiTietDonHangs.Add(ctdh);
                }

                dh.TongGTriDH = dh.TienTruocThue + (dh.TienTruocThue * dh.Thue / 100);


                await _context.DonHangs.AddAsync(dh);
                await _context.ChiTietDonHangs.AddRangeAsync(dh.ChiTietDonHangs);
                var save = await _context.SaveChangesAsync();

                if (save == 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.CreateDataSucces, true);
                return res;

            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> CreateBaoGia(MReq_DonHang model, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var dh = new DonHang
                {
                    MaDH = model.MaDH,
                    KhachHangId = model.KhachHangId,
                    PhuongThucThanhToanId = null,
                    TrangThai = Mac_Dinh,
                    HetHan = model.HetHan,
                    NgayDatHang = model.NgayDatHang,
                    NgayGiaoHang = model.NgayGiaoHang,
                    Thue = model.Thue,
                    CreateBy = model.CreateBy,
                    CreateAt = model.CreateAt,
                    IsDonHang = false,
                    HieuLuc = model.HieuLuc,

                };





                foreach (var i in model.ChiTietDonHangs)
                {
                    dh.TienTruocThue += i.ThanhTien;
                    dh.TongHang += i.SoLuongHang;

                    var ctdh = new ChiTietDonHang
                    {
                        SanPhamId = i.SanPhamId,
                        DonGia = i.DonGia,
                        SoLuongHang = i.SoLuongHang,
                        ThanhTien = i.ThanhTien,
                        Thue = i.Thue,
                        DonViTinh = i.DVTinhId
                    };
                    //await _context.ChiTietDonHangs.AddAsync(ctdh);
                    dh.ChiTietDonHangs.Add(ctdh);
                }

                dh.TongGTriDH = dh.TienTruocThue + (dh.TienTruocThue * dh.Thue / 100);


                await _context.DonHangs.AddAsync(dh);
                await _context.ChiTietDonHangs.AddRangeAsync(dh.ChiTietDonHangs);
                var save = await _context.SaveChangesAsync();

                if (save == 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.CreateDataSucces, true);
                return res;

            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
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
                var qeury = await _context.DonHangs.SingleOrDefaultAsync(x => x.Id == id);
                if (qeury == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }


                _context.DonHangs.Remove(qeury);

                var save = await _context.SaveChangesAsync();
                if (save == 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.DeleteSucces, true);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_Pagination<List<MRes_DonHang>>>> GetBaoGia(MReq_Pagination model, string access)
        {
            var res = await JwtSetting<MRes_Pagination<List<MRes_DonHang>>>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var query = await _context.DonHangs.Where(x => x.IsDonHang == false).ToListAsync();
                List<MRes_DonHang> lst = new List<MRes_DonHang>();
                foreach (var i in query)
                {
                    lst.Add(new MRes_DonHang
                    {
                        Id = i.Id,
                        MaDH = i.MaDH,
                        TongGTriDH = i.TongGTriDH,
                        TongHang = i.TongHang,
                        TrangThai = i.TrangThai,

                    });
                }

                MRes_Pagination<List<MRes_DonHang>> pagin = new MRes_Pagination<List<MRes_DonHang>>
                {
                    Data = lst,

                };

                res = new ApiDataResponse<MRes_Pagination<List<MRes_DonHang>>>(ExceptionMesseger.GetDataSucces, pagin);
                return res;

            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<MRes_Pagination<List<MRes_DonHang>>>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_DonHang>> GetBaoGiaById(int id, string access)
        {
            var res = await JwtSetting<MRes_DonHang>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var qeury = await _context.DonHangs.Include(x => x.ChiTietDonHangs).Include(x => x.KhachHang).SingleOrDefaultAsync(x => x.Id == id && x.IsDonHang == false);
                if (qeury == null)
                {
                    res = new ApiDataResponse<MRes_DonHang>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }


                //string str = "select HoTenNhanSu from NhanSu where Id = @id";

                //SqlParameter[] parametter = new[]
                //{
                //    new SqlParameter("@id",qeury.CreateBy),
                //};

                //var dt = await MyQuery.GetData(str, _context.Database.GetConnectionString(),CommandType.Text,parametter);

                //DataRow dr=dt.Rows[0];

                //string tennhansu = dr["HoTenNhanSu"].ToString();

                MRes_DonHang donhang = new MRes_DonHang()
                {
                    Id = qeury.Id,
                    MaDH = qeury.MaDH,
                    KhachHangId = qeury.KhachHangId,
                    TongGTriDH = qeury.TongGTriDH,
                    TongHang = qeury.TongHang,
                    Thue = qeury.Thue,
                    TienTruocThue = qeury.TienTruocThue,
                    PhuongThucThanhToanId = qeury.PhuongThucThanhToanId,
                    HetHan = qeury.HetHan,
                    NgayDatHang = qeury.NgayDatHang,
                    NgayGiaoHang = qeury.NgayGiaoHang,
                    IsDonHang = qeury.IsDonHang,
                    TenKhachHang = qeury.KhachHang.HoTenKh,
                    TrangThai = qeury.TrangThai,
                    CreateAt = qeury.CreateAt,
                    UpdateAt = qeury.UpdateAt,
                    CreateBy = qeury.CreateBy,
                    UpdateBy = qeury.UpdateBy,
                    HieuLuc=qeury.HieuLuc,
                    HinhAnhKhach=qeury.KhachHang.HinhAnh
                };

                if (qeury.ChiTietDonHangs != null && qeury.ChiTietDonHangs.Any())
                {
                    foreach (var i in qeury.ChiTietDonHangs)
                    {
                        donhang.ChiTietDonHangs.Add(new MRes_ChiTietDonHang
                        {
                            SanPhamId = i.SanPhamId,
                            DonHangId = i.DonHangId,
                            DonGia = i.DonGia,
                            SoLuongHang = i.SoLuongHang,
                            ThanhTien = i.ThanhTien,
                            Thue = i.Thue,
                            TrangThai = i.TrangThai
                        });
                    }
                }

                var nhansu = await _context.NhanSus.SingleOrDefaultAsync(x => x.Id == donhang.CreateBy);

                donhang.TenNhanSu = nhansu.HoTenNhanSu;
                res = new ApiDataResponse<MRes_DonHang>(ExceptionMesseger.GetDataSucces, donhang);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<MRes_DonHang>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_DonHang>> GetBaoGiaByMaBG(string maBG, string access)
        {
            var res = await JwtSetting<MRes_DonHang>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var qeury = await _context.DonHangs.Include(x => x.ChiTietDonHangs).Include(x => x.KhachHang).SingleOrDefaultAsync(x => x.MaDH.Equals(maBG) && x.IsDonHang == false);
                if (qeury == null)
                {
                    res = new ApiDataResponse<MRes_DonHang>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                MRes_DonHang donhang = new MRes_DonHang()
                {
                    Id = qeury.Id,
                    MaDH = qeury.MaDH,
                    KhachHangId = qeury.KhachHangId,
                    TongGTriDH = qeury.TongGTriDH,
                    TongHang = qeury.TongHang,
                    Thue = qeury.Thue,
                    TienTruocThue = qeury.TienTruocThue,
                    PhuongThucThanhToanId = qeury.PhuongThucThanhToanId,
                    HetHan = qeury.HetHan,
                    NgayDatHang = qeury.NgayDatHang,
                    NgayGiaoHang = qeury.NgayGiaoHang,
                    IsDonHang = qeury.IsDonHang,
                    TenKhachHang = qeury.KhachHang.HoTenKh,
                    TrangThai = qeury.TrangThai,
                    CreateAt = qeury.CreateAt,
                    UpdateAt = qeury.UpdateAt,
                    CreateBy = qeury.CreateBy,
                    UpdateBy = qeury.UpdateBy,
                    HinhAnhKhach = qeury.KhachHang.HinhAnh

                };

                if (qeury.ChiTietDonHangs != null && qeury.ChiTietDonHangs.Any())
                {
                    foreach (var i in qeury.ChiTietDonHangs)
                    {
                        donhang.ChiTietDonHangs.Add(new MRes_ChiTietDonHang
                        {
                            SanPhamId = i.SanPhamId,
                            DonHangId = i.DonHangId,
                            DonGia = i.DonGia,
                            SoLuongHang = i.SoLuongHang,
                            ThanhTien = i.ThanhTien,
                            Thue = i.Thue
                        });
                    }
                }
                res = new ApiDataResponse<MRes_DonHang>(ExceptionMesseger.GetDataSucces, donhang);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<MRes_DonHang>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_DonHang>> GetById(int id, string access)
        {
            var res = await JwtSetting<MRes_DonHang>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var qeury = await _context.DonHangs.Include(x => x.ChiTietDonHangs).Include(x => x.KhachHang).SingleOrDefaultAsync(x => x.Id == id && x.IsDonHang == true);
                if (qeury == null)
                {
                    res = new ApiDataResponse<MRes_DonHang>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                var nhansu = await _context.NhanSus.SingleOrDefaultAsync(x => x.Id == qeury.CreateBy);

                MRes_DonHang donhang = new MRes_DonHang()
                {
                    Id = qeury.Id,
                    MaDH = qeury.MaDH,
                    KhachHangId = qeury.KhachHangId,
                    TongGTriDH = qeury.TongGTriDH,
                    TongHang = qeury.TongHang,
                    Thue = qeury.Thue,
                    TienTruocThue = qeury.TienTruocThue,
                    PhuongThucThanhToanId = qeury.PhuongThucThanhToanId,
                    HetHan = qeury.HetHan,
                    NgayDatHang = qeury.NgayDatHang,
                    NgayGiaoHang = qeury.NgayGiaoHang,
                    IsDonHang = qeury.IsDonHang,
                    TenKhachHang = qeury.KhachHang.HoTenKh,
                    TrangThai = qeury.TrangThai,
                    CreateAt = qeury.CreateAt,
                    UpdateAt = qeury.UpdateAt,
                    CreateBy = qeury.CreateBy,
                    UpdateBy = qeury.UpdateBy,
                    TenNhanSu = nhansu.HoTenNhanSu,
                    KhoChuaId = qeury.KhoChuaId,
                   HieuLuc=qeury.HieuLuc,
                                       HinhAnhKhach = qeury.KhachHang.HinhAnh

                };

                if (qeury.ChiTietDonHangs != null && qeury.ChiTietDonHangs.Any())
                {
                    foreach (var i in qeury.ChiTietDonHangs)
                    {
                        donhang.ChiTietDonHangs.Add(new MRes_ChiTietDonHang
                        {
                            SanPhamId = i.SanPhamId,
                            DonHangId = i.DonHangId,
                            DonGia = i.DonGia,
                            SoLuongHang = i.SoLuongHang,
                            ThanhTien = i.ThanhTien,
                            Thue = i.Thue,
                            TrangThai = i.TrangThai,
                        });
                    }
                }
                res = new ApiDataResponse<MRes_DonHang>(ExceptionMesseger.GetDataSucces, donhang);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<MRes_DonHang>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_Pagination<List<MRes_DonHang>>>> GetByPage(MReq_Pagination model, string access)
        {
            var res = await JwtSetting<MRes_Pagination<List<MRes_DonHang>>>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var query = await _context.DonHangs.Where(x => x.IsDonHang == true).ToListAsync();
                List<MRes_DonHang> lst = new List<MRes_DonHang>();
                foreach (var i in query)
                {
                    lst.Add(new MRes_DonHang
                    {
                        Id = i.Id,
                        MaDH = i.MaDH,
                        TongGTriDH = i.TongGTriDH,
                        TongHang = i.TongHang,
                        TrangThai = i.TrangThai
                    });
                }

                MRes_Pagination<List<MRes_DonHang>> pagin = new MRes_Pagination<List<MRes_DonHang>>
                {
                    Data = lst,

                };

                res = new ApiDataResponse<MRes_Pagination<List<MRes_DonHang>>>(ExceptionMesseger.GetDataSucces, pagin);
                return res;

            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<MRes_Pagination<List<MRes_DonHang>>>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_DonHang>> GetDonHangByMaDH(string maDH, string access)
        {
            var res = await JwtSetting<MRes_DonHang>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var qeury = await _context.DonHangs.Include(x => x.ChiTietDonHangs).Include(x => x.KhachHang).SingleOrDefaultAsync(x => x.MaDH.Equals(maDH) && x.IsDonHang == true);
                if (qeury == null)
                {
                    res = new ApiDataResponse<MRes_DonHang>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                MRes_DonHang donhang = new MRes_DonHang()
                {
                    Id = qeury.Id,
                    MaDH = qeury.MaDH,
                    KhachHangId = qeury.KhachHangId,
                    TongGTriDH = qeury.TongGTriDH,
                    TongHang = qeury.TongHang,
                    Thue = qeury.Thue,
                    TienTruocThue = qeury.TienTruocThue,
                    PhuongThucThanhToanId = qeury.PhuongThucThanhToanId,
                    HetHan = qeury.HetHan,
                    NgayDatHang = qeury.NgayDatHang,
                    NgayGiaoHang = qeury.NgayGiaoHang,
                    IsDonHang = qeury.IsDonHang,
                    TenKhachHang = qeury.KhachHang.HoTenKh,
                    TrangThai = qeury.TrangThai,
                    CreateAt = qeury.CreateAt,
                    UpdateAt = qeury.UpdateAt,
                    CreateBy = qeury.CreateBy,
                    UpdateBy = qeury.UpdateBy,
                    KhoChuaId = qeury.KhoChuaId,

                };

                if (qeury.ChiTietDonHangs != null && qeury.ChiTietDonHangs.Any())
                {
                    foreach (var i in qeury.ChiTietDonHangs)
                    {
                        donhang.ChiTietDonHangs.Add(new MRes_ChiTietDonHang
                        {
                            SanPhamId = i.SanPhamId,
                            DonHangId = i.DonHangId,
                            DonGia = i.DonGia,
                            SoLuongHang = i.SoLuongHang,
                            ThanhTien = i.ThanhTien,
                            Thue = i.Thue
                        });
                    }
                }
                res = new ApiDataResponse<MRes_DonHang>(ExceptionMesseger.GetDataSucces, donhang);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<MRes_DonHang>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> GuiEmails(int id, string email, string access)
        {

            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());

            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var data = await _context.DonHangs.Include(x=>x.KhachHang).Include(x=>x.ChiTietDonHangs).ThenInclude(x=>x.SanPham).SingleOrDefaultAsync(x => x.Id == id);
 

 

                var result = EmailSTMP.SendEmail(email, data);

                if (result == false)
                {
                    res = new ApiDataResponse<bool>("Gửi email thất bại !!!", ExceptionCode.BadRequest);
                    return res;
                }


                data.TrangThai = Gui_Email;
                var save = 0;

                if(data.IsDonHang==false)
                {
                    save = await _context.SaveChangesAsync();
                }

                //if (save == 0)
                //{
                //    return res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                //}
                res = new ApiDataResponse<bool>("Gửi email thành công !!!", result);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;

            }
        }

        public async Task<ApiDataResponse<bool>> KiemTraTon(int idSP, int idDH, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {


                var ctdh = await _context.ChiTietDonHangs.Include(x=>x.DonHang).SingleOrDefaultAsync(x => x.SanPhamId == idSP && x.DonHangId == idDH);

                if(ctdh.DonHang.TrangThai==0)
                {
                    res=new ApiDataResponse<bool>(ExceptionMesseger.BadRequest,ExceptionCode.BadRequest);
                    return res;
                }

                int tonKho = await _context.KhoSanPhams.Where(x => x.SanPhamId == idSP).SumAsync(x => x.SoLuongTon);

                int soluongmua = ctdh.SoLuongHang;


                if (soluongmua > tonKho)
                {
                    ctdh.TrangThai = 1;
                }
                else
                {
                    ctdh.TrangThai = 2;
                }



                _context.ChiTietDonHangs.Update(ctdh);

                var save = await _context.SaveChangesAsync();

                if (save == 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.GetDataSucces, true);
                return res;
            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<string>> TaoHoaDon(int donHangId, int createBy, string access)
        {
            var res = await JwtSetting<string>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }


            try
            {
                var hoadon = await _context.HoaDons.SingleOrDefaultAsync(x => x.DonHangId == donHangId && x.SoLan == 1);
                if (hoadon != null)
                {
                    res = new ApiDataResponse<string>(ExceptionMesseger.GetDataSucces, hoadon.MaHD);
                    return res;
                }


                



                var donhang = await _context.DonHangs.Include(x => x.PhuongThucThanhToan).SingleOrDefaultAsync(x => x.Id == donHangId);
                var pt = await _context.PhuongThucThanhToans.SingleOrDefaultAsync(x => x.Id == donhang.PhuongThucThanhToanId);
                if (donhang.TrangThai !=0)
                {
                    res = new ApiDataResponse<string>(ExceptionMesseger.GetDataSucces, ExceptionCode.BadRequest);
                    return res;
                }

                double sotientra = (donhang.TongGTriDH* pt.SoPhanTramTraTruoc)/ 100;
                
                HoaDon h = new HoaDon
                {
                    SoLan = 1,
                    DonHangId = donHangId,
                    CreateBy = createBy,
                    PhuongThucThanhToanId = donhang.PhuongThucThanhToanId,
                    SoTienTra = sotientra,
                    NgayLap = DateTime.UtcNow,
                    TinhTrangHoaDon = 0,
                };

                await _context.HoaDons.AddAsync(h);

                var save = await _context.SaveChangesAsync();
                if (save == 0)
                {
                    res = new ApiDataResponse<string>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                res = new ApiDataResponse<string>(ExceptionMesseger.CreateDataSucces, sotientra.ToString()+" "+pt.SoPhanTramTraTruoc.ToString());
                return res;
            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<string>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<string>> TaoLenhSX(MReq_SanXuat model, string access)
        {
            var res = await JwtSetting<string>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());

            if (res.Code > 200)
            {
                return res;
            }


            try
            {
                var donhang = await _context.DonHangs.SingleOrDefaultAsync(x => x.Id == model.DonHangId);
                if (donhang.TrangThai == 0) {
                    res = new ApiDataResponse<string>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;

                }


                var kiemta = await _context.LenhSXs.SingleOrDefaultAsync(x => x.DonHangId == model.DonHangId && x.SanPhamId == model.SanPhamId);

                if (kiemta != null)
                {
                    res = new ApiDataResponse<string>("Lệnh đã được tạo !!!", kiemta.MaLenhSX);
                    return res;
                }

                var tonKho = await _context.KhoSanPhams.Where(x => x.SanPhamId == model.SanPhamId).SumAsync(x => x.SoLuongTon);



                if (model.TrangThai == 0)
                {

                    res = new ApiDataResponse<string>("Sản phẩm chưa kiểm tra !!!", ExceptionCode.BadRequest);
                    return res;
                }

                if (tonKho > model.SoLuongMua)
                {
                    var ct = await _context.ChiTietDonHangs.SingleOrDefaultAsync(x => x.SanPhamId == model.SanPhamId && x.DonHangId == model.DonHangId);

                    ct.TrangThai = 2;
                    var save2 = await _context.SaveChangesAsync();

                    if (save2 == 0)
                    {
                        res = new ApiDataResponse<string>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                        return res;
                    }

                    res = new ApiDataResponse<string>("Sản phẩm đã đủ !!!", ExceptionCode.BadRequest);
                    return res;
                }

                LenhSX lsx = new LenhSX
                {
                    SoLuongSX = model.SoLuongMua,
                    TrangThaiLenh = 1,
                    SanPhamId = model.SanPhamId,
                    DonHangId = model.DonHangId,
                    UpdateBy = model.UpdateBy,
                    CreateBy = model.CreateBy,
                    KhoChuaId = donhang.KhoChuaId,
                    

                };

                var sp = await _context.SanPhams.Include(x => x.VatTuCanDungs).ThenInclude(x => x.VatTu).SingleOrDefaultAsync(x => x.Id == model.SanPhamId);

                foreach (var i in sp.VatTuCanDungs)
                {
                    lsx.chiTietCheTaos.Add(new ChiTietCheTao
                    {
                        VatTuId = i.VatTu.Id,
                        GiaVatTu = i.VatTu.GiaBan,
                        SoLuongCan = i.SoLuongCan * model.SoLuongMua,
                        ThanhTien = i.VatTu.GiaBan * i.SoLuongCan,
                        TrangThai = 0
                    });
                }

                _context.LenhSXs.Add(lsx);
                var save = await _context.SaveChangesAsync();
                if (save == 0)
                {
                    res = new ApiDataResponse<string>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }


                res = new ApiDataResponse<string>(ExceptionMesseger.CreateDataSucces, lsx.MaLenhSX);
                return res;
            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<string>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<string>> TaoThanhToan(int donHangId, int createBy, string access)
        {
            var res = await JwtSetting<string>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var hoadon = await _context.HoaDons.SingleOrDefaultAsync(x => x.DonHangId == donHangId && x.SoLan == 2);
                if (hoadon != null)
                {
                    res = new ApiDataResponse<string>(ExceptionMesseger.GetDataSucces, hoadon.MaHD);
                    return res;
                }


                var donhang = await _context.DonHangs.Include(x => x.PhuongThucThanhToan).SingleOrDefaultAsync(x => x.Id == donHangId);
                var pt = await _context.PhuongThucThanhToans.SingleOrDefaultAsync(x => x.Id == 1);
                if (donhang.TrangThai != 4 )
                {
                    res = new ApiDataResponse<string>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                var lan1=await _context.HoaDons.SingleOrDefaultAsync(x=>x.DonHangId==donHangId&& x.SoLan == 1);

                double sotientratrc= donhang.TongGTriDH*70/100;
           


                HoaDon h = new HoaDon
                {
                    SoLan = 2,
                    DonHangId = donHangId,
                    CreateBy = createBy,
                    PhuongThucThanhToanId = donhang.PhuongThucThanhToanId,
                    SoTienTra = sotientratrc,
                    NgayLap = DateTime.UtcNow,
                    TinhTrangHoaDon = 0,
                };

                await _context.HoaDons.AddAsync(h);

                var save = await _context.SaveChangesAsync();
                if (save == 0)
                {
                    res = new ApiDataResponse<string>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                res = new ApiDataResponse<string>("Hoàn tất đơn hàng !!!", h.MaHD);
                return res;
            }
            catch (Exception ex) {
                res = new ApiDataResponse<string>("Loi he thong :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> Update(MReq_DonHang model, int id, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var qeury = await _context.DonHangs.Include(x => x.ChiTietDonHangs).SingleOrDefaultAsync(x => x.Id == id);
                if (qeury == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }



                qeury.KhachHangId = model.KhachHangId;
                qeury.PhuongThucThanhToanId = model.PhuongThucThanhToanId;
                qeury.HieuLuc = model.HieuLuc;
                qeury.HetHan = model.HetHan;
                qeury.UpdateAt = DateTime.UtcNow;
                qeury.UpdateBy = model.UpdateBy;
                qeury.Thue = model.Thue;
                qeury.KhoChuaId = model.KhoChuaId;
                _context.ChiTietDonHangs.RemoveRange(qeury.ChiTietDonHangs);
                List<ChiTietDonHang> lst = new List<ChiTietDonHang>();
                qeury.TienTruocThue = 0;
                qeury.TongHang = 0;
                foreach (var i in model.ChiTietDonHangs)
                {
                    qeury.TienTruocThue =qeury.TienTruocThue+(i.DonGia*i.SoLuongHang)+(i.DonGia*i.SoLuongHang*i.Thue)/100;
                    qeury.TongHang += i.SoLuongHang;
                    ChiTietDonHang ctdh = new ChiTietDonHang
                    {
                        DonHangId = i.DonHangId,
                        DonGia = i.DonGia,
                        SanPhamId = i.SanPhamId,
                        SoLuongHang = i.SoLuongHang,
                        ThanhTien = i.ThanhTien,
                        Thue = i.Thue,
                        TrangThai = 0
                    };
                    lst.Add(ctdh);
                }

                qeury.TongGTriDH = qeury.TienTruocThue + (qeury.TienTruocThue * model.Thue / 100);
                await _context.ChiTietDonHangs.AddRangeAsync(lst);
                _context.DonHangs.Update(qeury);
                var save = await _context.SaveChangesAsync();
                if (save == 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.SeverError);
                    return res;
                }
                res = new ApiDataResponse<bool>(ExceptionMesseger.EditSucces, true);
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
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var qeury = await _context.DonHangs.Include(x => x.ChiTietDonHangs).Include(x => x.PhuongThucThanhToan).Include(x=>x.KhachHang).SingleOrDefaultAsync(x => x.Id == id);


                if (qeury == null && qeury.IsDonHang == false && qeury.PhuongThucThanhToanId == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }



                switch (state)
                {
                    case 2:
                        if (qeury.TrangThai < 2 && qeury.TrangThai > 0)
                        {
                            res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                            return res;
                        }

                        var hoadon = await _context.HoaDons.SingleOrDefaultAsync(x => x.DonHangId == id && x.SoLan > 0);
                        if (qeury.PhuongThucThanhToanId == null)
                        {
                            res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                            return res;
                        }


                        if (qeury.PhuongThucThanhToan.SoPhanTramTraTruoc > 0 && hoadon == null)
                        {
                            res = new ApiDataResponse<bool>("Phải trả trước " + qeury.PhuongThucThanhToan.SoPhanTramTraTruoc + "% số tiền", ExceptionCode.BadRequest);
                            return res;
                        }


                        qeury.TrangThai = 2;
                        break;

                    case 4:
                        if (qeury.TrangThai != 2)
                        {
                            res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                            return res;
                        }

                        foreach (var i in qeury.ChiTietDonHangs)
                        {
                            if (i.TrangThai < 2)
                            {
                                res = new ApiDataResponse<bool>("Hàng trong kho chưa đủ !!!", ExceptionCode.BadRequest);
                                return res;
                            }
                        }

                        var phieuxuat = new PhieuXuat
                        {
                            DonHangId = id,
                            KhoChuaId = qeury.KhoChuaId.Value,
                            KhachHangId = qeury.KhachHangId,
                            MoTa = "",
                            NgayXuatKho = DateTime.UtcNow,
                           DiaChiDich= qeury.KhachHang.DiaChi,
                           TrangThai=4
                          
                        };
                        List<KhoSanPham> lstksp = new List<KhoSanPham>();

                        foreach(var i in qeury.ChiTietDonHangs)
                        {
                            phieuxuat.ChiTietPhieuXuats.Add(new ChiTietPhieuXuat
                            {
                                SanPhamId = i.SanPhamId,
                                SoLuongHang = i.SoLuongHang,
                                ThanhTien = i.ThanhTien,
                                Thue = i.Thue,
                            });

                            var ksp = await _context.KhoSanPhams.SingleOrDefaultAsync(x => x.SanPhamId == i.SanPhamId && x.KhoChuaId == qeury.KhoChuaId);
                            ksp.SoLuongTon = ksp.SoLuongTon - i.SoLuongHang;
                            if(ksp.SoLuongTon<0)
                            {
                                res = new ApiDataResponse<bool>("Khong du hang trong kho !!!", ExceptionCode.BadRequest);
                                return res;
                            }

                            lstksp.Add(ksp);
                        }



                        _context.KhoSanPhams.UpdateRange(lstksp);
                        _context.PhieuXuats.Add(phieuxuat);

                        qeury.TrangThai = 4;
                        break;
                    case 6:
                        if (qeury.TrangThai != 4)
                        {
                            res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                            return res;
                        }

                        //var hoadon2 =  _context.HoaDons.Where(x => x.DonHangId == id && x.TinhTrangHoaDon == 1);
                        //int solanthanhtoan = await hoadon2.CountAsync();
                        //if (qeury.PhuongThucThanhToan.SoPhanTramTraTruoc > 0 && solanthanhtoan <2)
                        //{
                        //    res = new ApiDataResponse<bool>("Bạn chưa ghi nhận thanh toán !!!", ExceptionCode.BadRequest);
                        //    return res;
                        //}

                        var h = await _context.HoaDons.SingleOrDefaultAsync(x=>x.DonHangId==id&&x.SoLan==2);
                        if(h==null ||h.TinhTrangHoaDon!=1)
                        {
                            res=new ApiDataResponse<bool>("Đơn hàng chưa hoàn tất thanh toan",ExceptionCode.BadRequest);
                            return res;
                        }


                        qeury.TrangThai = 6;
                        break;

                }






                _context.DonHangs.Update(qeury);

                var save = await _context.SaveChangesAsync();
                if (save == 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.GetDataSucces, true);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

    }
}
