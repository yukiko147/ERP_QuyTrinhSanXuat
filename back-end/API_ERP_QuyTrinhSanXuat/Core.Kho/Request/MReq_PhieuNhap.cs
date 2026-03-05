using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Request
{
    public class MReq_PhieuNhap:BasicModel
    {

        public string MaPN { get; set; } = "PN_" + Guid.NewGuid().ToString().Substring(0, 7).ToUpper();
        public double Thue {  get; set; }
        public int NhaCungCapId {  get; set; }
        public int? DonNhapId {  get; set; }
        public int KhoChuaId {  get; set; }
        public string DiaChi {  get; set; }
        public ICollection<MReq_ChiTietPhieuNhap> ChiTietPhieuNhaps { get; set; }=new List<MReq_ChiTietPhieuNhap>();
    }
}
