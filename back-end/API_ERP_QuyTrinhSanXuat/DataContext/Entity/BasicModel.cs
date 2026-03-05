using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.Entity
{
    public abstract class BasicModel
    {
        public DateTime CreateAt {  get; set; }= DateTime.UtcNow;
        public DateTime UpdateAt { get; set;}= DateTime.UtcNow;
        public int CreateBy {  get; set; }
        public int UpdateBy { get; set; }
    }
}
