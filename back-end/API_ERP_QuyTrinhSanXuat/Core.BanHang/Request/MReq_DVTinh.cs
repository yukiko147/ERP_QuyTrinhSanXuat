using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.BanHang.Request
{
    public class MReq_DVTinh:BasicModel
    {
        public string TenDVi { get; set; }
        public string KyHieu { get; set; }
        public string Mota { get; set; }
        public double HeSo { get; set; }
    }
}
