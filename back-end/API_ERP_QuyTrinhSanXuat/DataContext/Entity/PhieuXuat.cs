using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.Entity
{
    [Table("PhieuXuat")]
    public class PhieuXuat:BasicModel
    {
        [Key] 
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string MaPX { get; set; } = "PX_" + Guid.NewGuid().ToString().Substring(0, 7).ToUpper();
        public int SoLuongXuat {  get; set; }
        public DateTime NgayXuatKho {  get; set; }
        public string DiaChiDich {  get; set; }
        public string MoTa { get; set; } = "";
        public int TrangThai {  get; set; }
        public int? DonHangId {  get; set; }
        public int KhachHangId { get; set; }
        public int KhoChuaId {  get; set; }
        public KhoChua KhoChua { get; set; }
        public DonHang DonHang { get; set; }
        public ICollection<ChiTietPhieuXuat> ChiTietPhieuXuats { get; set; }=new List<ChiTietPhieuXuat>();

    }
}
