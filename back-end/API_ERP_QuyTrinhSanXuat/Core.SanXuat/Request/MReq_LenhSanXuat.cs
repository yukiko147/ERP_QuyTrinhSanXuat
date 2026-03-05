using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.SanXuat.Request
{
    public class MReq_LenhSanXuat:BasicModel
    {
        public string MaLenhSX { get; set; }
        public int SoLuongSX { get; set; }
        public DateTime BatDauSX { get; set; }
        public DateTime KetThucSX { get; set; }
        public int TrangThaiLenh { get; set; }
        public int SanPhamId { get; set; }
        public int KhoChuaId {  get; set; }
        public int? DonHangId { get; set; }

        public ICollection<MReq_ChiTietCheTao> ChiTietCheTaos { get; set; } = new List<MReq_ChiTietCheTao>();
    }
}
