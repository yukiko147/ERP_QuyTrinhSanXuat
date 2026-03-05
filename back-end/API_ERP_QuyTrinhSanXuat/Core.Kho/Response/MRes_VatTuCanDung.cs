using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Response
{
    public class MRes_VatTuCanDung
    {
        public int Id { get; set; }
        public int SanPhamId { get; set; }
        public int? VatTuId { get; set; }
        public int SoLuongCan { get; set; }
        public double GiaBan {  get; set; }
        public double ThanhTien {  get; set; }
    }
}
