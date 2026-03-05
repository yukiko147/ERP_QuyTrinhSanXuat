using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Response
{
    public class MRes_ChiTietPhieuNhap
    {
        public int PhieuNhapId { get; set; }
        public int VatTuId { get; set; }
        public int SoLuongHang { get; set; }
        public double Thue { get; set; }
        public double ThanhTien {  get; set; }
        public double DonGia {  get; set; }

    }
}
