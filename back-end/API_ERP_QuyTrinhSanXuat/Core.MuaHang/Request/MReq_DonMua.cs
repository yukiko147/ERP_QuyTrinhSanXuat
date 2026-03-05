using Core.MuaHang.Response;
using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.MuaHang.Request
{
    public class MReq_DonMua:BasicModel
    {
        public string MaDGH { get; set; } = "DGH_" + Guid.NewGuid().ToString().Substring(0, 7).ToUpper();
        public DateTime ThoiGianGiao { get; set; }
        public double Thue { get; set; }
        public int NhaCungCapId { get; set; }
        public int KhoChuaId {  get; set; }

        public ICollection<MReq_ChiTietDonMua> ChiTietDonNhaps { get; set; }=new List<MReq_ChiTietDonMua>();
    }
}
