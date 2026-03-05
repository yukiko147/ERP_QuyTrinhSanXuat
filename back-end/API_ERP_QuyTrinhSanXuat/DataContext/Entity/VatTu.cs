using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.Entity
{
    [Table("VatTu")]
    public class VatTu:BasicModel
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage ="Xin hãy nhập đầy đủ !!!")]
        [StringLength(50,ErrorMessage ="Chỉ được nhập 50 ký tự !!!")]
        public string TenVatTu {  get; set; }
        public double GiaBan {  get; set; }
        public string Mota { get; set; } = "";
        public string? HinhAnh { get; set; } = "";
        public int TrangThai {  get; set; }
        public int? DVTinhId {  get; set; }
        public ICollection<ChiTietCheTao> chiTietCheTaos { get; set; } = new List<ChiTietCheTao>();
        public ICollection<ChiTietPhieuNhap> ChiTietPhieuNhaps { get; set; } = new List<ChiTietPhieuNhap>();

    }
}
