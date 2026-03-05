using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Request
{
    public class MReq_SanPham:BasicModel
    {
        public string TenSP { get; set; }
        public double GiaGocSP { get; set; }
        public double LoiNhuan { get; set; }
        public string MoTa { get; set; } = "";
        public string? HinhAnh { get; set; } 
        public int TrangThai { get; set; }
        public int LuongTonToiThieu { get; set; }
        public double Thue {  get; set; }
        public int HanSanXuat { get; set; }

        public ICollection<MReq_VatTuCanDung> VatTuCanDungs { get; set; } = new List<MReq_VatTuCanDung>();

    }
}
