using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Request
{
    public class MReq_PhieuXuat:BasicModel
    {

        public string MaPX { get; set; } = "PX_" + Guid.NewGuid().ToString().Substring(0, 7).ToUpper();
        public string DiaChi { get; set; }
        public string MoTa { get; set; } = "";
        public int KhoChuaId {  get; set; }
        public int KhachHangId { get; set; }
        public ICollection<MReq_ChiTietPhieuXuat> ChiTietPhieuXuats { get; set; }=new List<MReq_ChiTietPhieuXuat>();
    }
}
