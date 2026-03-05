using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Response
{
    public class MRes_SanPham:BasicModel
    {
        public int Id { get; set; }
        public string TenSP { get; set; }
        public double GiaGocSP { get; set; }
        public double GiaBanSP { get; set; }
        public double LoiNhuan { get; set; }
        public string MoTa { get; set; } = "";
        public string? HinhAnh { get; set; } 
        public int TrangThai { get; set; }
        public int LuongTonToiThieu { get; set; }
        public string SKU {  get; set; }
        public double Thue {  get; set; }
        public int SoLuongTon {  get; set; }
        public int HanSanXuat { get; set; }

        public ICollection<MRes_VatTuCanDung> VatTuCanDungs { get; set; }=new List<MRes_VatTuCanDung>();
    }
}
