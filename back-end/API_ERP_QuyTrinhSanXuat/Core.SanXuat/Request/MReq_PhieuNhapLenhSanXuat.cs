using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.SanXuat.Request
{
    public class MReq_PhieuNhapLenhSanXuat:BasicModel
    {
        public int LenhSanXuatId {  get; set; }
        public int VatTuId {  get; set; }

    }
}
