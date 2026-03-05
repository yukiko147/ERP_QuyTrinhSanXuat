using Core.BanHang.Response;
using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.BanHang.Request
{
    public class MReq_DonHang:BasicModel
    {
        public string MaDH { get; set; }
        public DateTime HetHan { get; set; }
        public DateTime HieuLuc { get; set; }
        public DateTime? NgayDatHang { get; set; }
        public DateTime? NgayGiaoHang { get; set; }
        public int KhachHangId {  get; set; }
        public double Thue {  get; set; }
        public int? PhuongThucThanhToanId { get; set; }
        public int? KhoChuaId { get; set; }
        public List<MRes_ChiTietDonHang> ChiTietDonHangs { get; set; }
    }
}
