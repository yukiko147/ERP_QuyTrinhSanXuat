using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.Entity
{
    [Table("NhaCungCap")]
    public class NhaCungCap:BasicModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50,ErrorMessage ="Chỉ được nhập 50 ký tự !!!")]
        public string TenNCC {  get; set; }
        public string? DiaChi {  get; set; }
        public string? Email {  get; set; }
        public string? Sdt {  get; set; }
        public string MaSoThue {  get; set; }
        public string? hinhAnh {  get; set; }
        public ICollection<DonNhap> DonNhaps { get; set; }=new List<DonNhap>();
    }
}
