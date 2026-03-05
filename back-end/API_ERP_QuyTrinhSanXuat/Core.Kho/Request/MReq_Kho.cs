using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Request
{
    public class MReq_Kho:BasicModel
    {

        public string TenKho { get; set; }
        public string DiaChiKho { get; set; }

    }
}
