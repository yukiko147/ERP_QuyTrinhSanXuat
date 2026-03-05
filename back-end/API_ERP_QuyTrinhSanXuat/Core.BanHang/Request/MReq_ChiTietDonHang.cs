using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.BanHang.Request
{
    public class MReq_ChiTietDonHang
    {
        public int DonHangId { get; set; }
        public int SanPhamId { get; set; }
        public double ThanhTien { get; set; }
        public int SoLuongHang { get; set; }

        public int? DVTinhId {  get; set; }

    }
}
