using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.BanHang.Request
{
    public class MReq_SanXuat:BasicModel
    {
        public int SanPhamId {  get; set; }
        public int DonHangId {  get; set; }
        public int SoLuongMua {  get; set; }
        public int TrangThai {  get; set; }
        public int KhoChuaId {  get; set; }

    }
}
