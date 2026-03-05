using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.Entity
{
    [Table("ChiTietPhieuXuat")]
    public class ChiTietPhieuXuat:ChiTietPhieu
    {
        public int PhieuXuatId {  get; set; }
        public PhieuXuat PhieuXuat { get; set; }
        public SanPham SanPham { get; set; }
        public int SanPhamId { get; set; }
    }
}
