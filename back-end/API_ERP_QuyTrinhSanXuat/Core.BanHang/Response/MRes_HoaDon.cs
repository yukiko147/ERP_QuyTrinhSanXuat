using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.BanHang.Response
{
    public class MRes_HoaDon:BasicModel
    {

        public int Id { get; set; }

        public string MaHD { get; set; } = "HD_" + Guid.NewGuid().ToString().Substring(0, 7).ToUpper();
        public DateTime NgayLap { get; set; }
        public DateTime NgayTra { get; set; }
        public DateTime? NgayVaoSo { get; set; } = null;
        public int? PhuongThucThanhToanId { get; set; }
        public int TinhTrangHoaDon { get; set; }
        public int DonHangId { get; set; }
        public double SoTienTra {  get; set; }
        public string TenKhachHang {  get; set; }
        public double Thue {  get; set; }
        public double TongGTriDH {  get; set; }
        public int SoLan {  get; set; }
        public double PhanTramTra {  get; set; }
        public string MaDH {  get; set; }
        public string hinhAnhKhach {  get; set; }
        public List<MRes_ChiTietDonHang> ChiTietDonHangs { get; set; } = new List<MRes_ChiTietDonHang>();
    }
}
