using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.MuaHang.Response
{
    public class MRes_DonMua:BasicModel
    {
        public int Id { get; set; }
        public string MaDGH { get; set; } = "DGH_" + Guid.NewGuid().ToString().Substring(0, 7).ToUpper();
        public DateTime ThoiGianGiao { get; set; }
        public int TrangThai { get; set; }
        public double Thue { get; set; }
        public double TienTruocThue { get; set; }
        public int TongHang { get; set; }
        public double TongGTriDH { get; set; }
        public int? NhaCungCapId { get; set; }
        public int KhoChuaId {  get; set; }

        public ICollection<MRes_ChiTietDonMua> ChiTietDonNhaps { get; set; } = new List<MRes_ChiTietDonMua>();

    }
}
