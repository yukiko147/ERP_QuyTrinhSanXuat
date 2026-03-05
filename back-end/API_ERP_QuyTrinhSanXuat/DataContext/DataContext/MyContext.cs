using DataContext.Entity;
using DataContext.MyDbQuery;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.MyDbContext
{
    public class MyContext:DbContext
    {
        public MyContext(DbContextOptions options) : base(options) { }
        public MyContext() { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<KhoSanPham>()
                .HasKey(k => new { k.SanPhamId, k.KhoChuaId });
            modelBuilder.Entity<KhoVatTu>()
                .HasKey(k=>new {k.VatTuId, k.KhoChuaId});
            modelBuilder.Entity<ChiTietDonHang>()
                .HasKey(k => new { k.SanPhamId, k.DonHangId });
            modelBuilder.Entity<ChiTietDonNhap>()
                .HasKey(k => new { k.DonNhapId, k.VatTuId });
            modelBuilder.Entity<ChiTietCheTao>()
                .HasKey(k => new { k.VatTuId, k.LenhSXId });
            modelBuilder.Entity<ChiTietPhieuNhap>()
                .HasKey(k => new { k.PhieuNhapId, k.VatTuId });
            modelBuilder.Entity<ChiTietPhieuXuat>()
                .HasKey(k => new { k.PhieuXuatId, k.SanPhamId});

        
        }

        #region DbSet_QuanLyNhanSu
        public DbSet<NhanSu> NhanSus { get; set; }

        #endregion

        #region DbSet_BanHang
        public DbSet<KhachHang> KhachHangs { get; set; }
        public DbSet<DonHang> DonHangs { get; set; }
        public DbSet<PhuongThucThanhToan> PhuongThucThanhToans { get; set; }
        public DbSet<ChiTietDonHang> ChiTietDonHangs { get; set; }
        #endregion

        #region DbSet_Kho
        public DbSet<SanPham> SanPhams { get; set; }
        public DbSet<VatTuCanDung> VatTuCanDungs { get; set; }
        public DbSet<DVTinh> DVTinhs { get; set; }
        public DbSet<KhoChua> KhoChuas {  get; set; }
        public DbSet<PhieuXuat> ChiTietSanPhams { get; set; }
        public DbSet<VatTu> VatTus { get; set; }
        public DbSet<PhieuNhap> ChiTietVatTus { get; set; }
        public DbSet<KhoVatTu> KhoVatTus { get;set; }
        public DbSet<KhoSanPham> KhoSanPhams{ get; set; }
        public DbSet<PhieuXuat> PhieuXuats { get; set; }
        public DbSet<PhieuNhap> PhieuNhaps { get; set; }
        public DbSet<ChiTietPhieuXuat> ChiTietPhieuXuats{ get; set; }
        public DbSet<ChiTietPhieuNhap> ChiTietPhieuNhaps{ get; set; }

        #endregion

        #region DdSet_MuaHang
        public DbSet<NhaCungCap> NhaCungCaps { get; set; }
        public DbSet<DonNhap> DonNhap { get; set; }
        public DbSet<ChiTietDonNhap> ChiTietDonNhaps { get; set; }
        #endregion

        #region DbSet_SanXuat
        public DbSet<LenhSX> LenhSXs {  get; set; }
        public DbSet<ChiTietCheTao> ChiTietCheTaos { get; set; }
        #endregion

        #region DbSet_KeToan
        public DbSet<HoaDon> HoaDons { get; set; }
        #endregion
    }
}
