using Common.ApiResponse;
using Common.ExceptionResponse;
using Common.JwtSecurity;
using Common.Utilities;
using Core.Kho.Interface;
using Core.Kho.Request;
using Core.Kho.Response;
using DataContext.Entity;
using DataContext.MyDbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Service
{
    public interface IS_PhieuXuat : IQuanLyKho<MRes_PhieuXuat, MReq_PhieuXuat> { }
    public class S_PhieuXuat : IS_PhieuXuat
    {
        private readonly MyContext _context;
        public S_PhieuXuat(MyContext context)
        {
            _context = context;
        }
        public async Task<ApiDataResponse<bool>> Create(MReq_PhieuXuat model, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                PhieuXuat data = new PhieuXuat
                {
                    CreateAt = DateTime.UtcNow,
                    UpdateAt = DateTime.UtcNow,
                    CreateBy = model.CreateBy,
                    UpdateBy = model.UpdateBy,
                    MaPX = model.MaPX,
                    DiaChiDich = model.DiaChi,
                    MoTa = model.MoTa,
                    TrangThai = 0,
                    KhachHangId=model.KhachHangId,
                    KhoChuaId=model.KhoChuaId,

                };

                foreach(var i in model.ChiTietPhieuXuats)
                {
                    data.ChiTietPhieuXuats.Add(new ChiTietPhieuXuat
                    {
                        SanPhamId = i.SanPhamId,
                        SoLuongHang = i.SoLuongHang,
                        DonGia = i.DonGia,
                        ThanhTien = i.DonGia * i.SoLuongHang,
                        Thue = i.Thue,
                    });
                    data.SoLuongXuat = data.SoLuongXuat + i.SoLuongHang;
                }

                await _context.PhieuXuats.AddAsync(data);

                var save2 = await _context.SaveChangesAsync();
                if (save2 == 0)
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
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var c = await _context.PhieuXuats.SingleOrDefaultAsync(x => x.Id == id);
                if (c == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                _context.PhieuXuats.Remove(c);

                var save = await _context.SaveChangesAsync();
                if (save == 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.DeleteSucces, true);
                return res;
            }
            catch (Exception ex) {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_PhieuXuat>> GetById(int id, string access)
        {
            var res = await JwtSetting<MRes_PhieuXuat>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var query = await _context.PhieuXuats.Include(x=>x.ChiTietPhieuXuats).SingleOrDefaultAsync(x=>x.Id==id);

                if (query == null)
                {
                    res = new ApiDataResponse<MRes_PhieuXuat>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                MRes_PhieuXuat PhieuXuat = new MRes_PhieuXuat
                {
                    Id = id,
                    DiaChiDich=query.DiaChiDich,
                    KhachHangId=query.KhachHangId,
                    KhoChuaId=query.KhoChuaId,
                    DonHangId=query.DonHangId,
                    MaPX=query.MaPX,    
                    MoTa=query.MoTa,
                    NgayXuatKho=query.NgayXuatKho,
                    SoLuongXuat=query.SoLuongXuat,
                    TrangThai = query.TrangThai,
                    CreateAt = query.CreateAt,
                    CreateBy = query.CreateBy,
                    UpdateAt = query.UpdateAt,
                    UpdateBy = query.UpdateBy
                };

                foreach(var i in query.ChiTietPhieuXuats)
                {
                    PhieuXuat.ChiTietPhieuXuats.Add(new MRes_ChiTietPhieuXuat
                    {
                        SanPhamId = i.SanPhamId,
                        PhieuXuatId = i.PhieuXuatId,
                        DonGia = i.DonGia,
                        SoLuongHang = i.SoLuongHang,
                        ThanhTien = i.ThanhTien,
                        Thue = i.Thue,
                    });
                }
                

                res = new ApiDataResponse<MRes_PhieuXuat>(ExceptionMesseger.GetDataSucces, PhieuXuat);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<MRes_PhieuXuat>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_Pagination<List<MRes_PhieuXuat>>>> GetByPage(MReq_Pagination model, string access)
        {
            var res = await JwtSetting<MRes_Pagination<List<MRes_PhieuXuat>>>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var query = await _context.PhieuXuats.ToListAsync();
                var pagin = new MRes_Pagination<List<MRes_PhieuXuat>>();
                var lst = new List<MRes_PhieuXuat>();
                foreach (var item in query)
                {
                    MRes_PhieuXuat data = new MRes_PhieuXuat
                    {
                        Id = item.Id,
                        MaPX = item.MaPX,
                        SoLuongXuat = item.SoLuongXuat,
                        TrangThai = item.TrangThai,
                        CreateAt = item.CreateAt,
                        UpdateAt = item.UpdateAt,
                        CreateBy = item.CreateBy,
                        UpdateBy = item.UpdateBy,
                    };
                    lst.Add(data);
                }

                pagin.Data = lst;

                res = new ApiDataResponse<MRes_Pagination<List<MRes_PhieuXuat>>>(ExceptionMesseger.GetDataSucces, pagin);
                return res;
            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<MRes_Pagination<List<MRes_PhieuXuat>>>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> Update(MReq_PhieuXuat model, int id, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var c=await _context.PhieuXuats.Include(x=>x.ChiTietPhieuXuats).SingleOrDefaultAsync(x => x.Id == id);
                if(c == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                c.DiaChiDich = model.DiaChi;
                c.KhoChuaId = model.KhoChuaId;
                c.KhachHangId= model.KhachHangId;
                _context.ChiTietPhieuXuats.RemoveRange(c.ChiTietPhieuXuats);

                c.ChiTietPhieuXuats = new LinkedList<ChiTietPhieuXuat>();
                foreach(var i in c.ChiTietPhieuXuats)
                {
                    c.ChiTietPhieuXuats.Add(new ChiTietPhieuXuat
                    {
                        PhieuXuatId = i.PhieuXuatId,
                        DonGia = i.DonGia,
                        ThanhTien = i.ThanhTien,
                        SoLuongHang = i.SoLuongHang,
                        SanPhamId = i.SanPhamId,
                        Thue = i.Thue,
                    });
                }

                _context.PhieuXuats.Update(c);
                var save =await _context.SaveChangesAsync();
                if(save==0)
                {
                    res=new ApiDataResponse<bool>(ExceptionMesseger.BadRequest,ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.EditSucces, true);
                return res;
            }
            catch (Exception ex) { 
                res= new ApiDataResponse<bool>("Lỗi hệ thống :"+ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> UpdateState(int id, int state, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.KeToan, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var c = await _context.PhieuXuats.Include(x => x.ChiTietPhieuXuats).SingleOrDefaultAsync(x => x.Id == id);
                if (c == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                if(c.TrangThai!=0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                switch(state)
                {
                    case 2:
                        
                        foreach(var i in c.ChiTietPhieuXuats)
                        {
                            var k = await _context.KhoSanPhams.SingleOrDefaultAsync(x => x.SanPhamId == i.SanPhamId && x.KhoChuaId == c.KhoChuaId);
                            if(k == null)
                            {
                                res = new ApiDataResponse<bool>("Kho không đủ tồn !!!", ExceptionCode.BadRequest);
                                return res;
                            }

                            k.SoLuongTon = k.SoLuongTon - i.SoLuongHang;
                            if(k.SoLuongTon<0)
                            {
                                res=new ApiDataResponse<bool>("Kho không đủ tồn !!!",ExceptionCode.BadRequest);
                                return res;
                            }
                            _context.KhoSanPhams.Update(k);
                        }
                        c.TrangThai = 2;
                        _context.PhieuXuats.Update(c);
                        break;
                    case -1:
                        c.TrangThai = -1;
                        _context.PhieuXuats.Update(c);
                        break;
                }

                var save=await _context.SaveChangesAsync();
                if(save==0)
                {
                    res=new ApiDataResponse<bool>(ExceptionMesseger.BadRequest,ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.EditSucces, true);
                return res;

            }
            catch (Exception ex) { 
                res = new ApiDataResponse<bool>("Lỗi hệ thống :"+ex.Message,ExceptionCode.SeverError);
                return res;
            }
        }
    }
}
