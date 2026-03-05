using Common.ApiResponse;
using Common.ExceptionResponse;
using Common.JwtSecurity;
using Common.Utilities;
using Core.BanHang.Interface;
using Core.BanHang.Request;
using Core.BanHang.Response;
using DataContext.Entity;
using DataContext.MyDbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.BanHang.Service
{
    public interface IS_DonViTinh:IQuanLyBanHang<MRes_DVTinh,MReq_DVTinh>
    {
    }

    public class S_DonViTinh : IS_DonViTinh
    {
        private readonly MyContext _context;
        public S_DonViTinh(MyContext context)
        {
            _context = context;
        }

        public async Task<ApiDataResponse<bool>> Create(MReq_DVTinh model, string access)
        {
            var res=await JwtSetting<bool>.GiaiToken(access,false,PhongBanCode.Kho,_context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var data = new DVTinh
                {
                    TenDVi = model.TenDVi,
                    KyHieu = model.KyHieu,
                    Mota = model.Mota,
                    HeSo = model.HeSo,
                    CreateBy = model.CreateBy,
                    CreateAt = model.CreateAt,
                    UpdateBy = model.UpdateBy,
                    UpdateAt = model.UpdateAt,
                };


                await _context.DVTinhs.AddAsync(data);

                var save = await _context.SaveChangesAsync();
                if (save == 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.CreateDataSucces, true);
                return res;
            }
            catch (Exception ex) { 
                res=new ApiDataResponse<bool>("Lỗi hệ thống :"+ex.Message,ExceptionCode.SeverError);
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
                var d = await _context.DVTinhs.SingleOrDefaultAsync(x => x.Id == id);
                if (d == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                _context.DVTinhs.Remove(d);
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
                res= new ApiDataResponse<bool>("Lỗi hệ thống :"+ex.Message,ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_DVTinh>> GetById(int id, string access)
        {
            var res = await JwtSetting<MRes_DVTinh>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());

            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var d = await _context.DVTinhs.SingleOrDefaultAsync(x => x.Id == id);
                if (d == null)
                {
                    res = new ApiDataResponse<MRes_DVTinh>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                var r = new MRes_DVTinh
                {
                    Id = id,
                    TenDVi = d.TenDVi,
                    HeSo = d.HeSo,
                    Mota = d.Mota,
                    KyHieu = d.KyHieu,
                    CreateAt = d.CreateAt,
                    CreateBy = d.CreateBy,
                    UpdateAt = d.UpdateAt,
                    UpdateBy = d.UpdateBy,

                };

                res = new ApiDataResponse<MRes_DVTinh>(ExceptionMesseger.DeleteSucces, r);
                return res;
            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<MRes_DVTinh>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_Pagination<List<MRes_DVTinh>>>> GetByPage(MReq_Pagination model, string access)
        {
            var res = await JwtSetting<MRes_Pagination<List<MRes_DVTinh>>>.GiaiToken(access, false, PhongBanCode.Kho, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var l = await _context.DVTinhs.ToListAsync();
                var lst = new List<MRes_DVTinh>();
                foreach (var i in l)
                {
                    lst.Add(new MRes_DVTinh
                    {
                        Id = i.Id,
                        TenDVi = i.TenDVi,
                    });
                }

                MRes_Pagination<List<MRes_DVTinh>> p = new MRes_Pagination<List<MRes_DVTinh>>();
                p.Data = lst;

                res = new ApiDataResponse<MRes_Pagination<List<MRes_DVTinh>>>(ExceptionMesseger.GetDataSucces, p);
                return res;
            }
            catch (Exception ex) { 
                res=new ApiDataResponse<MRes_Pagination<List<MRes_DVTinh>>>("Lỗi hệ thống :"+ex.Message,ExceptionCode.SeverError);
                return res;
            }
        }

        public Task<ApiDataResponse<bool>> Update(MReq_DVTinh model, int id, string access)
        {
            throw new NotImplementedException();
        }

        public Task<ApiDataResponse<bool>> UpdateState(int id, int state, string access)
        {
            throw new NotImplementedException();
        }
    }
}
