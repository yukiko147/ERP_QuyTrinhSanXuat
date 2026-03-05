using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.BanHang.Response
{
    public class MRes_DonHang:BasicModel
    {
        public int Id { get; set; }
        public int KhachHangId { get; set; }

        public string MaDH { get; set; }
        public DateTime HetHan { get; set; }
        public DateTime? NgayDatHang { get; set; }
        public DateTime? NgayGiaoHang { get; set; }
        public int TrangThai { get; set; }
        public double Thue { get; set; }
        public double TienTruocThue { get; set; }
        public DateTime HieuLuc { get; set; }
        public bool IsDonHang {  get; set; }
        public int TongHang { get; set; }
        public double TongGTriDH { get; set; }
        public int? PhuongThucThanhToanId { get; set; }
        public string TenKhachHang {  get; set; }
        public string HinhAnhKhach {  get; set; }
        public string TenNhanSu {  get; set; }
        public int? KhoChuaId { get; set; }
        public List<MRes_ChiTietDonHang> ChiTietDonHangs { get; set; } = new List<MRes_ChiTietDonHang>();
    }

}
