using Common.ApiResponse;
using Common.ExceptionResponse;
using Common.JwtSecurity;
using Common.Utilities;
using Core.MuaHang.Interface;
using Core.MuaHang.Request;
using Core.MuaHang.Response;
using DataContext.Entity;
using DataContext.MyDbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.MuaHang.Service
{
    public interface IS_NhaCungCap : IQuanLyMuaHang<MRes_NhaCungCap, MReq_NhaCungCap> { }

    public class S_NhaCungCap : IS_NhaCungCap
    {
        private MyContext _context;
        public S_NhaCungCap(MyContext context)
        {
            _context = context;
        }

        public async Task<ApiDataResponse<bool>> Create(MReq_NhaCungCap model, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var NhaCungCap = new NhaCungCap
                {
                    TenNCC = model.TenNCC,
                    DiaChi = model.DiaChi,
                    Email = model.Email,
                    Sdt = model.Sdt,
                    MaSoThue=model.MaSoThue,
                    CreateBy = model.CreateBy,
                    CreateAt = model.CreateAt,
                };

                await _context.AddAsync(NhaCungCap);
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
                var query = await _context.NhaCungCaps.SingleOrDefaultAsync(x => x.Id == id);
                if (query == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }


                _context.NhaCungCaps.Remove(query);
                res = new ApiDataResponse<bool>(ExceptionMesseger.DeleteSucces, true);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_NhaCungCap>> GetById(int id, string access)
        {
            var res = await JwtSetting<MRes_NhaCungCap>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var query = await _context.NhaCungCaps.SingleOrDefaultAsync(x => x.Id == id);
                if (query == null)
                {
                    res = new ApiDataResponse<MRes_NhaCungCap>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                MRes_NhaCungCap data = new MRes_NhaCungCap
                {
                    Id = query.Id,
                    TenNCC = query.TenNCC,
                    DiaChi = query.DiaChi,
                    Email = query.Email,
                    Sdt = query.Sdt,
                    HinhAnh = query.hinhAnh,
                };

                res = new ApiDataResponse<MRes_NhaCungCap>(ExceptionMesseger.GetDataSucces, data);
                return res;
            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<MRes_NhaCungCap>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_Pagination<List<MRes_NhaCungCap>>>> GetByPage(MReq_Pagination model, string access)
        {
            var res = await JwtSetting<MRes_Pagination<List<MRes_NhaCungCap>>>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var qeury = await _context.NhaCungCaps.ToArrayAsync();
                List<MRes_NhaCungCap> lst = new List<MRes_NhaCungCap>();
                foreach (var i in qeury)
                {
                    MRes_NhaCungCap k = new MRes_NhaCungCap
                    {
                        Id = i.Id,
                        TenNCC = i.TenNCC,
                        DiaChi = i.DiaChi,
                        Email = i.Email,
                        Sdt = i.Sdt,
                        HinhAnh = i.hinhAnh,
                        CreateAt = i.CreateAt,
                        CreateBy = i.CreateBy,
                        UpdateAt = i.UpdateAt,
                        UpdateBy = i.UpdateBy,
                    };
                    lst.Add(k);
                }

                var pagamin = new MRes_Pagination<List<MRes_NhaCungCap>>
                {
                    Data = lst,
                };

                res = new ApiDataResponse<MRes_Pagination<List<MRes_NhaCungCap>>>(ExceptionMesseger.GetDataSucces, pagamin);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<MRes_Pagination<List<MRes_NhaCungCap>>>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> Update(MReq_NhaCungCap model, int id, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var NhaCungCap = await _context.NhaCungCaps.SingleOrDefaultAsync(k => k.Id == id);
                if (NhaCungCap == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                NhaCungCap.TenNCC = model.TenNCC;
                NhaCungCap.DiaChi = model.DiaChi;
                NhaCungCap.Email = model.Email;
                NhaCungCap.Sdt = model.Sdt;
                NhaCungCap.UpdateBy = model.UpdateBy;
                NhaCungCap.UpdateAt = DateTime.UtcNow;

                _context.NhaCungCaps.Update(NhaCungCap);

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

        public Task<ApiDataResponse<bool>> UpdateState(int id, int state, string access)
        {
            throw new NotImplementedException();
        }
    }
}
