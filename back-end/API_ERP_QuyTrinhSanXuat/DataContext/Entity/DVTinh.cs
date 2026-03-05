using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.Entity
{
    [Table("DVTinh")]
    public class DVTinh:BasicModel
    {
        [Key]
        public int Id {  get; set; }
        [Required(ErrorMessage ="Xin hãy nhập đầy đủ")]
        public string TenDVi {  get; set; }
        public string KyHieu {  get; set; }
        public string Mota {  get; set; }
        public double HeSo {  get; set; }

    }
}
