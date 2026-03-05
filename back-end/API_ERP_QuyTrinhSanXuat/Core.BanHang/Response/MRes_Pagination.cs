using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.BanHang.Response
{
    public class MRes_Pagination<T>
    {
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public int TotalRecord { get; set; }
        public int TotalPage { get; set; }
        public T Data { get; set; }
    }
}
