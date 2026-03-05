using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.SanXuat.Response
{
    public class MRes_LenhSanXuat:BasicModel
    {
        public int Id { get; set; }
        public string MaLenhSX { get; set; }
        public int SoLuongSX { get; set; }
        public DateTime BatDauSX { get; set; }
        public DateTime KetThucSX { get; set; }
        public int TrangThaiLenh { get; set; }
        public int SanPhamId { get; set; }
        public int? KhoChuaId {  get; set; }
        public int? DonHangId {  get; set; }
        public string HinhAnhSP {  get; set; }
        public ICollection<MRes_ChiTietCheTao> ChiTietCheTao { get; set; }= new List<MRes_ChiTietCheTao>();
    }
}
