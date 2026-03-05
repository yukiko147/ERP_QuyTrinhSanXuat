using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.Entity
{
    [Table("PhieuNhap")]
    public class PhieuNhap:BasicModel
    {
        [Key]
        public int Id {  get; set; }
        [Required]
        [StringLength(50)]
        public string MaPN {  get; set; }="PN_"+Guid.NewGuid().ToString().Substring(0,7).ToUpper();
        public int SoLuongNhap {  get; set; }
        public double TienTruocThue {  get; set; }
        public double Thue {  get; set; }
        public double TongGiaTri {  get; set; }
        public DateTime NgayNhap { get; set; }
        public string DiaChiNguon {  get; set; }
        public int TrangThai {  get; set; }
        public int KhoChuaId {  get; set; }
        public int NhaCungCapId {  get; set; }
        public int? LenhSanXuatId {  get; set; }
        public int? DonNhapId {  get; set; }
        public KhoChua KhoChua { get; set; }

        public DonNhap DonNhap { get; set; }

        public ICollection<ChiTietPhieuNhap> ChiTietPhieuNhaps { get; set; } = new List<ChiTietPhieuNhap>();
    }
}
