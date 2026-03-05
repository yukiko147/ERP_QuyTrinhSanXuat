using Core.Kho.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Request
{
    public class MReq_VatTuCanDung
    {
        public int SanPhamId { get; set; }
        public int? VatTuId { get; set; }
        public int SoLuongCan { get; set; }

    }
}
