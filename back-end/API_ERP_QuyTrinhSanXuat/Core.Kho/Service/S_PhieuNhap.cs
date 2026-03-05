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
    public interface IS_PhieuNhap : IQuanLyKho<MRes_PhieuNhap, MReq_PhieuNhap> { }
    public class S_PhieuNhap : IS_PhieuNhap
    {
        private readonly MyContext _context;
        public S_PhieuNhap(MyContext context)
        {
            _context = context;
        }
        public async Task<ApiDataResponse<bool>> Create(MReq_PhieuNhap model, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                PhieuNhap data = new PhieuNhap
                {
                    CreateAt = DateTime.UtcNow,
                    UpdateAt = DateTime.UtcNow,
                    CreateBy = model.CreateBy,
                    UpdateBy = model.UpdateBy,
                    MaPN = model.MaPN,
                    NgayNhap = DateTime.UtcNow,
                    SoLuongNhap = 0,
                    TienTruocThue = 0,
                    TongGiaTri = 0,
                    Thue = model.Thue,
                    TrangThai = 0,
                    DiaChiNguon=model.DiaChi,
                    KhoChuaId=model.KhoChuaId,
                    NhaCungCapId=model.NhaCungCapId,
                    DonNhapId=model.DonNhapId

                };


                List<ChiTietPhieuNhap> lst = new List<ChiTietPhieuNhap>();
                
                foreach(var i in model.ChiTietPhieuNhaps)
                {
                    var p = new ChiTietPhieuNhap
                    {
                        VatTuId = i.VatTuId,
                        DonGia = i.DonGia,
                        SoLuongHang = i.SoLuongHang,
                        ThanhTien = i.SoLuongHang * i.DonGia,
                        Thue = i.Thue,
                    };


                    lst.Add(p);
                    data.TienTruocThue = data.TienTruocThue + p.ThanhTien;
                    data.SoLuongNhap = data.SoLuongNhap + i.SoLuongHang;
                }

                data.TongGiaTri = data.TienTruocThue + data.TienTruocThue * data.Thue / 100;

                data.ChiTietPhieuNhaps = lst;
                await _context.PhieuNhaps.AddAsync(data);


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
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var query = await _context.PhieuNhaps.Include(x => x.ChiTietPhieuNhaps).SingleOrDefaultAsync(x => x.Id == id);

                if (query == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                
                _context.PhieuNhaps.Remove(query);

                var save = await _context.SaveChangesAsync();
                if(save==0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest,ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.GetDataSucces,true);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_PhieuNhap>> GetById(int id, string access)
        {
            var res = await JwtSetting<MRes_PhieuNhap>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var query = await _context.PhieuNhaps.Include(x=>x.ChiTietPhieuNhaps).SingleOrDefaultAsync(x => x.Id == id);

                if (query == null)
                {
                    res = new ApiDataResponse<MRes_PhieuNhap>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                MRes_PhieuNhap PhieuNhap = new MRes_PhieuNhap
                {
                    Id = id,
                    MaPN=query.MaPN,
                    TongGiaTri=query.TongGiaTri,
                    NgayNhap=query.NgayNhap,
                    SoLuongNhap=query.SoLuongNhap,
                    TienTruocThue=query.TienTruocThue,
                    TrangThai = query.TrangThai,
                    CreateAt = query.CreateAt,
                    CreateBy = query.CreateBy,
                    UpdateAt = query.UpdateAt,
                    UpdateBy = query.UpdateBy,
                    NhaCungCapId=query.NhaCungCapId,    
                    KhoChuaId=query.KhoChuaId,
                    DonNhapId=query.DonNhapId,
                    DiaChi=query.DiaChiNguon,
                    Thue=query.Thue,
                };

                foreach(var i in query.ChiTietPhieuNhaps)
                {
                    PhieuNhap.ChiTietPhieuNhaps.Add(new MRes_ChiTietPhieuNhap
                    {
                        VatTuId = i.VatTuId,
                        PhieuNhapId = i.PhieuNhapId,
                        SoLuongHang = i.SoLuongHang,
                        ThanhTien = i.ThanhTien,
                        Thue = i.Thue,
                        DonGia = i.DonGia,
                    });
                }


                res = new ApiDataResponse<MRes_PhieuNhap>(ExceptionMesseger.GetDataSucces, PhieuNhap);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<MRes_PhieuNhap>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_Pagination<List<MRes_PhieuNhap>>>> GetByPage(MReq_Pagination model, string access)
        {
            var res = await JwtSetting<MRes_Pagination<List<MRes_PhieuNhap>>>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var query = await _context.PhieuNhaps.Where(x=>x.TrangThai!=2).ToListAsync();
                var pagin = new MRes_Pagination<List<MRes_PhieuNhap>>();
                var lst = new List<MRes_PhieuNhap>();
                foreach (var item in query)
                {
                    MRes_PhieuNhap data = new MRes_PhieuNhap
                    {
                        Id = item.Id,
                        MaPN=item.MaPN,                        
                        TrangThai = item.TrangThai,
                        CreateAt = item.CreateAt,
                        UpdateAt = item.UpdateAt,
                        CreateBy = item.CreateBy,
                        UpdateBy = item.UpdateBy,
                        TongGiaTri=item.TongGiaTri,
                        
                    };
                    lst.Add(data);
                }

                pagin.Data = lst;

                res = new ApiDataResponse<MRes_Pagination<List<MRes_PhieuNhap>>>(ExceptionMesseger.GetDataSucces, pagin);
                return res;
            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<MRes_Pagination<List<MRes_PhieuNhap>>>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> Update(MReq_PhieuNhap model, int id, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var p = await _context.PhieuNhaps.SingleOrDefaultAsync(x => x.Id == id);

                p.NhaCungCapId = model.NhaCungCapId;
                p.Thue = model.Thue;
                p.DiaChiNguon = model.DiaChi;
                p.KhoChuaId = model.KhoChuaId;


                _context.ChiTietPhieuNhaps.RemoveRange(p.ChiTietPhieuNhaps);
                p.ChiTietPhieuNhaps = new List<ChiTietPhieuNhap>();

                foreach (var i in model.ChiTietPhieuNhaps)
                {
                    p.ChiTietPhieuNhaps.Add(new ChiTietPhieuNhap
                    {
                        VatTuId = i.VatTuId,
                        DonGia = i.DonGia,
                        SoLuongHang = i.SoLuongHang,
                        ThanhTien = i.DonGia * i.SoLuongHang,
                        Thue = i.Thue
                    });

                    p.SoLuongNhap = p.SoLuongNhap + i.SoLuongHang;
                    p.TienTruocThue = p.TienTruocThue + (i.DonGia * i.SoLuongHang);
                    p.TongGiaTri = p.TongGiaTri + (p.TienTruocThue * p.Thue) / 100;
                }

                _context.PhieuNhaps.Update(p);

                var save = await _context.SaveChangesAsync();
                if (save == 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.EditSucces, true);
                return res;
            }
            catch (Exception e) { 
                res = new ApiDataResponse<bool>("Lỗi hệ thống :"+e.Message, ExceptionCode.SeverError);
                return res;
                
            }
        }

        public async Task<ApiDataResponse<bool>> UpdateState(int id, int state, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var p = await _context.PhieuNhaps.Include(x=>x.ChiTietPhieuNhaps).SingleOrDefaultAsync(x => x.Id == id);
                if (p==null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                if (p.TrangThai != 0 &&p.TrangThai!=1)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                switch (state)
                {
                    case 2:
   

                        foreach(var i in p.ChiTietPhieuNhaps)
                        {
                            var ct = await _context.KhoVatTus.SingleOrDefaultAsync(x => x.VatTuId == i.VatTuId && x.KhoChuaId == p.KhoChuaId);
                            if(ct==null)
                            {
                                var k = new KhoVatTu
                                {
                                    KhoChuaId = p.KhoChuaId,
                                    VatTuId = i.VatTuId,
                                    SoLuongTon = i.SoLuongHang,
                                };
                                await _context.KhoVatTus.AddAsync(k);
                                
                            }
                            else
                            {
                                ct.SoLuongTon = ct.SoLuongTon + i.SoLuongHang;
                                _context.KhoVatTus.Update(ct);
                            }
                        }

                        p.TrangThai = 2;
                        _context.PhieuNhaps.Update(p);

                        break;
                    case -1:
             
                        p.TrangThai = -1;
                        _context.PhieuNhaps.Update(p);

                        break;

                }



                var save = await _context.SaveChangesAsync();

                if(save==0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, save);
                    return res;
                }


                res = new ApiDataResponse<bool>(ExceptionMesseger.EditSucces, true);
                return res;

            }catch(Exception ex)
            {
                res=new ApiDataResponse<bool>("Lỗi hệ thống :"+ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }
    }
}
