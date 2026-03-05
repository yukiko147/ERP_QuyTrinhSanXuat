using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.Entity
{
    public abstract class ChiTietPhieu
    {
        public double ThanhTien { get; set; }
        public int SoLuongHang { get; set; }
        public double Thue { get; set; }
        public double DonGia { get; set; }
    }
}
