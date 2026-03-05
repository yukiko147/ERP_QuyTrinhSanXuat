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
    [Table("NhanSu")]
    [Index(nameof(TenDangNhap),IsUnique =true)]

    public class NhanSu:BasicModel
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "Không được để trống !!!")]
        [StringLength(100, ErrorMessage = "Chỉ được nhập 100 ký tự !!!")]
        public string TenDangNhap {  get; set; }
        [Required(ErrorMessage = "Không được để trống !!!")]
        [StringLength(100, ErrorMessage = "Chỉ được nhập 100 ký tự !!!")]
        public string MatKhau {  get; set; }
        [Required(ErrorMessage ="Không được để trống !!!")]
        [StringLength(100,ErrorMessage ="Chỉ được nhập 100 ký tự !!!")]
        public string HoTenNhanSu { get; set; }
        [StringLength(50, ErrorMessage = "Chỉ được nhập 50 ký tự !!!")]
        public int GioiTinh {  get; set; }
        public string? Email {  get; set; }
        public string? DiaChi {  get; set; }
        [StringLength(20, ErrorMessage = "Chỉ được nhập 20 ký tự !!!")]
        public string? Sdt {  get; set; }
        public string? HinhAnh {  get; set; }
        public int ChucVu {  get; set; }
        public int PhongBan {  get; set; }
        public int? NguoiQuanLyId {  get; set; }

    }
}
