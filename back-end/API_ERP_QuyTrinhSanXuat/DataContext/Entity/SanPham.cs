using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.Entity
{
    [Table("SanPham")]
    [Index(nameof(SKU),IsUnique =true)]
    public class SanPham:BasicModel
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage ="Xin hãy nhập đầy đủ !!!")]
        [StringLength(50,ErrorMessage ="Chỉ được nhập 50 ký tự !!!")]
        public string TenSP {  get; set; }
        public string SKU {  get; set; }
        public double GiaGocSP {  get; set; }
        public double GiaBanSP {  get; set; }
        public double LoiNhuan {  get; set; }
        public string MoTa { get; set; } = "";
        public double Thue {  get; set; }
        public string? HinhAnh { get; set; } 
        public int TrangThai { get; set; }
        public int? DVTinhId { get; set; }
        public int HanSanXuat {  get; set; }


        public ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; } = new List<ChiTietDonHang>();
        public ICollection<KhoSanPham> KhoSanPhams { get; set; }=new List<KhoSanPham>();
        public ICollection<VatTuCanDung> VatTuCanDungs { get; set; }=new List<VatTuCanDung>();
        public ICollection<ChiTietPhieuXuat> ChiTietPhieuXuats { get; set; }=new List<ChiTietPhieuXuat>();

    }
}
