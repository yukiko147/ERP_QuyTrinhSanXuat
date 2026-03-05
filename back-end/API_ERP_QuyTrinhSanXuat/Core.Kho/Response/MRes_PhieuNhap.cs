using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Response
{
    public class MRes_PhieuNhap:BasicModel
    {
        public int Id { get; set; }
        public string MaPN { get; set; } = "PN_" + Guid.NewGuid().ToString().Substring(0, 7).ToUpper();
        public int SoLuongNhap { get; set; }
        public double TienTruocThue { get; set; }
        public double TongGiaTri { get; set; }
        public DateTime NgayNhap { get; set; }
        public int TrangThai { get; set; }
        public int NhaCungCapId { get; set; }
        public int? DonNhapId { get; set; }
        public int KhoChuaId { get; set; }
        public string DiaChi {  get; set; }
        public double Thue {  get; set; }

        public List<MRes_ChiTietPhieuNhap> ChiTietPhieuNhaps { get; set; } = new List<MRes_ChiTietPhieuNhap>();
    }
}
