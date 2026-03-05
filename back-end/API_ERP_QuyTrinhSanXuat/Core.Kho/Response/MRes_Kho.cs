using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Kho.Response
{
    public class MRes_Kho:BasicModel
    {
        public int Id { get; set; }
        public string TenKho { get; set; }
        public string DiaChiKho { get; set; }
 
    }
}
