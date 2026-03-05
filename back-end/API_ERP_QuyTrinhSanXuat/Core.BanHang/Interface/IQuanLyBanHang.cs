using Common.ApiResponse;
using Core.BanHang.Request;
using Core.BanHang.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.BanHang.Interface
{
    public interface IQuanLyBanHang<T,R>
    {
        Task<ApiDataResponse<MRes_Pagination<List<T>>>> GetByPage(MReq_Pagination model, string access);
        Task<ApiDataResponse<T>> GetById(int id, string access);
        Task<ApiDataResponse<bool>> Create(R model, string access);
        Task<ApiDataResponse<bool>> Update(R model, int id, string access);
        Task<ApiDataResponse<bool>> Delete(int id, string access);
        Task<ApiDataResponse<bool>> UpdateState(int id, int state, string access);
    }
}
