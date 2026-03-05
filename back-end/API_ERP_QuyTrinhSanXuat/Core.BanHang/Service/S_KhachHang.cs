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
    public interface IS_KhachHang:IQuanLyBanHang<MRes_KhachHang,MReq_KhachHang>
    {
    }

    public class S_KhachHang : IS_KhachHang
    {
        private MyContext _context;
        public S_KhachHang(MyContext context) {
            _context = context;
        }

        public async Task<ApiDataResponse<bool>> Create(MReq_KhachHang model, string access)
        {
            var res=await JwtSetting<bool>.GiaiToken(access,false,PhongBanCode.BanHang,_context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var khachhang = new KhachHang
                {
                    HoTenKh = model.HoTenKh,
                    DiaChi = model.DiaChi,
                    Email = model.Email,
                    Sdt = model.Sdt,
                    CreateBy = model.CreateBy,
                    CreateAt = model.CreateAt,
                    HinhAnh= model.HinhAnh,
                };

                _context.AddAsync(khachhang);
                var save = await _context.SaveChangesAsync();

                if (save == 0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.CreateDataSucces, true);
                return res;
            }
            catch (Exception e) {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
                    
            }
        }

        public async Task<ApiDataResponse<bool>> Delete(int id, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var query = await _context.KhachHangs.SingleOrDefaultAsync(x => x.Id == id);
                if (query == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }


                _context.KhachHangs.Remove(query);
  
                var save = await _context.SaveChangesAsync();
                if(save==0)
                {
                    return res=new ApiDataResponse<bool>(ExceptionMesseger.BadRequest,ExceptionCode.BadRequest);
                }
                res = new ApiDataResponse<bool>(ExceptionMesseger.DeleteSucces, true);
                return res;
            }
            catch (Exception e) { 
                res=new ApiDataResponse<bool>("Lỗi hệ thống :"+e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_KhachHang>> GetById(int id, string access)
        {
            var res = await JwtSetting<MRes_KhachHang>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200) { 
                return res;
            }

            try
            {
                var query = await _context.KhachHangs.SingleOrDefaultAsync(x => x.Id == id);
                if (query == null)
                {
                    res = new ApiDataResponse<MRes_KhachHang>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                MRes_KhachHang data = new MRes_KhachHang
                {
                    id = query.Id,
                    HoTenKh = query.HoTenKh,
                    DiaChi = query.DiaChi,
                    Email = query.Email,
                    Sdt = query.Sdt,
                    HinhAnh = query.HinhAnh,
                };

                res = new ApiDataResponse<MRes_KhachHang>(ExceptionMesseger.GetDataSucces, data);
                return res;
            }
            catch (Exception ex) { 
                res=new ApiDataResponse<MRes_KhachHang>("Lỗi hệ thống :"+ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_Pagination<List<MRes_KhachHang>>>> GetByPage(MReq_Pagination model, string access)
        {
            var res = await JwtSetting<MRes_Pagination<List<MRes_KhachHang>>>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                var qeury = await _context.KhachHangs.ToArrayAsync();
                List<MRes_KhachHang> lst = new List<MRes_KhachHang>();
                foreach(var i in  qeury)
                {
                    MRes_KhachHang k = new MRes_KhachHang
                    {
                        id = i.Id,
                        HoTenKh = i.HoTenKh,
                        DiaChi = i.DiaChi,
                        Email = i.Email,
                        Sdt = i.Sdt,
                        HinhAnh = i.HinhAnh,
                        CreateAt = i.CreateAt,
                        CreateBy = i.CreateBy,
                        UpdateAt = i.UpdateAt,
                        UpdateBy = i.UpdateBy,
                    };
                    lst.Add(k);
                }

                var pagamin = new MRes_Pagination<List<MRes_KhachHang>>
                {
                    Data = lst,
                };

                res = new ApiDataResponse<MRes_Pagination<List<MRes_KhachHang>>>(ExceptionMesseger.GetDataSucces, pagamin);
                return res;
            }catch(Exception e)
            {
                res = new ApiDataResponse<MRes_Pagination<List<MRes_KhachHang>>>("Lỗi hệ thống :"+e.Message,ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> Update(MReq_KhachHang model, int id, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var khachhang= await _context.KhachHangs.SingleOrDefaultAsync(k => k.Id == id);
                if (khachhang == null)
                {
                    res=new ApiDataResponse<bool>(ExceptionMesseger.NotFound,ExceptionCode.NotFound);
                    return res;
                }

                khachhang.HoTenKh=model.HoTenKh;
                khachhang.DiaChi=model.DiaChi;
                khachhang.Email=model.Email;
                khachhang.Sdt=model.Sdt;
                khachhang.UpdateBy=model.UpdateBy;
                khachhang.UpdateAt = DateTime.UtcNow;
                khachhang.HinhAnh=model.HinhAnh;
                _context.KhachHangs.Update(khachhang);

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
