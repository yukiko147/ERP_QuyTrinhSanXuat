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
    [Table("KhachHang")]
    [Index(nameof(Email),IsUnique =true)]
    public class KhachHang:BasicModel
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage ="Không được để trống !!!")]
        [StringLength(50,ErrorMessage ="Chỉ được phép nhập 50 ký tự !!!")]
        public string HoTenKh {  get; set; }
        [Required]
        public string Email { get; set; } = "";
        public string? DiaChi {  get; set; }
        [StringLength(20,ErrorMessage ="Chỉ được nhập 20 ký tự !!!")]
        public string? Sdt {  get; set; }
        public string? HinhAnh { get; set; } 


    }
}
