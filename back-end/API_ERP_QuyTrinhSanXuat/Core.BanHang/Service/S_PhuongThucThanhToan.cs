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
    public interface IS_PhuongThucThanhToan : IQuanLyBanHang<MRes_PhuongThucThanhToan, MReq_PhuongThucThanhToan> { }
    public class S_PhuongThucThanhToan : IS_PhuongThucThanhToan
    {
        private readonly MyContext _context;
        private int BaoGia = 0;
        private int PhuongThucThanhToan = 1;
        private int ThanhCong = 2;
        private int DaHuy = -1;
        public S_PhuongThucThanhToan(MyContext context)
        {
            _context = context;
        }
        public async Task<ApiDataResponse<bool>> Create(MReq_PhuongThucThanhToan model, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var dh = new PhuongThucThanhToan
                {
                    TenDieuKhoan = model.TenDieuKhoan,
                    SoPhanTramTraTruoc = model.SoPhanTramTraTruoc,
                    SoKyTra=model.SoKyTra,
                    TienTraMoiKy = model.TienTraMoiKy,
                    CreateBy = model.CreateBy,
                    UpdateBy = model.UpdateBy,

                };


                await _context.PhuongThucThanhToans.AddAsync(dh);
                var save = await _context.SaveChangesAsync();

                if (save == 0)
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
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var qeury = await _context.PhuongThucThanhToans.SingleOrDefaultAsync(x => x.Id == id);
                if (qeury == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }


                _context.PhuongThucThanhToans.Remove(qeury);

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
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_PhuongThucThanhToan>> GetById(int id, string access)
        {
            var res = await JwtSetting<MRes_PhuongThucThanhToan>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var qeury = await _context.PhuongThucThanhToans.SingleOrDefaultAsync(x => x.Id == id);
                if (qeury == null)
                {
                    res = new ApiDataResponse<MRes_PhuongThucThanhToan>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                MRes_PhuongThucThanhToan PhuongThucThanhToan = new MRes_PhuongThucThanhToan()
                {
                    Id = qeury.Id,
                    SoPhanTramTraTruoc=qeury.SoPhanTramTraTruoc,
                    TienTraMoiKy=qeury.TienTraMoiKy,
                    TenDieuKhoan=qeury.TenDieuKhoan,
                    CreateAt = qeury.CreateAt,
                    UpdateAt = qeury.UpdateAt,
                    CreateBy = qeury.CreateBy,
                    UpdateBy = qeury.UpdateBy,
                };

                
                res = new ApiDataResponse<MRes_PhuongThucThanhToan>(ExceptionMesseger.DeleteSucces, PhuongThucThanhToan);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<MRes_PhuongThucThanhToan>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_Pagination<List<MRes_PhuongThucThanhToan>>>> GetByPage(MReq_Pagination model, string access)
        {
            var res = await JwtSetting<MRes_Pagination<List<MRes_PhuongThucThanhToan>>>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var query = await _context.PhuongThucThanhToans.ToListAsync();
                List<MRes_PhuongThucThanhToan> lst = new List<MRes_PhuongThucThanhToan>();
                foreach (var i in query)
                {
                    lst.Add(new MRes_PhuongThucThanhToan
                    {
                        Id = i.Id,
                        TenDieuKhoan=i.TenDieuKhoan,
                        SoPhanTramTraTruoc=i.SoPhanTramTraTruoc,
                        SoKyTra=i.SoKyTra,
                        TienTraMoiKy=i.TienTraMoiKy,
                        UpdateBy=i.UpdateBy,
                        CreateBy=i.CreateBy,
                        CreateAt=i.CreateAt,
                        UpdateAt = i.UpdateAt
                    });
                }

                MRes_Pagination<List<MRes_PhuongThucThanhToan>> pagin = new MRes_Pagination<List<MRes_PhuongThucThanhToan>>
                {
                    Data = lst,

                };

                res = new ApiDataResponse<MRes_Pagination<List<MRes_PhuongThucThanhToan>>>(ExceptionMesseger.GetDataSucces, pagin);
                return res;

            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<MRes_Pagination<List<MRes_PhuongThucThanhToan>>>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> Update(MReq_PhuongThucThanhToan model, int id, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var qeury = await _context.PhuongThucThanhToans.SingleOrDefaultAsync(x => x.Id == id);
                if (qeury == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                qeury.SoKyTra = model.SoKyTra;
                qeury.SoPhanTramTraTruoc = model.SoPhanTramTraTruoc;
                qeury.TenDieuKhoan = model.TenDieuKhoan;
                qeury.TienTraMoiKy = model.TienTraMoiKy;
                qeury.UpdateBy = model.UpdateBy;
                qeury.UpdateAt = DateTime.UtcNow;




                res = new ApiDataResponse<bool>(ExceptionMesseger.DeleteSucces, PhuongThucThanhToan);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public Task<ApiDataResponse<bool>> UpdateState(int id, int state, string access)
        {
            throw new NotImplementedException();
        }
    }
}
