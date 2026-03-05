using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.Entity
{
    [Table("PhuongThucThanhToan")]
    public class PhuongThucThanhToan:BasicModel
    {
        [Key]
        public int Id {  get; set; }
        [Required]
        [StringLength(50,ErrorMessage ="Chỉ được nhập 50 ký tự !!!")]
        public string TenDieuKhoan {  get; set; }
        public double SoPhanTramTraTruoc {  get; set; }
        public int SoKyTra {  get; set; }
        public double TienTraMoiKy {  get; set; }
        public ICollection<DonHang> DonHangs { get; set; }=new List<DonHang>();
    }
}
