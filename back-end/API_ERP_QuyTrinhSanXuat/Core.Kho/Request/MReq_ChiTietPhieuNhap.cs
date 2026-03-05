using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Request
{
    public class MReq_ChiTietPhieuNhap:BasicModel
    {
        public int VatTuId { get; set; }
        public int SoLuongHang { get; set; }
        public double Thue { get; set; }
        public double DonGia {  get; set; }
    }
}
