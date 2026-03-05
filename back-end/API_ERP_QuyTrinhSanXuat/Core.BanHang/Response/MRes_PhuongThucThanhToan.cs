using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.BanHang.Response
{
    public class MRes_PhuongThucThanhToan:BasicModel
    {
        public int Id { get; set; }
        public string TenDieuKhoan { get; set; }
        public double SoPhanTramTraTruoc { get; set; }
        public int SoKyTra { get; set; }
        public double TienTraMoiKy { get; set; }
    }
}
