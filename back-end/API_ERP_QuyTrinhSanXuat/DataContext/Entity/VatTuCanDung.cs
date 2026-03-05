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
    [Table("VatTuCanDung")]
    public class VatTuCanDung
    {
        [Key]
        public int Id { get; set; }
        public int SanPhamId {  get; set; }
        public int? VatTuId {  get; set; }
        public int SoLuongCan {  get; set; }

        public VatTu VatTu { get; set; }
        public SanPham SanPham {  get; set; }
    }
}
