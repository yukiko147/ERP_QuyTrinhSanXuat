using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.Entity
{
    [Table("ChiTietDonNhap")]
    public class ChiTietDonNhap
    {
        public int DonNhapId { get; set; }
        public int VatTuId { get; set; }
        public double ThanhTien { get; set; }
        public int SoLuongHang { get; set; }
        public double Thue { get; set; }
        public double DonGia { get; set; }
        public int? DonViTinh {  get; set; }
        public VatTu VatTu { get; set; }
        public DonNhap DonNhap { get; set; }
    }
}
