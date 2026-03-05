using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataContext.Migrations
{
    /// <inheritdoc />
    public partial class dbInit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DVTinh",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenDVi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KyHieu = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mota = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HeSo = table.Column<double>(type: "float", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<int>(type: "int", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DVTinh", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HoaDon",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaHD = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    NgayLap = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NgayTra = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PhuongThucThanhToanId = table.Column<int>(type: "int", nullable: true),
                    TinhTrangHoaDon = table.Column<int>(type: "int", nullable: false),
                    SoTienTra = table.Column<double>(type: "float", nullable: false),
                    DonHangId = table.Column<int>(type: "int", nullable: true),
                    DonNhapId = table.Column<int>(type: "int", nullable: true),
                    SoLan = table.Column<int>(type: "int", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<int>(type: "int", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoaDon", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KhachHang",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HoTenKh = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DiaChi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sdt = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    HinhAnh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<int>(type: "int", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhachHang", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KhoChua",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenKho = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DiaChiKho = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<int>(type: "int", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhoChua", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NhaCungCap",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenNCC = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DiaChi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sdt = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaSoThue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    hinhAnh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<int>(type: "int", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NhaCungCap", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NhanSu",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenDangNhap = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MatKhau = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    HoTenNhanSu = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    GioiTinh = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiaChi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sdt = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    HinhAnh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChucVu = table.Column<int>(type: "int", nullable: false),
                    PhongBan = table.Column<int>(type: "int", nullable: false),
                    NguoiQuanLyId = table.Column<int>(type: "int", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<int>(type: "int", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NhanSu", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PhuongThucThanhToan",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenDieuKhoan = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SoPhanTramTraTruoc = table.Column<double>(type: "float", nullable: false),
                    SoKyTra = table.Column<int>(type: "int", nullable: false),
                    TienTraMoiKy = table.Column<double>(type: "float", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<int>(type: "int", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhuongThucThanhToan", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SanPham",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenSP = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SKU = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    GiaGocSP = table.Column<double>(type: "float", nullable: false),
                    GiaBanSP = table.Column<double>(type: "float", nullable: false),
                    LoiNhuan = table.Column<double>(type: "float", nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Thue = table.Column<double>(type: "float", nullable: false),
                    HinhAnh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TrangThai = table.Column<int>(type: "int", nullable: false),
                    DVTinhId = table.Column<int>(type: "int", nullable: true),
                    HanSanXuat = table.Column<int>(type: "int", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<int>(type: "int", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SanPham", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VatTu",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenVatTu = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    GiaBan = table.Column<double>(type: "float", nullable: false),
                    Mota = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HinhAnh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TrangThai = table.Column<int>(type: "int", nullable: false),
                    DVTinhId = table.Column<int>(type: "int", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<int>(type: "int", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VatTu", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DonNhap",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaDGH = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ThoiGianGiao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TrangThai = table.Column<int>(type: "int", nullable: false),
                    Thue = table.Column<double>(type: "float", nullable: false),
                    TienTruocThue = table.Column<double>(type: "float", nullable: false),
                    TongHang = table.Column<int>(type: "int", nullable: false),
                    TongGTriDH = table.Column<double>(type: "float", nullable: false),
                    NhaCungCapId = table.Column<int>(type: "int", nullable: true),
                    KhoHangId = table.Column<int>(type: "int", nullable: true),
                    LenhSanXuatId = table.Column<int>(type: "int", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<int>(type: "int", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonNhap", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DonNhap_NhaCungCap_NhaCungCapId",
                        column: x => x.NhaCungCapId,
                        principalTable: "NhaCungCap",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "DonHang",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaDH = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    HieuLuc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    HetHan = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NgayDatHang = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgayGiaoHang = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TrangThai = table.Column<int>(type: "int", nullable: false),
                    Thue = table.Column<double>(type: "float", nullable: false),
                    TienTruocThue = table.Column<double>(type: "float", nullable: false),
                    TongHang = table.Column<int>(type: "int", nullable: false),
                    TongGTriDH = table.Column<double>(type: "float", nullable: false),
                    IsDonHang = table.Column<bool>(type: "bit", nullable: false),
                    PhuongThucThanhToanId = table.Column<int>(type: "int", nullable: true),
                    KhoChuaId = table.Column<int>(type: "int", nullable: true),
                    KhachHangId = table.Column<int>(type: "int", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<int>(type: "int", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonHang", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DonHang_KhachHang_KhachHangId",
                        column: x => x.KhachHangId,
                        principalTable: "KhachHang",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DonHang_PhuongThucThanhToan_PhuongThucThanhToanId",
                        column: x => x.PhuongThucThanhToanId,
                        principalTable: "PhuongThucThanhToan",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "KhoSanPham",
                columns: table => new
                {
                    KhoChuaId = table.Column<int>(type: "int", nullable: false),
                    SanPhamId = table.Column<int>(type: "int", nullable: false),
                    SoLo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SoLuongTon = table.Column<int>(type: "int", nullable: false),
                    NgaySX = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NgayHetHan = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhoSanPham", x => new { x.SanPhamId, x.KhoChuaId });
                    table.ForeignKey(
                        name: "FK_KhoSanPham_KhoChua_KhoChuaId",
                        column: x => x.KhoChuaId,
                        principalTable: "KhoChua",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KhoSanPham_SanPham_SanPhamId",
                        column: x => x.SanPhamId,
                        principalTable: "SanPham",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LenhSanXuat",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaLenhSX = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SoLuongSX = table.Column<int>(type: "int", nullable: false),
                    BatDauSX = table.Column<DateTime>(type: "datetime2", nullable: false),
                    KetThucSX = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TrangThaiLenh = table.Column<int>(type: "int", nullable: false),
                    SanPhamId = table.Column<int>(type: "int", nullable: false),
                    DonHangId = table.Column<int>(type: "int", nullable: true),
                    KhoChuaId = table.Column<int>(type: "int", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<int>(type: "int", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LenhSanXuat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LenhSanXuat_SanPham_SanPhamId",
                        column: x => x.SanPhamId,
                        principalTable: "SanPham",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KhoVatTu",
                columns: table => new
                {
                    KhoChuaId = table.Column<int>(type: "int", nullable: false),
                    VatTuId = table.Column<int>(type: "int", nullable: false),
                    SoLuongTon = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhoVatTu", x => new { x.VatTuId, x.KhoChuaId });
                    table.ForeignKey(
                        name: "FK_KhoVatTu_KhoChua_KhoChuaId",
                        column: x => x.KhoChuaId,
                        principalTable: "KhoChua",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KhoVatTu_VatTu_VatTuId",
                        column: x => x.VatTuId,
                        principalTable: "VatTu",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VatTuCanDung",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SanPhamId = table.Column<int>(type: "int", nullable: false),
                    VatTuId = table.Column<int>(type: "int", nullable: true),
                    SoLuongCan = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VatTuCanDung", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VatTuCanDung_SanPham_SanPhamId",
                        column: x => x.SanPhamId,
                        principalTable: "SanPham",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VatTuCanDung_VatTu_VatTuId",
                        column: x => x.VatTuId,
                        principalTable: "VatTu",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ChiTietDonNhap",
                columns: table => new
                {
                    DonNhapId = table.Column<int>(type: "int", nullable: false),
                    VatTuId = table.Column<int>(type: "int", nullable: false),
                    ThanhTien = table.Column<double>(type: "float", nullable: false),
                    SoLuongHang = table.Column<int>(type: "int", nullable: false),
                    Thue = table.Column<double>(type: "float", nullable: false),
                    DonGia = table.Column<double>(type: "float", nullable: false),
                    DonViTinh = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietDonNhap", x => new { x.DonNhapId, x.VatTuId });
                    table.ForeignKey(
                        name: "FK_ChiTietDonNhap_DonNhap_DonNhapId",
                        column: x => x.DonNhapId,
                        principalTable: "DonNhap",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChiTietDonNhap_VatTu_VatTuId",
                        column: x => x.VatTuId,
                        principalTable: "VatTu",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PhieuNhap",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaPN = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SoLuongNhap = table.Column<int>(type: "int", nullable: false),
                    TienTruocThue = table.Column<double>(type: "float", nullable: false),
                    Thue = table.Column<double>(type: "float", nullable: false),
                    TongGiaTri = table.Column<double>(type: "float", nullable: false),
                    NgayNhap = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DiaChiNguon = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrangThai = table.Column<int>(type: "int", nullable: false),
                    KhoChuaId = table.Column<int>(type: "int", nullable: false),
                    NhaCungCapId = table.Column<int>(type: "int", nullable: false),
                    LenhSanXuatId = table.Column<int>(type: "int", nullable: true),
                    DonNhapId = table.Column<int>(type: "int", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<int>(type: "int", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhieuNhap", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhieuNhap_DonNhap_DonNhapId",
                        column: x => x.DonNhapId,
                        principalTable: "DonNhap",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PhieuNhap_KhoChua_KhoChuaId",
                        column: x => x.KhoChuaId,
                        principalTable: "KhoChua",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChiTietDonHang",
                columns: table => new
                {
                    DonHangId = table.Column<int>(type: "int", nullable: false),
                    SanPhamId = table.Column<int>(type: "int", nullable: false),
                    ThanhTien = table.Column<double>(type: "float", nullable: false),
                    SoLuongHang = table.Column<int>(type: "int", nullable: false),
                    DaLay = table.Column<int>(type: "int", nullable: false),
                    Thue = table.Column<double>(type: "float", nullable: false),
                    TrangThai = table.Column<int>(type: "int", nullable: false),
                    DonGia = table.Column<double>(type: "float", nullable: false),
                    DonViTinh = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietDonHang", x => new { x.SanPhamId, x.DonHangId });
                    table.ForeignKey(
                        name: "FK_ChiTietDonHang_DonHang_DonHangId",
                        column: x => x.DonHangId,
                        principalTable: "DonHang",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChiTietDonHang_SanPham_SanPhamId",
                        column: x => x.SanPhamId,
                        principalTable: "SanPham",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PhieuXuat",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaPX = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SoLuongXuat = table.Column<int>(type: "int", nullable: false),
                    NgayXuatKho = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DiaChiDich = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrangThai = table.Column<int>(type: "int", nullable: false),
                    DonHangId = table.Column<int>(type: "int", nullable: true),
                    KhachHangId = table.Column<int>(type: "int", nullable: false),
                    KhoChuaId = table.Column<int>(type: "int", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<int>(type: "int", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhieuXuat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhieuXuat_DonHang_DonHangId",
                        column: x => x.DonHangId,
                        principalTable: "DonHang",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PhieuXuat_KhoChua_KhoChuaId",
                        column: x => x.KhoChuaId,
                        principalTable: "KhoChua",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChiTietCheTaos",
                columns: table => new
                {
                    LenhSXId = table.Column<int>(type: "int", nullable: false),
                    VatTuId = table.Column<int>(type: "int", nullable: false),
                    GiaVatTu = table.Column<double>(type: "float", nullable: false),
                    SoLuongCan = table.Column<int>(type: "int", nullable: false),
                    DVTinhId = table.Column<int>(type: "int", nullable: true),
                    ThanhTien = table.Column<double>(type: "float", nullable: false),
                    TrangThai = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietCheTaos", x => new { x.VatTuId, x.LenhSXId });
                    table.ForeignKey(
                        name: "FK_ChiTietCheTaos_LenhSanXuat_LenhSXId",
                        column: x => x.LenhSXId,
                        principalTable: "LenhSanXuat",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChiTietCheTaos_VatTu_VatTuId",
                        column: x => x.VatTuId,
                        principalTable: "VatTu",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChiTietPhieuNhap",
                columns: table => new
                {
                    PhieuNhapId = table.Column<int>(type: "int", nullable: false),
                    VatTuId = table.Column<int>(type: "int", nullable: false),
                    ThanhTien = table.Column<double>(type: "float", nullable: false),
                    SoLuongHang = table.Column<int>(type: "int", nullable: false),
                    Thue = table.Column<double>(type: "float", nullable: false),
                    DonGia = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietPhieuNhap", x => new { x.PhieuNhapId, x.VatTuId });
                    table.ForeignKey(
                        name: "FK_ChiTietPhieuNhap_PhieuNhap_PhieuNhapId",
                        column: x => x.PhieuNhapId,
                        principalTable: "PhieuNhap",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChiTietPhieuNhap_VatTu_VatTuId",
                        column: x => x.VatTuId,
                        principalTable: "VatTu",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChiTietPhieuXuat",
                columns: table => new
                {
                    PhieuXuatId = table.Column<int>(type: "int", nullable: false),
                    SanPhamId = table.Column<int>(type: "int", nullable: false),
                    ThanhTien = table.Column<double>(type: "float", nullable: false),
                    SoLuongHang = table.Column<int>(type: "int", nullable: false),
                    Thue = table.Column<double>(type: "float", nullable: false),
                    DonGia = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietPhieuXuat", x => new { x.PhieuXuatId, x.SanPhamId });
                    table.ForeignKey(
                        name: "FK_ChiTietPhieuXuat_PhieuXuat_PhieuXuatId",
                        column: x => x.PhieuXuatId,
                        principalTable: "PhieuXuat",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChiTietPhieuXuat_SanPham_SanPhamId",
                        column: x => x.SanPhamId,
                        principalTable: "SanPham",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietCheTaos_LenhSXId",
                table: "ChiTietCheTaos",
                column: "LenhSXId");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietDonHang_DonHangId",
                table: "ChiTietDonHang",
                column: "DonHangId");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietDonNhap_VatTuId",
                table: "ChiTietDonNhap",
                column: "VatTuId");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietPhieuNhap_VatTuId",
                table: "ChiTietPhieuNhap",
                column: "VatTuId");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietPhieuXuat_SanPhamId",
                table: "ChiTietPhieuXuat",
                column: "SanPhamId");

            migrationBuilder.CreateIndex(
                name: "IX_DonHang_KhachHangId",
                table: "DonHang",
                column: "KhachHangId");

            migrationBuilder.CreateIndex(
                name: "IX_DonHang_MaDH",
                table: "DonHang",
                column: "MaDH",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DonHang_PhuongThucThanhToanId",
                table: "DonHang",
                column: "PhuongThucThanhToanId");

            migrationBuilder.CreateIndex(
                name: "IX_DonNhap_MaDGH",
                table: "DonNhap",
                column: "MaDGH",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DonNhap_NhaCungCapId",
                table: "DonNhap",
                column: "NhaCungCapId");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDon_MaHD",
                table: "HoaDon",
                column: "MaHD",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_KhachHang_Email",
                table: "KhachHang",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_KhoSanPham_KhoChuaId",
                table: "KhoSanPham",
                column: "KhoChuaId");

            migrationBuilder.CreateIndex(
                name: "IX_KhoVatTu_KhoChuaId",
                table: "KhoVatTu",
                column: "KhoChuaId");

            migrationBuilder.CreateIndex(
                name: "IX_LenhSanXuat_MaLenhSX",
                table: "LenhSanXuat",
                column: "MaLenhSX",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LenhSanXuat_SanPhamId",
                table: "LenhSanXuat",
                column: "SanPhamId");

            migrationBuilder.CreateIndex(
                name: "IX_NhanSu_TenDangNhap",
                table: "NhanSu",
                column: "TenDangNhap",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PhieuNhap_DonNhapId",
                table: "PhieuNhap",
                column: "DonNhapId");

            migrationBuilder.CreateIndex(
                name: "IX_PhieuNhap_KhoChuaId",
                table: "PhieuNhap",
                column: "KhoChuaId");

            migrationBuilder.CreateIndex(
                name: "IX_PhieuXuat_DonHangId",
                table: "PhieuXuat",
                column: "DonHangId");

            migrationBuilder.CreateIndex(
                name: "IX_PhieuXuat_KhoChuaId",
                table: "PhieuXuat",
                column: "KhoChuaId");

            migrationBuilder.CreateIndex(
                name: "IX_SanPham_SKU",
                table: "SanPham",
                column: "SKU",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_VatTuCanDung_SanPhamId",
                table: "VatTuCanDung",
                column: "SanPhamId");

            migrationBuilder.CreateIndex(
                name: "IX_VatTuCanDung_VatTuId",
                table: "VatTuCanDung",
                column: "VatTuId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChiTietCheTaos");

            migrationBuilder.DropTable(
                name: "ChiTietDonHang");

            migrationBuilder.DropTable(
                name: "ChiTietDonNhap");

            migrationBuilder.DropTable(
                name: "ChiTietPhieuNhap");

            migrationBuilder.DropTable(
                name: "ChiTietPhieuXuat");

            migrationBuilder.DropTable(
                name: "DVTinh");

            migrationBuilder.DropTable(
                name: "HoaDon");

            migrationBuilder.DropTable(
                name: "KhoSanPham");

            migrationBuilder.DropTable(
                name: "KhoVatTu");

            migrationBuilder.DropTable(
                name: "NhanSu");

            migrationBuilder.DropTable(
                name: "VatTuCanDung");

            migrationBuilder.DropTable(
                name: "LenhSanXuat");

            migrationBuilder.DropTable(
                name: "PhieuNhap");

            migrationBuilder.DropTable(
                name: "PhieuXuat");

            migrationBuilder.DropTable(
                name: "VatTu");

            migrationBuilder.DropTable(
                name: "SanPham");

            migrationBuilder.DropTable(
                name: "DonNhap");

            migrationBuilder.DropTable(
                name: "DonHang");

            migrationBuilder.DropTable(
                name: "KhoChua");

            migrationBuilder.DropTable(
                name: "NhaCungCap");

            migrationBuilder.DropTable(
                name: "KhachHang");

            migrationBuilder.DropTable(
                name: "PhuongThucThanhToan");
        }
    }
}
