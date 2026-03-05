using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.Entity
{
    [Table("HoaDon")]
    [Index(nameof(MaHD), IsUnique = true)]
    public class HoaDon : BasicModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string MaHD { get; set; } = "HD_" + Guid.NewGuid().ToString().Substring(0, 7).ToUpper();
        public DateTime NgayLap { get; set; }
        public DateTime NgayTra { get; set; }
        public int? PhuongThucThanhToanId { get; set; }
        public int TinhTrangHoaDon { get; set; }
        public double SoTienTra { get; set; }
        public int? DonHangId { get; set; }
        public int? DonNhapId { get; set; }
        public int? SoLan {  get; set; }

    }
}
