using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.BanHang.Response
{
    public class MRes_ChiTietDonHang
    {
        public int DonHangId { get; set; }
        public int SanPhamId { get; set; }
        public double ThanhTien { get; set; }
        public int SoLuongHang { get; set; }
        public double Thue { get; set; }
        public double DonGia { get; set; }
        public int TrangThai {  get; set; }
        public int? DVTinhId { get; set; }

    }
}
