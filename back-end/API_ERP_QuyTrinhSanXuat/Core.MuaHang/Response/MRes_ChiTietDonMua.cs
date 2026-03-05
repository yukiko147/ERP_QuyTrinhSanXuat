using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.MuaHang.Response
{
    public class MRes_ChiTietDonMua
    {
        public int DonNhapId { get; set; }
        public int VatTuId { get; set; }
        public double ThanhTien { get; set; }
        public int SoLuongHang { get; set; }
        public double Thue { get; set; }
        public double DonGia { get; set; }
    }
}
