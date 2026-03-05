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
    public interface IS_DonMua:IQuanLyMuaHang<MRes_DonMua,MReq_DonMua>
    {
    }

    public class S_DonMua : IS_DonMua
    {

        private readonly MyContext _context;
        public S_DonMua(MyContext context)
        {
            _context = context;
        }


        public async Task<ApiDataResponse<bool>> Create(MReq_DonMua model, string access)
        {
            var res=await JwtSetting<bool>.GiaiToken(access,false,PhongBanCode.MuaHang,_context.Database.GetConnectionString());
            if(res.Code>200)
            {
                return res;
            }

            try
            {
                DonNhap d = new DonNhap
                {
                    MaDGH = model.MaDGH,
                    ThoiGianGiao = model.ThoiGianGiao,
                    Thue = model.Thue,
                    //TienTruocThue = model.TienTruocThue,
                    //TongGTriDH = model.TongGTriDH,
                    //TongHang = model.TongHang,
                    TrangThai = 0,
                    NhaCungCapId = model.NhaCungCapId,
                    CreateBy=model.CreateBy,
                    UpdateBy=model.UpdateBy,
                    KhoHangId=model.KhoChuaId,
                };

                d.ChiTietDonNhaps = new List<ChiTietDonNhap>();

                foreach(var i in  model.ChiTietDonNhaps)
                {
                    var ctdn = new ChiTietDonNhap
                    {
                        VatTuId = i.VatTuId,
                        SoLuongHang = i.SoLuongHang,
                        ThanhTien = i.SoLuongHang*i.DonGia,
                        Thue = i.Thue,
                        DonGia = i.DonGia,

                    };
                    d.ChiTietDonNhaps.Add(ctdn);
                    d.TienTruocThue = d.TienTruocThue + (i.SoLuongHang * i.DonGia);
                    d.TongHang = d.TongHang + i.SoLuongHang;
       
                }
                d.TongGTriDH = d.TienTruocThue + d.TienTruocThue * d.Thue / 100;

                await _context.AddAsync(d);

                var save = await _context.SaveChangesAsync();
                if(save==0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.CreateDataSucces, true);
                return res;
            }catch(Exception ex)
            {
                res=new ApiDataResponse<bool>("Lỗi hệ thống :"+ex.Message, ExceptionCode.SeverError);
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
                var query = await _context.DonNhap.SingleOrDefaultAsync(x => x.Id == id);
                if (query == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }


                _context.DonNhap.Remove(query);

                var save = await _context.SaveChangesAsync();
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

        public async Task<ApiDataResponse<MRes_DonMua>> GetById(int id, string access)
        {
            var res = await JwtSetting<MRes_DonMua>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var query = await _context.DonNhap.Include(x=>x.ChiTietDonNhaps).SingleOrDefaultAsync(x => x.Id == id);
                if (query == null)
                {
                    res = new ApiDataResponse<MRes_DonMua>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                MRes_DonMua data = new MRes_DonMua
                {
                    Id = query.Id,
                    MaDGH=query.MaDGH,
                    NhaCungCapId = query.NhaCungCapId,
                    CreateAt= query.CreateAt,
                    CreateBy= query.CreateBy,
                    ThoiGianGiao=query.ThoiGianGiao,
                    Thue=query.Thue,
                    TienTruocThue=query.TienTruocThue,
                    TongGTriDH=query.TongGTriDH,
                    TongHang=query.TongHang,
                    TrangThai=query.TrangThai,
                    UpdateAt=   query.UpdateAt,
                    UpdateBy= query.UpdateBy,
                    KhoChuaId=query.KhoHangId.Value
                };

                foreach(var i in query.ChiTietDonNhaps)
                {
                    data.ChiTietDonNhaps.Add(new MRes_ChiTietDonMua
                    {
                        VatTuId=i.VatTuId,
                        DonNhapId=i.DonNhapId,
                        DonGia=i.DonGia,
                        ThanhTien=i.ThanhTien*i.DonGia,
                        SoLuongHang=i.SoLuongHang,
                        Thue=i.Thue,
                    });
                }


                res = new ApiDataResponse<MRes_DonMua>(ExceptionMesseger.GetDataSucces, data);
                return res;
            }
            catch (Exception ex)
            {
                res = new ApiDataResponse<MRes_DonMua>("Lỗi hệ thống :" + ex.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<MRes_Pagination<List<MRes_DonMua>>>> GetByPage(MReq_Pagination model, string access)
        {
            var res = await JwtSetting<MRes_Pagination<List<MRes_DonMua>>>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var qeury = await _context.DonNhap.OrderByDescending(x=>x.CreateAt).ToArrayAsync();
                List<MRes_DonMua> lst = new List<MRes_DonMua>();
                foreach (var i in qeury)
                {
                    MRes_DonMua k = new MRes_DonMua
                    {
                        Id = i.Id,
                        MaDGH   = i.MaDGH,
                        TongGTriDH= i.TongGTriDH,
                        TongHang = i.TongHang,
                        TienTruocThue= i.TienTruocThue,
                        CreateAt = i.CreateAt,
                        CreateBy = i.CreateBy,
                        UpdateAt = i.UpdateAt,
                        UpdateBy = i.UpdateBy,
                        TrangThai=i.TrangThai,
                    };
                    lst.Add(k);
                }

                var pagamin = new MRes_Pagination<List<MRes_DonMua>>
                {
                    Data = lst,
                };

                res = new ApiDataResponse<MRes_Pagination<List<MRes_DonMua>>>(ExceptionMesseger.GetDataSucces, pagamin);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<MRes_Pagination<List<MRes_DonMua>>>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;
            }
        }

        public async Task<ApiDataResponse<bool>> Update(MReq_DonMua model, int id, string access)
        {
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.BanHang, _context.Database.GetConnectionString());
            if (res.Code > 200)
            {
                return res;
            }

            try
            {
                var DonMua = await _context.DonNhap.SingleOrDefaultAsync(k => k.Id == id);
                if (DonMua == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                DonMua.NhaCungCapId = model.NhaCungCapId;
                //DonMua.TongHang = model.TongHang;
                DonMua.ThoiGianGiao = model.ThoiGianGiao;
                //DonMua.TongHang=model.TongHang;
                //DonMua.TienTruocThue=model.TienTruocThue;
                //DonMua.TongGTriDH=model.TongGTriDH;
                DonMua.KhoHangId = model.KhoChuaId;
                DonMua.UpdateBy = model.UpdateBy;
                DonMua.UpdateAt = DateTime.UtcNow;
                _context.ChiTietDonNhaps.RemoveRange(DonMua.ChiTietDonNhaps);
                DonMua.ChiTietDonNhaps = new List<ChiTietDonNhap>();
                foreach(var i in model.ChiTietDonNhaps)
                {
                    DonMua.ChiTietDonNhaps.Add(new ChiTietDonNhap
                    {
                        VatTuId = i.VatTuId,
                        SoLuongHang = i.SoLuongHang,
                        DonGia = i.DonGia,
                        ThanhTien = i.DonGia * i.SoLuongHang,
                        Thue = i.Thue
                    });

                    DonMua.TongHang = DonMua.TongHang + i.SoLuongHang;
                    DonMua.TongGTriDH = DonMua.TongGTriDH + i.DonGia * i.SoLuongHang;
                }

                _context.DonNhap.Update(DonMua);

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
            var res = await JwtSetting<bool>.GiaiToken(access, false, PhongBanCode.MuaHang, _context.Database.GetConnectionString());
            if (res.Code>200)
            {
                return res;
            }

            try
            {
                var d = await _context.DonNhap.Include(x => x.ChiTietDonNhaps).SingleOrDefaultAsync(x => x.Id == id);
                if (d == null)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.NotFound, ExceptionCode.NotFound);
                    return res;
                }

                if(d.TrangThai != 0&&d.TrangThai!=1)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest,ExceptionCode.BadRequest);
                    return res;
                }

                switch(state)
                {
                    case 2:

                        var nhaccc=await _context.NhaCungCaps.SingleOrDefaultAsync(x => x.Id == d.NhaCungCapId);

                        var p = new PhieuNhap
                        {
                            NhaCungCapId = d.NhaCungCapId.Value,
                            DonNhapId = d.Id,
                            KhoChuaId = d.KhoHangId.Value,
                            MaPN = d.MaDGH,
                            DiaChiNguon = nhaccc.DiaChi,
                            NgayNhap = DateTime.UtcNow,
                            TrangThai = 1,
                            Thue=d.Thue,
                            TongGiaTri=d.TongGTriDH,
                            TienTruocThue=d.TienTruocThue,

                        };

                        foreach(var i in d.ChiTietDonNhaps)
                        {
                            p.ChiTietPhieuNhaps.Add(new ChiTietPhieuNhap
                            {
                                SoLuongHang = i.SoLuongHang,
                                ThanhTien = i.ThanhTien,
                                Thue = i.Thue,
                                VatTuId = i.VatTuId,
                                DonGia = i.DonGia,
                            });
                        }

                        await _context.PhieuNhaps.AddAsync(p);
                        d.TrangThai = 2;
                        break;
                    case -1:

                        d.TrangThai = -1;
                        break;
                }

                _context.DonNhap.Update(d);
                var save = await _context.SaveChangesAsync();
                if(save==0)
                {
                    res = new ApiDataResponse<bool>(ExceptionMesseger.BadRequest, ExceptionCode.BadRequest);
                    return res;
                }

                res = new ApiDataResponse<bool>(ExceptionMesseger.EditSucces, true);
                return res;
            }
            catch (Exception e)
            {
                res = new ApiDataResponse<bool>("Lỗi hệ thống :" + e.Message, ExceptionCode.SeverError);
                return res;

            }
        }
    }
}
