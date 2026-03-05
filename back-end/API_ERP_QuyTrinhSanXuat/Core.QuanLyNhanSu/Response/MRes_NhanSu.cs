using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.QuanLyNhanSu.Response
{
    public class MRes_NhanSu :BasicModel
    {
        public int Id { get; set; }
        public string TenDangNhap { get; set; }

        public string MatKhau { get; set; }
        public string HoTenNhanSu { get; set; }
        public int GioiTinh { get; set; }
        public string? Email { get; set; }
        public string? DiaChi { get; set; }
        public string? Sdt { get; set; }
        public string? HinhAnh { get; set; }
        public int ChucVu { get; set; }
        public int PhongBan { get; set; }
        public int? NhanSuId { get; set; }

    }
}
