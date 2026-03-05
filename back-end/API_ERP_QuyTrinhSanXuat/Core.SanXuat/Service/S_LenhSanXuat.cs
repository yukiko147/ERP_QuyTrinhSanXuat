using Common.ApiResponse;
using Common.ExceptionResponse;
using Common.JwtSecurity;
using Common.Utilities;
using Core.SanXuat.Interface;
using Core.SanXuat.Request;
using Core.SanXuat.Response;
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

namespace Core.SanXuat.Service
{
    public interface IS_LenhSanXuat : IQuanLySanXuat<MRes_LenhSanXuat, MReq_LenhSanXuat>
    {
        Task<ApiDataResponse<bool>> KiemTraTon(int vatTuId, int lenhSanXuatId, string acces);
        Task<ApiDataResponse<string>> BoSung(MReq_PhieuNhapLenhSanXuat model, string access);
    }

    public class S_LenhSanXuat : IS_LenhSanXuat
    {
        private MyContext _context;
        public S_LenhSanXuat(MyContext context)
        {
            _context = context;
        }

        public async Task<ApiDataResponse<string>> BoSung(MReq_PhieuNhapLenhSanXuat model, string access)
        {
            var res=await JwtSetting<string>.GiaiToken(access,false,PhongBanCode.SanXuat,_context.Database.GetConnectionString());    
            if(res.Code>200)
            {
                return res;
            }


            try
            {
                var lenhsx = await _context.LenhSXs.Include(x=>x.chiTietCheTaos).ThenInclude(x=>x.VatTu).SingleOrDefaultAsync(x => x.Id == model.LenhSanXuatId);
                if(lenhsx.TrangThaiLenh>1)
                {
                    res = new ApiDataResponse<string>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }


                var donnhap = await _context.DonNhap.SingleOrDefaultAsync(x => x.LenhSanXuatId == model.LenhSanXuatId);

                if(donnhap!=null)
                {
                    res=new ApiDataResponse<string>(ExceptionMesseger.CreateDataSucces, "Đơn nhập " + donnhap.MaDGH + " đang được xử lý !!!");
                    return res;
                }

                DonNhap dn = new DonNhap
                {
                    KhoHangId = lenhsx.KhoChuaId,
                    TrangThai = 1,
                    CreateBy = model.CreateBy,
                    UpdateAt = model.UpdateAt,
                    LenhSanXuatId=model.LenhSanXuatId,
                 

                };


                foreach (var i in lenhsx.chiTietCheTaos)
                {
                    if(i.TrangThai==1)
                    {
                        dn.ChiTietDonNhaps.Add(new ChiTietDonNhap
                        {
                            VatTuId = i.VatTuId,
                            SoLuongHang = i.SoLuongCan,
                            DonGia = i.VatTu.GiaBan,
                            ThanhTien = i.VatTu.GiaBan * i.SoLuongCan,
                            Thue = 0,
                            

                        });
                        dn.TongHang = dn.TongHang + i.SoLuongCan;
                        dn.TienTruocThue = i.VatTu.GiaBan * i.SoLuongCan;
                        dn.TongGTriDH = dn.TienTruocThue + (dn.TienTruocThue * dn.Thue) / 100;
                    }    

                    

                }

                await _context.DonNhap.AddAsync(dn);

                var save=await _context.SaveChangesAsync(); 
                if(save==0)
                {
                    res=new ApiDataResponse<string>(ExceptionMesseger.BadRequest,ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<string>(ExceptionMesseger.CreateDataSucces, "Đơn nhập " + dn.MaDGH + " đang được sử lý !!!");

                return res;
            }
            catch (Exception ex) { 
                res=new ApiDataResponse<string>("Lỗi hệ thống :"+ex.Message,ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> Create(MReq_LenhSanXuat model, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var LenhSanXuat = new LenhSX
                {
                    MaLenhSX = model.MaLenhSX,
                    BatDauSX = model.BatDauSX,
      
                    KetThucSX = model.KetThucSX,
                    SanPhamId = model.SanPhamId,
                    TrangThaiLenh = 0,
                    SoLuongSX = model.SoLuongSX,
                    KhoChuaId=model.KhoChuaId,
                    DonHangId=model.DonHangId,
                    CreateBy = model.CreateBy,
                    CreateAt = model.CreateAt,
                };

                if (model.ChiTietCheTaos != null)
                {
                    foreach(var i in model.ChiTietCheTaos)
                    {
                        ChiTietCheTao ctct = new ChiTietCheTao
                        {
                            VatTuId = i.VatTuId,
                            GiaVatTu = i.GiaVatTu,
                            ThanhTien = i.ThanhTien,
                            SoLuongCan = i.SoLuongCan,
                            TrangThai = i.TrangThai,
                            DVTinhId = i.DVTinhId,

                        };

                        LenhSanXuat.chiTietCheTaos.Add(ctct);
                    }
                }

                _context.AddAsync(LenhSanXuat);
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
                var query = await _context.LenhSXs.SingleOrDefaultAsync(x => x.Id == id);
                if (query == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }


                _context.LenhSXs.Remove(query);

                var save=await _context.SaveChangesAsync();
                if(save==0)
                {
                    res=new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
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

        public async Task<ApiDataResponse<MRes_LenhSanXuat>> GetById(int id, string access)
        {
            var res = await JwtSetting<MRes_LenhSanXuat>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var query = await _context.LenhSXs.Include(x=>x.chiTietCheTaos).SingleOrDefaultAsync(x => x.Id == id);
                if (query == null)
                {
                    res = new ApiDataResponse<MRes_LenhSanXuat>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                MRes_LenhSanXuat data = new MRes_LenhSanXuat
                {
                   Id= id,
                   BatDauSX=query.BatDauSX,
                   MaLenhSX=query.MaLenhSX,
                   KetThucSX=query.KetThucSX,
                   SanPhamId=query.SanPhamId,
                   TrangThaiLenh=query.TrangThaiLenh,
                   KhoChuaId=query.KhoChuaId,
                   SoLuongSX=query.SoLuongSX,
                   CreateAt = query.CreateAt,
                   CreateBy = query.CreateBy,
                   UpdateAt = query.UpdateAt,
                   UpdateBy  = query.UpdateBy,
                   //HinhAnhSP=query.SanPham.HinhAnh,

                   DonHangId=query.DonHangId,
              
                };


                foreach(var i in query.chiTietCheTaos)
                {
                    data.ChiTietCheTao.Add(new MRes_ChiTietCheTao
                    {
                        DVTinhId = i.DVTinhId,
                        GiaVatTu = i.GiaVatTu,
                        LenhSXId = i.LenhSXId,
                        SoLuongCan = i.SoLuongCan,
                        ThanhTien = i.ThanhTien,
                        TrangThai = i.TrangThai,
                        VatTuId = i.VatTuId,
                    });
                }

                res = new ApiDataResponse<MRes_LenhSanXuat>(ExceptionMesseger.GetDataSucces, data);
                return res;
            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<MRes_LenhSanXuat>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_Pagination<List<MRes_LenhSanXuat>>>> GetByPage(MReq_Pagination model, string access)
        {
            var res = await JwtSetting<MRes_Pagination<List<MRes_LenhSanXuat>>>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var qeury = await _context.LenhSXs.ToArrayAsync();
                List<MRes_LenhSanXuat> lst = new List<MRes_LenhSanXuat>();
                foreach (var i in qeury)
                {
                    MRes_LenhSanXuat k = new MRes_LenhSanXuat
                    {
                        MaLenhSX=i.MaLenhSX,
                        BatDauSX=i.BatDauSX,
          
                        Id=i.Id,
                        SanPhamId=i.SanPhamId,
                        KetThucSX=i.KetThucSX,
                        SoLuongSX=i.SoLuongSX,
                        TrangThaiLenh=i.TrangThaiLenh,
                         
                        CreateAt = i.CreateAt,
                        CreateBy = i.CreateBy,
                        UpdateAt = i.UpdateAt,
                        UpdateBy = i.UpdateBy,
                    };
                    lst.Add(k);
                }

                var pagamin = new MRes_Pagination<List<MRes_LenhSanXuat>>
                {
                    Data = lst,
                };

                res = new ApiDataResponse<MRes_Pagination<List<MRes_LenhSanXuat>>>(ExceptionMesseger.GetDataSucces, pagamin);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<MRes_Pagination<List<MRes_LenhSanXuat>>>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> KiemTraTon(int vatTuId, int lenhSanXuatId, string acces)
        {
            var res = await JwtSetting<bool>.GiaiToken(acces, false, PhongBanCode.SanXuat, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var ctct = await _context.ChiTietCheTaos.Include(x => x.LenhSX).SingleOrDefaultAsync(x => x.LenhSXId == lenhSanXuatId && x.VatTuId == vatTuId);

            

                int soton = await _context.KhoVatTus.Where(x => x.VatTuId == vatTuId && x.KhoChuaId == ctct.LenhSX.KhoChuaId).SumAsync(x => x.SoLuongTon);

                if (soton < ctct.SoLuongCan)
                {
                    ctct.TrangThai = 1;
                }
                else
                {
                    ctct.TrangThai = 2;
                }

                _context.ChiTietCheTaos.Update(ctct);

                var save = await _context.SaveChangesAsync();
                if (save == 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>("Kiểm tra thành công !!!", true);
                return res;

            }
            catch (Exception ex) { 
                res=new ApiDataResponse<bool>("Lỗi hệ thống :"+ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> Update(MReq_LenhSanXuat model, int id, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var LenhSanXuat = await _context.LenhSXs.SingleOrDefaultAsync(k => k.Id == id);
                if (LenhSanXuat == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                if(LenhSanXuat.DonHangId!=null)
                {
                    res=new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                LenhSanXuat.SoLuongSX = model.SoLuongSX;
                LenhSanXuat.BatDauSX = model.BatDauSX;
                LenhSanXuat.KetThucSX = model.KetThucSX;
                LenhSanXuat.TrangThaiLenh   = model.TrangThaiLenh;
  
                LenhSanXuat.SanPhamId = model.SanPhamId;
                LenhSanXuat.UpdateBy=model.UpdateBy;
                LenhSanXuat.UpdateAt = DateTime.UtcNow;
                LenhSanXuat.KhoChuaId = model.KhoChuaId;
                //_context.ChiTietCheTaos.RemoveRange(LenhSanXuat.chiTietCheTaos);
               LenhSanXuat.chiTietCheTaos=new List<ChiTietCheTao>();

                foreach(var i in model.ChiTietCheTaos)
                {
                    ChiTietCheTao c = new ChiTietCheTao
                    {

                        VatTuId = i.VatTuId,
                        GiaVatTu = i.GiaVatTu,
                        DVTinhId = i.DVTinhId,
                        //ThanhTien = i.GiaVatTu * i.SoLuongCan * model.SoLuongSX,
                        TrangThai = i.TrangThai,
                        LenhSXId = id

                    };

                    c.SoLuongCan = 0;
                    c.SoLuongCan = i.SoLuongCan * model.SoLuongSX;
                    c.ThanhTien = 0;
                    c.ThanhTien = i.GiaVatTu * i.SoLuongCan * model.SoLuongSX;
                    _context.ChiTietCheTaos.Update(c);
                }


                _context.LenhSXs.Update(LenhSanXuat);


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
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.SanXuat, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var lenhsx = await _context.LenhSXs.Include(x=>x.chiTietCheTaos).SingleOrDefaultAsync(x => x.Id == id);
                var ksq = await _context.KhoSanPhams.SingleOrDefaultAsync(x => x.SanPhamId == lenhsx.SanPhamId && x.KhoChuaId == lenhsx.KhoChuaId);

                if (lenhsx == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                switch(state)
                {
                    case 1:
                        if(lenhsx.TrangThaiLenh!=1)
                        {
                            res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                            return res;
                        }

                        if(lenhsx.KhoChuaId==null)
                        {
                            res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                            return res;
                        }


                        foreach(var i in lenhsx.chiTietCheTaos)
                        {
                            if(i.TrangThai<2)
                            {
                                res = new ApiDataResponse<bool>("Vật tư không đủ", ExceptionCode.BadRequest);
                                return res;
                            }
                        }

                        lenhsx.TrangThaiLenh = 1;


                        if(ksq == null)
                        {
                            ksq = new KhoSanPham
                            {
                                KhoChuaId = lenhsx.KhoChuaId.Value,
                                SanPhamId = lenhsx.SanPhamId,

                            };

                            _context.KhoSanPhams.Add(ksq);
                        }

                        _context.LenhSXs.Update(lenhsx);
                        break;
                    case 2:

                        if (lenhsx.TrangThaiLenh != 1 &&lenhsx.TrangThaiLenh!=0)
                        {
                            res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                            return res;
                        }



                        var vattuTon = await _context.KhoVatTus.Include(x => x.VatTu).Where(x => x.KhoChuaId == lenhsx.KhoChuaId).ToListAsync();


                        foreach (var i in lenhsx.chiTietCheTaos)
                        {
                            if(i.TrangThai!=2)
                            {
                                res = new ApiDataResponse<bool>("Vật tư thiếu !!!", ExceptionCode.BadRequest);
                                return res;
                            }

                            foreach (var j in vattuTon)
                            {
                                if (i.VatTuId == j.VatTuId)
                                {
                                    j.SoLuongTon = j.SoLuongTon - i.SoLuongCan;

                                    if (j.SoLuongTon < 0)
                                    {
                                        res = new ApiDataResponse<bool>("Vật tư " + j.VatTu.TenVatTu + " không đủ số lượng tồn yêu cầu kiểm tra lại !!!", ExceptionCode.BadRequest);
                                        return res;
                                    }

                                }
                            }
                        }


                        //if (ksq == null)
                        //{
                        //    ksq = new KhoSanPham();

                        //    ksq.SanPhamId = lenhsx.SanPhamId;
                        //    ksq.KhoChuaId = lenhsx.KhoChuaId.Value;
                        //    ksq.SoLuongTon = ksq.SoLuongTon + lenhsx.SoLuongSX;




                        //    await _context.KhoSanPhams.AddAsync(ksq);
                        //}
                        //else
                        //{

                        //    ksq.SanPhamId = lenhsx.SanPhamId;
                        //    ksq.KhoChuaId = lenhsx.KhoChuaId.Value;
                        //    ksq.SoLuongTon = ksq.SoLuongTon + lenhsx.SoLuongSX;


                        //    _context.KhoSanPhams.Update(ksq);

                        //}

                        var sp = await _context.SanPhams.SingleOrDefaultAsync(x => x.Id == lenhsx.SanPhamId);
                        //                    var khoSP = await _context.KhoSanPhams
                        //.FindAsync(lenhsx.SanPhamId, lenhsx.KhoChuaId.Value);

                        //                    if (khoSP == null)
                        //                    {
                        //                        khoSP = new KhoSanPham
                        //                        {
                        //                            SanPhamId = lenhsx.SanPhamId,
                        //                            KhoChuaId = lenhsx.KhoChuaId.Value,
                        //                            SoLuongTon = 0,
                        //                        };
                        //                        _context.KhoSanPhams.Add(khoSP);
                        //                    }

                        var khoSP = new KhoSanPham
                        {
                            SanPhamId = lenhsx.SanPhamId,
                            KhoChuaId = lenhsx.KhoChuaId.Value,
                            SoLuongTon = 0,
                        };

                        khoSP.NgayHetHan = khoSP.NgaySX.AddMonths(sp.HanSanXuat);

                        khoSP.SoLo = lenhsx.MaLenhSX;
                        khoSP.NgaySX = lenhsx.BatDauSX;

                        _context.KhoSanPhams.Add(khoSP);
                        _context.KhoVatTus.UpdateRange(vattuTon);

               


             
                        lenhsx.TrangThaiLenh = 2;
                        lenhsx.KetThucSX = DateTime.UtcNow;
                        _context.LenhSXs.Update(lenhsx);
                        break;
                    case 4:
                        if (lenhsx.TrangThaiLenh != 2)
                        {
                            res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                            return res;
                        }

                        var ksp = await _context.KhoSanPhams.SingleOrDefaultAsync(x => x.SanPhamId == lenhsx.SanPhamId&&x.KhoChuaId==lenhsx.KhoChuaId);

                        if (ksp == null) {
                            ksq = new KhoSanPham
                            {
                                KhoChuaId = lenhsx.KhoChuaId.Value,
                                SanPhamId = lenhsx.SanPhamId,
                                SoLuongTon = lenhsx.SoLuongSX
                                
                            };

                            _context.KhoSanPhams.Add(ksq);
                        }
                        else
                        {
                            ksp.SoLuongTon = ksp.SoLuongTon + lenhsx.SoLuongSX;
                            _context.KhoSanPhams.Update(ksp);
                        }

                        lenhsx.TrangThaiLenh = 4;
                        _context.LenhSXs.Update(lenhsx);
                        break;
                }


              
                var save = await _context.SaveChangesAsync();
                if(save==0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }
                res = new ApiDataResponse<bool>("Đã chuyển trạng thái !!!", true);
                return res;
            }catch(Exception ex)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :"+ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }
    }
}
