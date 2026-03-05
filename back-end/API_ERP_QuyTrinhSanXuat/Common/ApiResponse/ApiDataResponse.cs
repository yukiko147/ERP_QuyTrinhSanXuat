using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.ApiResponse
{
    public class ApiDataResponse<T>
    {
        public bool Success { get; set; } = true;
        public int Code { get; set; } = 200;
        public string Message { get; set; }
        public T Data { get; set; } 

        public ApiDataResponse() { }
        public ApiDataResponse(string message, T data)
        {
            Success = true;
            Code = 200;
            Message = message;
            Data = data;
        }

        public ApiDataResponse(string message,int code)
        {
            Success = false;
            Code = code;
            Message = message;
            Data = default;
        }
    }
}
