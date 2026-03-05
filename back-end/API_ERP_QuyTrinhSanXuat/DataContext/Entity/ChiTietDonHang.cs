using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.Entity
{
    [Table("ChiTietDonHang")]
    public class ChiTietDonHang
    {
        public int DonHangId {  get; set; }
        public int SanPhamId {  get; set; }
        public double ThanhTien {  get; set; }
        public int SoLuongHang {  get; set; }
        public int DaLay {  get; set; }
        public double Thue {  get; set; }
        public int TrangThai {  get; set; }
        public double DonGia { get; set; }
        public int? DonViTinh {  get; set; }
        public DonHang DonHang { get; set; }
        public SanPham SanPham { get; set; }
    }
}
