using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Request
{
    public class MReq_VatTu:BasicModel
    {
        public string TenVatTu { get; set; }
        public double GiaBan { get; set; }
        public string Mota { get; set; } = "";
        public string? HinhAnh { get; set; }
        public int TrangThai { get; set; }
        public int LuongTonToiThieu { get; set; }
        public int? DVTinhVtuId { get; set; }
    }
}
