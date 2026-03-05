using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.MuaHang.Response
{
    public class MRes_NhaCungCap:BasicModel
    {

        public int Id { get; set; }

        public string TenNCC { get; set; }
        public string? DiaChi { get; set; }
        public string? Email { get; set; }
        public string? Sdt { get; set; }
        public string MaSoThue { get; set; }
        public string HinhAnh { get; set; }
    }
}
