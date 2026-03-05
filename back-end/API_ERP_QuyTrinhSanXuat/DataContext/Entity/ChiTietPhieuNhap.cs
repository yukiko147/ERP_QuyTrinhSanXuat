using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.Entity
{
    [Table("ChiTietPhieuNhap")]
    public class ChiTietPhieuNhap:ChiTietPhieu
    {
        public int PhieuNhapId {  get; set; }
        public PhieuNhap PhieuNhap { get; set; }
        public int VatTuId {  get; set; }
        public VatTu VatTu { get; set; }
    }
}
