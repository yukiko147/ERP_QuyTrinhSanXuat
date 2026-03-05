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
    [Table("DonNhap")]
    [Index(nameof(MaDGH),IsUnique =true)]
    public class DonNhap:BasicModel
    {
        [Key]
        public int Id {  get; set; }
        [Required]
        [StringLength(50)]
        public string MaDGH {  get; set; }="DGH_"+Guid.NewGuid().ToString().Substring(0,7).ToUpper();
        public DateTime ThoiGianGiao {  get; set; }
        public int TrangThai { get; set; }
        public double Thue { get; set; }
        public double TienTruocThue { get; set; }
        public int TongHang { get; set; }
        public double TongGTriDH { get; set; }
        public int? NhaCungCapId {  get; set; }
        public int? KhoHangId { get; set; }
        public int? LenhSanXuatId {  get; set; }
        public ICollection<ChiTietDonNhap> ChiTietDonNhaps { get; set; } = new List<ChiTietDonNhap>();
        public ICollection<PhieuNhap> PhieuNhaps { get; set; }=new List<PhieuNhap>();


    }
}
