using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.QuanLyNhanSu.Response
{
    public class MRes_Login
    {
        public int Id {  get; set; }
        public int PhongBan {  get; set; }
        public int ChucVu {  get; set; }
        public string TenNhanSu {  get; set; }
        public string AccesToken {  get; set; }
    }
}
