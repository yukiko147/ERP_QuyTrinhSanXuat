using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.SanXuat.Request
{
    public class MReq_ChiTietCheTao
    {
        public int LenhSXId { get; set; }
        public int VatTuId { get; set; }
        public double GiaVatTu { get; set; }
        public int SoLuongCan { get; set; }
        public int DVTinhId { get; set; }
        public double ThanhTien { get; set; }
        public int TrangThai { get; set; }
    }
}
