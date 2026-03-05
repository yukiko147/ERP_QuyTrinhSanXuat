using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Response
{
    public class MRes_KhoSanPham
    {
        public string SoLo { get; set; }
        public string TenKho { get; set; }
        public string TenSP { get; set; }
        public int SoLuongTon { get; set; }
        public DateTime NgaySX { get; set; } = DateTime.UtcNow;
        public DateTime NgayHetHan { get; set; }
    }
}
