using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.QuanLyNhanSu.Request
{
    public class MReq_Pagination
    {
        public int PageNunber { get; set; } = 0;
        public int PageSize { get; set; } = 0;
        public string Seacrch { get; set; } = "";
    }
}
