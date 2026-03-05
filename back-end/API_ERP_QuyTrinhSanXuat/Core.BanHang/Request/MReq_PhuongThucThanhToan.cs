using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.BanHang.Request
{
    public class MReq_PhuongThucThanhToan:BasicModel
    {
        public string TenDieuKhoan { get; set; }
        public double SoPhanTramTraTruoc { get; set; }
        public int SoKyTra { get; set; }
        public double TienTraMoiKy { get; set; }
    }
}
