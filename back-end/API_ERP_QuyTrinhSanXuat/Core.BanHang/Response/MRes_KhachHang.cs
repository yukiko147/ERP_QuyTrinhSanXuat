using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.BanHang.Response
{
    public class MRes_KhachHang:BasicModel
    {
        public int id {  get; set; }
        public string HoTenKh { get; set; }
        public string Email { get; set; } = "";
        public string? DiaChi { get; set; }
        public string? Sdt { get; set; }
        public string? HinhAnh { get; set; }
    }
}
