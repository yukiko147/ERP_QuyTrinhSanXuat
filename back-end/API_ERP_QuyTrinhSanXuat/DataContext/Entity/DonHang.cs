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
    [Table("DonHang")]
    [Index(nameof(MaDH),IsUnique =true)]
    public class DonHang:BasicModel
    {
        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string MaDH { get; set; }="BG_"+Guid.NewGuid().ToString().Substring(0,6).ToUpper();
        public DateTime HieuLuc {  get; set; }
        public DateTime HetHan {  get; set; }
        public DateTime? NgayDatHang {  get; set; }
        public DateTime? NgayGiaoHang { get; set; }
        public int TrangThai {  get; set; }
        public double Thue {  get; set; }
        public double TienTruocThue {  get; set; }
        public int TongHang {  get; set; }
        public double TongGTriDH {  get; set; }
        public bool IsDonHang {  get; set; }
        public int? PhuongThucThanhToanId{  get; set; }
        public int? KhoChuaId {  get; set; }

        public PhuongThucThanhToan PhuongThucThanhToan {  get; set; }
        public int KhachHangId {  get; set; }
        public KhachHang KhachHang {  get; set; }
        public ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; } = new List<ChiTietDonHang>();

        public ICollection<PhieuXuat> PhieuXuats { get; set; }=new List<PhieuXuat>();

    }
}
