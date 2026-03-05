using Common.ApiResponse;
using Core.Kho.Request;
using Core.Kho.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Interface
{
    public interface IQuanLyKho<T,R>
    {
        Task<ApiDataResponse<MRes_Pagination<List<T>>>> GetByPage(MReq_Pagination model, string access);
        Task<ApiDataResponse<T>> GetById(int id, string access);
        Task<ApiDataResponse<bool>> Create(R model, string access);
        Task<ApiDataResponse<bool>> Update(R model, int id, string access);
        Task<ApiDataResponse<bool>> Delete(int id, string access);
        Task<ApiDataResponse<bool>> UpdateState(int id, int state, string access);
    }
}
