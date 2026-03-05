using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.Entity
{
    [Table("KhoVatTu")]
    public class KhoVatTu
    {
        public int KhoChuaId {  get; set; }
        public int VatTuId {  get; set; }
        public int SoLuongTon {  get; set; }
        public KhoChua KhoChua {  get; set; }
        public VatTu VatTu { get; set; }
    }
}
