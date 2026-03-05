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
    [Table("LenhSanXuat")]
    [Index(nameof(MaLenhSX), IsUnique = true)]
    public class LenhSX:BasicModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string MaLenhSX {  get; set; }="LSX_"+Guid.NewGuid().ToString().Substring(0,7).ToUpper();
        public int SoLuongSX {  get; set; }
        public DateTime BatDauSX { get; set; }
        public DateTime KetThucSX {  get; set; }
        public int TrangThaiLenh {  get; set; }
        public int SanPhamId {  get; set; }
        public int? DonHangId {  get; set; }
        public int? KhoChuaId {  get; set; }
        public SanPham SanPham { get; set; }
        public ICollection<ChiTietCheTao> chiTietCheTaos { get; set; }=new List<ChiTietCheTao>();
    }
}
