using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.Entity
{
    [Table("KhoSanPham")]
    public class KhoSanPham
    {
        public string SoLo {  get; set; }
        public int KhoChuaId {  get; set; }
        public int SanPhamId {  get; set; }
        public int SoLuongTon {  get; set; }
        public DateTime NgaySX { get; set; } = DateTime.UtcNow;
        public DateTime NgayHetHan { get; set; }
        public KhoChua KhoChua { get; set; }
        public SanPham SanPham { get; set; }
    }
}
