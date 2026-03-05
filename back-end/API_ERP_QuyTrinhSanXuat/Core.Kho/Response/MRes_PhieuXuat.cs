using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Response
{
    public class MRes_PhieuXuat:BasicModel
    {
        public int Id {  get; set; }
        public string MaPX { get; set; } = "PX_" + Guid.NewGuid().ToString().Substring(0, 7).ToUpper();
        public int SoLuongXuat { get; set; }
        public DateTime NgayXuatKho { get; set; }
        public string DiaChiDich { get; set; }
        public string MoTa { get; set; } = "";
        public int TrangThai { get; set; }
        public int? DonHangId { get; set; }
        public int KhachHangId { get; set; }
        public int KhoChuaId { get; set; }
        public ICollection<MRes_ChiTietPhieuXuat> ChiTietPhieuXuats { get; set; }=new List<MRes_ChiTietPhieuXuat>();
    }
}
