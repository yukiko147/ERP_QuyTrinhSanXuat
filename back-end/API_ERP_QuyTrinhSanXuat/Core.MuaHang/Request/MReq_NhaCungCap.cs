using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.MuaHang.Request
{
    public class MReq_NhaCungCap:BasicModel
    {
        public string TenNCC { get; set; }
        public string? DiaChi { get; set; }
        public string? Email { get; set; }
        public string? Sdt { get; set; }
        public string MaSoThue { get; set; }
        public string? hinhAnh { get; set; }
    }
}
