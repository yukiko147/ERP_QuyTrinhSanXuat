using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.Entity
{
    [Table("KhoChua")]
    public class KhoChua:BasicModel
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage ="Xin hãy nhập đầy đủ !!!")]
        [StringLength(50,ErrorMessage ="Chỉ được nhập 50 ký tự !!!")]
        public string TenKho {  get; set; }
        public string DiaChiKho {  get; set; }
        public ICollection<PhieuNhap> PhieuNhaps { get; set; }=new List<PhieuNhap>();
        public ICollection<PhieuXuat> PhieuXuats { get; set; } = new List<PhieuXuat>();
        public ICollection<KhoVatTu> KhoVatTus { get; set; }=new List<KhoVatTu>();
        public ICollection<KhoSanPham> KhoSanPham { get; set; }= new List<KhoSanPham>();

    }
}
