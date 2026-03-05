using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.BanHang.Request
{
    public class MReq_HoaDon:BasicModel
    {
        public int Id { get; set; }
        public string MaHD { get; set; } = "HD_" + Guid.NewGuid().ToString().Substring(0, 7).ToUpper();
        public DateTime NgayLap { get; set; }
        public DateTime NgayTra { get; set; }
        public DateTime? NgayVaoSo { get; set; } = null;
        public int TinhTrangHoaDon { get; set; }
        public int? DonHangId { get; set; }
        public int? DonNhapId { get; set; }
    }
}
