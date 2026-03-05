using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.BanHang.Response
{
    public class MRes_DVTinh:BasicModel
    {
        public int Id { get; set; }
        public string TenDVi { get; set; }
        public string KyHieu { get; set; }
        public string Mota { get; set; }
        public double HeSo { get; set; }
    }
}
