using Common.ApiResponse;
using Common.ExceptionResponse;
using Common.JwtSecurity;
using Common.Utilities;
using Core.Kho.Interface;
using Core.Kho.Request;
using Core.Kho.Response;
using DataContext.Entity;
using DataContext.MyDbContext;
using DataContext.MyDbQuery;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Service
{
    public interface IS_SanPham : IQuanLyKho<MRes_SanPham, MReq_SanPham> { }
    public class S_SanPham : IS_SanPham
    {
        private readonly MyContext _context;
        public S_SanPham(MyContext context)
        {
            _context = context;
        }
        public async Task<ApiDataResponse<bool>> Create(MReq_SanPham model, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                SanPham data = new SanPham
                {
                    TenSP = model.TenSP,
                    LoiNhuan = model.LoiNhuan,
                    MoTa = model.MoTa,
                    HinhAnh = model.HinhAnh,
                    TrangThai = model.TrangThai,
                    CreateAt = DateTime.UtcNow,
                    UpdateAt = DateTime.UtcNow,
                    CreateBy = model.CreateBy,
                    UpdateBy = model.UpdateBy,
                    HanSanXuat = model.HanSanXuat,
                    SKU=StringFormat.GenerateDateSku(model.TenSP),
                    Thue=model.Thue
                    
                };





                if (model.VatTuCanDungs != null)
                {
                    foreach (var i in model.VatTuCanDungs)
                    {
                        data.VatTuCanDungs.Add(new VatTuCanDung
                        {
                            SoLuongCan = i.SoLuongCan,
                            VatTuId = i.VatTuId,
                        });

                      var v= await  _context.VatTus.SingleOrDefaultAsync(x=>x.Id==i.VatTuId);

                        data.GiaGocSP = data.GiaGocSP + i.SoLuongCan * v.GiaBan;
                    }
                }

                data.GiaBanSP = data.GiaGocSP* (data.Thue/100 +data.LoiNhuan/100+1) ;


                    await _context.SanPhams.AddAsync(data);

                    var save2=await _context.SaveChangesAsync();
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

        public Task<ApiDataResponse<bool>> Delete(int id, string access)
        {
            throw new NotImplementedException();
        }

        public async Task<ApiDataResponse<MRes_SanPham>> GetById(int id, string access)
        {
            var res = await JwtSetting<MRes_SanPham>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var query = await _context.SanPhams.Include(x=>x.VatTuCanDungs).ThenInclude(x=>x.VatTu).SingleOrDefaultAsync(x => x.Id == id);

                if (query == null)
                {
                    res = new ApiDataResponse<MRes_SanPham>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                var khoSanPham = await _context.KhoSanPhams.Where(x => x.SanPhamId == id).SumAsync(x => x.SoLuongTon);
                MRes_SanPham sanpham = new MRes_SanPham
                {
                    Id = id,
                    TenSP = query.TenSP,
                    GiaGocSP = query.GiaGocSP,
                    GiaBanSP = query.GiaBanSP,
                    MoTa = query.MoTa,
                    Thue = query.Thue,
                    LoiNhuan = query.LoiNhuan,
                    HinhAnh = query.HinhAnh,
                    SKU = query.SKU,
                    SoLuongTon=khoSanPham,
                    TrangThai = query.TrangThai,
                    CreateAt = query.CreateAt,
                    CreateBy = query.CreateBy,
                    UpdateAt = query.UpdateAt,
                    UpdateBy = query.UpdateBy,
                    HanSanXuat = query.HanSanXuat,
        
                };

                if (query.VatTuCanDungs != null)
                {
                    foreach (var i in query.VatTuCanDungs)
                    {
                        sanpham.VatTuCanDungs.Add(new MRes_VatTuCanDung
                        {
                            Id = i.Id,
                            SanPhamId = i.SanPhamId,
                            SoLuongCan = i.SoLuongCan,
                            VatTuId = i.VatTuId,
                            GiaBan=i.VatTu.GiaBan,
                            ThanhTien=i.VatTu.GiaBan*i.SoLuongCan
                        });
                    }
                }

                res = new ApiDataResponse<MRes_SanPham>(ExceptionMesseger.GetDataSucces, sanpham);
                return res;
            }
            catch (Exception e) {
                res = new ApiDataResponse<MRes_SanPham>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_Pagination<List<MRes_SanPham>>>> GetByPage(MReq_Pagination model, string access)
        {
            var res = await JwtSetting<MRes_Pagination<List<MRes_SanPham>>>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var lstSanPham = await _context.SanPhams.ToListAsync();
                var khoSanPham = _context.KhoSanPhams;
                List<MRes_SanPham> lst = new List<MRes_SanPham>();

                MRes_Pagination<List<MRes_SanPham>> pagin = new MRes_Pagination<List<MRes_SanPham>>();

                foreach (var i in lstSanPham)
                {

                    MRes_SanPham data = new MRes_SanPham
                    {
                        Id = i.Id,
                        TenSP = i.TenSP,
                        GiaBanSP = i.GiaBanSP,
                        SKU=i.SKU,
                        GiaGocSP=i.GiaGocSP,
                        HanSanXuat=i.HanSanXuat,
                    };


                    data.SoLuongTon= khoSanPham.Where(x => x.SanPhamId == i.Id).Sum(x => x.SoLuongTon);
                    lst.Add(data);
                }

                pagin.Data = lst;

                res = new ApiDataResponse<MRes_Pagination<List<MRes_SanPham>>>(ExceptionMesseger.GetDataSucces, pagin);
                return res;
            }
            catch (Exception ex) {
                res = new ApiDataResponse<MRes_Pagination<List<MRes_SanPham>>>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> Update(MReq_SanPham model, int id, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var sp = await _context.SanPhams.SingleOrDefaultAsync(x => x.Id == id);
                if (sp == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                sp.TenSP = model.TenSP;
                sp.LoiNhuan = model.LoiNhuan;
                sp.UpdateBy = model.UpdateBy;
                sp.UpdateAt = DateTime.UtcNow;
                sp.Thue = model.Thue;
                sp.HanSanXuat=model.HanSanXuat;
                return null;
            }
            catch (Exception ex) { 
            
                res=new ApiDataResponse<bool>("Lỗi hệ thống :"+ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public Task<ApiDataResponse<bool>> UpdateState(int id, int state, string access)
        {
            throw new NotImplementedException();
        }
    }
}
