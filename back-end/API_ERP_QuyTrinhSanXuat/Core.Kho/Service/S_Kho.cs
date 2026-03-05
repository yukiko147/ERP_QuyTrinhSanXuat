using Common.ApiResponse;
using Common.ExceptionResponse;
using Common.JwtSecurity;
using Common.Utilities;
using Core.Kho.Interface;
using Core.Kho.Request;
using Core.Kho.Response;
using DataContext.Entity;
using DataContext.MyDbContext;
using DataContext.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Service
{
    public interface IS_Kho : IQuanLyKho<MRes_Kho, MReq_Kho> {
        Task<ApiDataResponse<List<MRes_KhoSanPham>>> GetAllKhoSanPham(string acces);
        Task<ApiDataResponse<List<MRes_khoVatTu>>> GetAllKhoVatTu(string acces);
    
    }
    public class S_Kho : IS_Kho
    {
        private readonly MyContext _context;
        public S_Kho(MyContext context)
        {
            _context = context;
        }
        public async Task<ApiDataResponse<bool>> Create(MReq_Kho model, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {

                KhoChua data = new KhoChua
                {

                    TenKho = model.TenKho,
                    DiaChiKho = model.DiaChiKho,
                    CreateAt = DateTime.UtcNow,
                    UpdateAt = DateTime.UtcNow,
                    CreateBy = model.CreateBy,
                    UpdateBy = model.UpdateBy,


                };


                await _context.KhoChuas.AddAsync(data);



                //var save1 = await _context.SaveChangesAsync();


                //if (save1 == 0)
                //{
                //    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                //    return res;
                //}

                //data.SKU = StringFormat.GenerateDateSku(model.TenSP, data.Id);


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

        public Task<ApiDataResponse<bool>> Delete(int id, string access)
        {
            throw new NotImplementedException();
        }

        public async Task<ApiDataResponse<List<MRes_KhoSanPham>>> GetAllKhoSanPham(string acces)
        {
            var res = await JwtSetting<List<MRes_KhoSanPham>>.GiaiToken(acces, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var d = await _context.KhoSanPhams.Include(x=>x.KhoChua).Include(x=>x.SanPham).ToListAsync();

                List<MRes_KhoSanPham> k = new List<MRes_KhoSanPham>();
                foreach(var i in d)
                {
                    MRes_KhoSanPham a = new MRes_KhoSanPham
                    {
                        TenKho = i.KhoChua.TenKho,
                        TenSP = i.SanPham.TenSP,
                        NgayHetHan = i.NgayHetHan,
                        SoLo = i.SoLo,
                        NgaySX = i.NgaySX,
                        SoLuongTon = i.SoLuongTon,
                    };

                    k.Add(a);
                }

                res = new ApiDataResponse<List<MRes_KhoSanPham>>(ExceptionMesseger.GetDataSucces, k);
                return res;
            }catch(Exception ex)
            {
                res = new ApiDataResponse<List<MRes_KhoSanPham>>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<List<MRes_khoVatTu>>> GetAllKhoVatTu(string acces)
        {
            var res = await JwtSetting<List<MRes_khoVatTu>>.GiaiToken(acces, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var d = await _context.KhoVatTus.Include(x => x.KhoChua).Include(x => x.VatTu).ToListAsync();

                List<MRes_khoVatTu> k = new List<MRes_khoVatTu>();
                foreach (var i in d)
                {
                    MRes_khoVatTu a = new MRes_khoVatTu
                    {
                        TenKho = i.KhoChua.TenKho,
                        TenVatTu = i.VatTu.TenVatTu,
                        SoLuongTon= i.SoLuongTon,
                        
                    };

                    k.Add(a);
                }

                res = new ApiDataResponse<List<MRes_khoVatTu>>(ExceptionMesseger.GetDataSucces, k);
                return res;
            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<List<MRes_khoVatTu>>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_Kho>> GetById(int id, string access)
        {
            var res = await JwtSetting<MRes_Kho>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var query = await _context.KhoChuas.SingleOrDefaultAsync(x => x.Id == id);

                if (query == null)
                {
                    res = new ApiDataResponse<MRes_Kho>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                MRes_Kho Kho = new MRes_Kho
                {
                    Id = id,
                    TenKho = query.TenKho,
                    DiaChiKho = query.DiaChiKho,
                    CreateAt = query.CreateAt,
                    CreateBy = query.CreateBy,
                    UpdateAt = query.UpdateAt,
                    UpdateBy = query.UpdateBy
                };

                res = new ApiDataResponse<MRes_Kho>(ExceptionMesseger.GetDataSucces, Kho);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<MRes_Kho>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_Pagination<List<MRes_Kho>>>> GetByPage(MReq_Pagination model, string access)
        {
            var res = await JwtSetting<MRes_Pagination<List<MRes_Kho>>>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var query = await _context.KhoChuas.ToListAsync();
                var pagin = new MRes_Pagination<List<MRes_Kho>>();
                var lst = new List<MRes_Kho>();
                foreach (var item in query)
                {
                    MRes_Kho data = new MRes_Kho
                    {
                        Id = item.Id,
                        TenKho = item.TenKho,
                        DiaChiKho = item.DiaChiKho,
                        CreateAt = item.CreateAt,
                        UpdateAt = item.UpdateAt,
                        CreateBy = item.CreateBy,
                        UpdateBy = item.UpdateBy,
                    };
                    lst.Add(data);
                }

                pagin.Data = lst;

                res = new ApiDataResponse<MRes_Pagination<List<MRes_Kho>>>(ExceptionMesseger.GetDataSucces, pagin);
                return res;
            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<MRes_Pagination<List<MRes_Kho>>>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }


        public Task<ApiDataResponse<bool>> Update(MReq_Kho model, int id, string access)
        {
            throw new NotImplementedException();
        }

        public Task<ApiDataResponse<bool>> UpdateState(int id, int state, string access)
        {
            throw new NotImplementedException();
        }
    }
}
