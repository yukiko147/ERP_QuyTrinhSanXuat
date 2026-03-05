using Common.ApiResponse;
using Common.JwtSecurity;
using Common.Utilities;
using Core.QuanLyNhanSu.Interface;
using Core.QuanLyNhanSu.Reponsitory;
using Core.QuanLyNhanSu.Request;
using Core.QuanLyNhanSu.Response;
using DataContext.MyDbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.ExceptionResponse;
using DataContext.Entity;
using DataContext.MyDbQuery;
using System.Data;
using Microsoft.Data.SqlClient;
namespace Core.QuanLyNhanSu.Service
{
    public interface IS_NhanSu:IQuanLyNhanSu<MRes_NhanSu, MReq_NhanSu>
    {
        Task<ApiDataResponse<MRes_Login>> Login(MReq_Login model);
        Task<ApiDataResponse<bool>> LogOut(string token);
        Task<ApiDataResponse<bool>> KhoiTao(MReq_NhanSu model);
    }

    public class S_NhanSu:IS_NhanSu
    {
        private MyContext _context;
        public S_NhanSu(MyContext context)
        {
            this._context = context;
        }

        public async Task<ApiDataResponse<bool>> Create(MReq_NhanSu model, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.NhanSu,_context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var nhanSu = new NhanSu
                {
                    HoTenNhanSu = model.HoTenNhanSu,
                    DiaChi = model.DiaChi,
                    Email = model.Email,
                    GioiTinh = model.GioiTinh,
                    Sdt = model.Sdt,
                    MatKhau = model.MatKhau,
                    TenDangNhap = model.TenDangNhap,
                    ChucVu = model.ChucVu,
                    PhongBan = model.PhongBan,
                    HinhAnh = model.HinhAnh,
                    CreateBy=model.CreateBy,
                    UpdateBy=model.UpdateBy,
                };

                await _context.NhanSus.AddAsync(nhanSu);
                var save = await _context.SaveChangesAsync();
                if(save==0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.CreateDataSucces, true);

                return res;
            }catch(Exception e)
            {
                res= new ApiDataResponse<bool>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> Delete(int id, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.NhanSu,_context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
               
                var nhansu=await _context.NhanSus.SingleOrDefaultAsync(n => n.Id == id);
                if(nhansu==null)
                {
                    res= new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                _context.NhanSus.Remove(nhansu);

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
                res= new ApiDataResponse<bool>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_NhanSu>> GetById(int id, string access)
        {
            var res = await JwtSetting<MRes_NhanSu>.GiaiToken(access, false, PhongBanCode.NhanSu,_context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {

                var nhansu = await _context.NhanSus.SingleOrDefaultAsync(n => n.Id == id);
                if (nhansu == null)
                {
                    res= new ApiDataResponse<MRes_NhanSu>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                MRes_NhanSu data = new MRes_NhanSu
                {
                    Id = nhansu.Id,
                    TenDangNhap = nhansu.TenDangNhap,
                    MatKhau = nhansu.MatKhau,
                    HoTenNhanSu = nhansu.HoTenNhanSu,
                    GioiTinh = nhansu.GioiTinh,
                    Email = nhansu.Email,
                    DiaChi = nhansu.DiaChi,
                    Sdt = nhansu.Sdt,
                    ChucVu = nhansu.ChucVu,
                    PhongBan = nhansu.PhongBan,
                    HinhAnh = nhansu.HinhAnh,
                    CreateAt = nhansu.CreateAt,
                    UpdateAt= nhansu.UpdateAt,
                    CreateBy = nhansu.CreateBy,
                    UpdateBy = nhansu.UpdateBy,

                };
                res= new ApiDataResponse<MRes_NhanSu>(ExceptionMesseger.GetDataSucces, data); ;
                return res;
            }
            catch (Exception e)
            {
                res= new ApiDataResponse<MRes_NhanSu>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_Pagination<List<MRes_NhanSu>>>> GetByPage(MReq_Pagination model, string access)
        {
            var res = await JwtSetting<MRes_Pagination<List<MRes_NhanSu>>>.GiaiToken(access, false, PhongBanCode.NhanSu,_context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var query = _context.NhanSus;
                var dataQurery=await query.Where(x=>x.PhongBan>0).ToListAsync();


                List<MRes_NhanSu> lst=new List<MRes_NhanSu>();
                foreach(var i in dataQurery)
                {
                    MRes_NhanSu nhansu = new MRes_NhanSu
                    {
                        Id = i.Id,
                        TenDangNhap = i.TenDangNhap,
                        HoTenNhanSu = i.HoTenNhanSu,
                        ChucVu = i.ChucVu,
                        PhongBan = i.PhongBan,
                        Sdt = i.Sdt,
                        HinhAnh = i.HinhAnh,
                        GioiTinh=i.GioiTinh
                    };
                    lst.Add(nhansu);
                }

                var data = new MRes_Pagination<List<MRes_NhanSu>>
                {
                    PageSize = model.PageSize,
                    PageNumber = model.PageNunber,
                    TotalRecord = await query.CountAsync(),
                    TotalPage= (int)Math.Ceiling((double)await query.CountAsync() / model.PageSize),
                    Data = lst
                };

                res = new ApiDataResponse<MRes_Pagination<List<MRes_NhanSu>>>(ExceptionMesseger.GetDataSucces,data);

                return res;

            }catch(Exception e)
            {
                res= new ApiDataResponse<MRes_Pagination<List<MRes_NhanSu>>>("Lỗi từ sever :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> KhoiTao(MReq_NhanSu model)
        {
            var res=new ApiDataResponse<bool>();
            try
            {
                var query = await _context.NhanSus.Where(x => x.PhongBan == 0).ToListAsync();
                if (query.Count > 0)
                {
                    res = new ApiDataResponse<bool>("Đã tồn tại tài khoản admin không thể thêm !!!", ExceptionCode.BadRequest);
                    return res;
                }

                var nhansu = new NhanSu
                {
                    TenDangNhap = model.TenDangNhap,
                    HoTenNhanSu = model.HoTenNhanSu,
                    MatKhau = model.MatKhau,
                    ChucVu = 1,
                    PhongBan = 0,
                    GioiTinh = model.GioiTinh,
                    Email = model.Email,
                    Sdt = model.Sdt,
                    DiaChi=model.DiaChi,
                    UpdateBy = 0,
                    CreateBy = 0,
                };

                _context.NhanSus.AddAsync(nhansu);
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
                res = new ApiDataResponse<bool>("Lỗi hệ thống :"+ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_Login>> Login(MReq_Login model)
        {
            try
            {
                string sql = "Select Id,ChucVu,PhongBan,HoTenNhanSu from NhanSu Where TenDangNhap = @tendangnhap and MatKhau = @matkhau";
                SqlParameter[] parameter = new[]
                {
                    new SqlParameter("@tendangnhap", model.TenDangNhap),
                    new SqlParameter("@matkhau", model.MatKhau)
                };

                var query = await MyQuery.GetData(sql, _context.Database.GetConnectionString(), CommandType.Text, parameter);

                if(query.Rows.Count==0)
                {
                    return new ApiDataResponse<MRes_Login>(ExceptionMesseger.LoginFall, ExceptionCode.Unauthorized);
                }

                var row=query.Rows[0];

                var login = new MRes_Login
                {
                    Id = Convert.ToInt32(row["Id"]),
                    ChucVu = Convert.ToInt32(row["ChucVu"]),
                    PhongBan = Convert.ToInt32(row["PhongBan"]),
                    TenNhanSu = row["HoTenNhanSu"].ToString(),
                    AccesToken = JwtSetting<MRes_Login>.TaoToken(Convert.ToInt32(row["Id"]))
                };


                return new ApiDataResponse<MRes_Login>(ExceptionMesseger.LoginSucces, login);
            }
            catch (Exception e) {
                return new ApiDataResponse<MRes_Login>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
            }
        }

        public Task<ApiDataResponse<bool>> LogOut(string token)
        {
            throw new NotImplementedException();
        }

        public async Task<ApiDataResponse<bool>> Update(MReq_NhanSu model, int id, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.NhanSu,_context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {

                var nhansu = await _context.NhanSus.SingleOrDefaultAsync(n => n.Id == id);
                if (nhansu == null)
                {
                    res= new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                nhansu.HoTenNhanSu = model.HoTenNhanSu;
                nhansu.ChucVu=model.ChucVu;
                nhansu.MatKhau= model.MatKhau;
                nhansu.PhongBan=model.PhongBan;
                nhansu.Sdt=model.Sdt;
                nhansu.Email=model.Email;
                nhansu.DiaChi=model.DiaChi;
                nhansu.GioiTinh=model.GioiTinh;
               
                nhansu.UpdateAt = DateTime.UtcNow;
                nhansu.UpdateBy = model.UpdateBy;

                _context.NhanSus.Update(nhansu);

                var save = await _context.SaveChangesAsync();
                if (save == 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.EditSucces, true);

                return res;
            }
            catch (Exception e)
            {
                res= new ApiDataResponse<bool>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public Task<ApiDataResponse<bool>> UpdateState(int id, int state, string access)
        {
            throw new NotImplementedException();
        }
    }
}
