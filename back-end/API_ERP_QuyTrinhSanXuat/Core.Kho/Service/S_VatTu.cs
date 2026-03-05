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
    public interface IS_VatTu : IQuanLyKho<MRes_VatTu, MReq_VatTu> { }
    public class S_VatTu : IS_VatTu
    {
        private readonly MyContext _context;
        public S_VatTu(MyContext context)
        {
            _context = context;
        }
        public async Task<ApiDataResponse<bool>> Create(MReq_VatTu model, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                VatTu data = new VatTu
                {
                     GiaBan=model.GiaBan,
                     DVTinhId=model.DVTinhVtuId,
                     Mota=model.Mota,
                     TenVatTu=model.TenVatTu,
                    HinhAnh = model.HinhAnh,
                    TrangThai = model.TrangThai,
                    CreateAt = DateTime.UtcNow,
                    UpdateAt = DateTime.UtcNow,
                    CreateBy = model.CreateBy,
                    UpdateBy = model.UpdateBy,


                };


                await _context.VatTus.AddAsync(data);



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
        public async Task<ApiDataResponse<bool>> Delete(int id, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var a = await _context.VatTus.SingleOrDefaultAsync(x => x.Id == id);
                if (a == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                _context.VatTus.Remove(a);

                var save = await _context.SaveChangesAsync();
                if (save == 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }


                res = new ApiDataResponse<bool>(ExceptionMesseger.DeleteSucces, true);
                return res;
            }
            catch (Exception ex) { 
                res = new ApiDataResponse<bool>("lỗi hệ thống :"+ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_VatTu>> GetById(int id, string access)
        {
            var res = await JwtSetting<MRes_VatTu>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var query = await _context.VatTus.SingleOrDefaultAsync(x => x.Id == id);

                if (query == null)
                {
                    res = new ApiDataResponse<MRes_VatTu>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                var soton=await _context.KhoVatTus.Where(x=>x.VatTuId== id).SumAsync(x=>x.SoLuongTon);

                MRes_VatTu VatTu = new MRes_VatTu
                {
                    Id = id,
                    TenVatTu=query.TenVatTu,
                    Mota=query.Mota,
                    DVTinhVTuId=query.DVTinhId,
                    GiaBan=query.GiaBan,
                    HinhAnh=query.HinhAnh,
                    TonKho=soton,
                    TrangThai = query.TrangThai,
                    CreateAt = query.CreateAt,
                    CreateBy = query.CreateBy,
                    UpdateAt = query.UpdateAt,
                    UpdateBy = query.UpdateBy
                };

                res = new ApiDataResponse<MRes_VatTu>(ExceptionMesseger.GetDataSucces, VatTu);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<MRes_VatTu>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_Pagination<List<MRes_VatTu>>>> GetByPage(MReq_Pagination model, string access)
        {
            var res = await JwtSetting<MRes_Pagination<List<MRes_VatTu>>>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var lstVatTu = await _context.VatTus.ToListAsync();
                var khoVatTu =_context.KhoVatTus;
                List<MRes_VatTu> lst = new List<MRes_VatTu>();

                MRes_Pagination<List<MRes_VatTu>> pagin = new MRes_Pagination<List<MRes_VatTu>>();

                foreach (var i in lstVatTu)
                {

                    MRes_VatTu data = new MRes_VatTu
                    {
                        Id = i.Id,
                        TenVatTu =i.TenVatTu,
                        GiaBan = i.GiaBan,
                    };


                    data.TonKho = khoVatTu.Where(x => x.VatTuId == i.Id).Sum(x => x.SoLuongTon);
                    lst.Add(data);
                }

                pagin.Data = lst;

                res = new ApiDataResponse<MRes_Pagination<List<MRes_VatTu>>>(ExceptionMesseger.GetDataSucces, pagin);
                return res;
            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<MRes_Pagination<List<MRes_VatTu>>>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> Update(MReq_VatTu model, int id, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var query = await _context.VatTus.SingleOrDefaultAsync(x => x.Id == id);

                if (query == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                query.TenVatTu= model.TenVatTu;
                query.GiaBan=model.GiaBan;
                query.Mota=model.Mota;
                query.HinhAnh=model.HinhAnh;
                query.TrangThai=model.TrangThai;
                query.UpdateBy=model.UpdateBy;
                query.UpdateAt = DateTime.UtcNow;

                res = new ApiDataResponse<bool>(ExceptionMesseger.GetDataSucces, true);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public Task<ApiDataResponse<bool>> UpdateState(int id, int state, string access)
        {
            throw new NotImplementedException();
        }
    }
}
