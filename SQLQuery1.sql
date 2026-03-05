SET NOCOUNT ON;

-- =========================
-- 1) DVTinh (10 dòng)
-- =========================
INSERT INTO DVTinh (TenDVi, KyHieu, Mota, HeSo, CreateAt, UpdateAt, CreateBy, UpdateBy)
VALUES
(N'Cái',   N'cai',   N'Đơn vị tính cái',          1.0,   GETDATE(), GETDATE(), 1, 1),
(N'Bộ',    N'bo',    N'Đơn vị tính bộ',           1.0,   GETDATE(), GETDATE(), 1, 1),
(N'Hộp',   N'hop',   N'Đơn vị tính hộp',          1.0,   GETDATE(), GETDATE(), 1, 1),
(N'Chai',  N'chai',  N'Đơn vị tính chai',         1.0,   GETDATE(), GETDATE(), 1, 1),
(N'Kg',    N'kg',    N'Khối lượng kilogram',      1.0,   GETDATE(), GETDATE(), 1, 1),
(N'Gram',  N'g',     N'Khối lượng gram',          0.001, GETDATE(), GETDATE(), 1, 1),
(N'Mét',   N'm',     N'Chiều dài mét',            1.0,   GETDATE(), GETDATE(), 1, 1),
(N'Cuộn',  N'cuon',  N'Đơn vị tính cuộn',         1.0,   GETDATE(), GETDATE(), 1, 1),
(N'Lít',   N'l',     N'Dung tích lít',            1.0,   GETDATE(), GETDATE(), 1, 1),
(N'Thùng', N'thung', N'Đơn vị tính thùng',        1.0,   GETDATE(), GETDATE(), 1, 1);

-- =========================
-- 2) PhuongThucThanhToan (10 dòng)
-- =========================
INSERT INTO PhuongThucThanhToan (TenDieuKhoan, SoPhanTramTraTruoc, SoKyTra, TienTraMoiKy, CreateAt, UpdateAt, CreateBy, UpdateBy)
VALUES
(N'Thanh toán ngay 100%', 100, 1, 0, GETDATE(), GETDATE(), 1, 1),
(N'Cọc 10% - trả 1 kỳ',     10, 1, 0, GETDATE(), GETDATE(), 1, 1),
(N'Cọc 20% - trả 1 kỳ',     20, 1, 0, GETDATE(), GETDATE(), 1, 1),
(N'Cọc 30% - trả 1 kỳ',     30, 1, 0, GETDATE(), GETDATE(), 1, 1),
(N'Cọc 30% - trả 2 kỳ',     30, 2, 0, GETDATE(), GETDATE(), 1, 1),
(N'Cọc 40% - trả 2 kỳ',     40, 2, 0, GETDATE(), GETDATE(), 1, 1),
(N'Cọc 50% - trả 2 kỳ',     50, 2, 0, GETDATE(), GETDATE(), 1, 1),
(N'Cọc 30% - trả 3 kỳ',     30, 3, 0, GETDATE(), GETDATE(), 1, 1),
(N'Trả chậm 30 ngày',        0, 1, 0, GETDATE(), GETDATE(), 1, 1),
(N'Trả chậm 60 ngày',        0, 2, 0, GETDATE(), GETDATE(), 1, 1);

-- =========================
-- 3) KhachHang (10 dòng) - Email unique
-- =========================
INSERT INTO KhachHang (HoTenKh, Email, DiaChi, Sdt, HinhAnh, CreateAt, UpdateAt, CreateBy, UpdateBy)
VALUES
(N'Nguyễn Văn A', N'khach01@gmail.com', N'Nha Trang',   N'0901000001', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Trần Thị B',   N'khach02@gmail.com', N'Hà Nội',      N'0901000002', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Lê Văn C',     N'khach03@gmail.com', N'TP HCM',      N'0901000003', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Phạm Thị D',   N'khach04@gmail.com', N'Đà Nẵng',     N'0901000004', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Hoàng Văn E',  N'khach05@gmail.com', N'Cần Thơ',     N'0901000005', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Võ Thị F',     N'khach06@gmail.com', N'Bình Dương',  N'0901000006', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Đặng Văn G',   N'khach07@gmail.com', N'Đồng Nai',    N'0901000007', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Bùi Thị H',    N'khach08@gmail.com', N'Khánh Hòa',   N'0901000008', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Ngô Văn I',    N'khach09@gmail.com', N'Hải Phòng',   N'0901000009', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Đỗ Thị K',     N'khach10@gmail.com', N'Quảng Ninh',  N'0901000010', NULL, GETDATE(), GETDATE(), 1, 1);

-- =========================
-- 4) NhaCungCap (10 dòng)
-- =========================
INSERT INTO NhaCungCap (TenNCC, DiaChi, Email, Sdt, MaSoThue, hinhAnh, CreateAt, UpdateAt, CreateBy, UpdateBy)
VALUES
(N'Công ty NCC 01', N'Hà Nội',     N'ncc01@company.com', N'0912000001', N'0100000001', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Công ty NCC 02', N'TP HCM',     N'ncc02@company.com', N'0912000002', N'0100000002', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Công ty NCC 03', N'Đà Nẵng',    N'ncc03@company.com', N'0912000003', N'0100000003', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Công ty NCC 04', N'Cần Thơ',    N'ncc04@company.com', N'0912000004', N'0100000004', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Công ty NCC 05', N'Bình Dương', N'ncc05@company.com', N'0912000005', N'0100000005', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Công ty NCC 06', N'Đồng Nai',   N'ncc06@company.com', N'0912000006', N'0100000006', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Công ty NCC 07', N'Nha Trang',  N'ncc07@company.com', N'0912000007', N'0100000007', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Công ty NCC 08', N'Quảng Nam',  N'ncc08@company.com', N'0912000008', N'0100000008', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Công ty NCC 09', N'Hải Phòng',  N'ncc09@company.com', N'0912000009', N'0100000009', NULL, GETDATE(), GETDATE(), 1, 1),
(N'Công ty NCC 10', N'Quảng Ninh', N'ncc10@company.com', N'0912000010', N'0100000010', NULL, GETDATE(), GETDATE(), 1, 1);

-- =========================
-- 5) KhoChua (10 dòng)
-- =========================
INSERT INTO KhoChua (TenKho, DiaChiKho, CreateAt, UpdateAt, CreateBy, UpdateBy)
VALUES
(N'Kho 01', N'Nha Trang - Khánh Hòa', GETDATE(), GETDATE(), 1, 1),
(N'Kho 02', N'TP HCM',               GETDATE(), GETDATE(), 1, 1),
(N'Kho 03', N'Hà Nội',               GETDATE(), GETDATE(), 1, 1),
(N'Kho 04', N'Đà Nẵng',              GETDATE(), GETDATE(), 1, 1),
(N'Kho 05', N'Cần Thơ',              GETDATE(), GETDATE(), 1, 1),
(N'Kho 06', N'Bình Dương',           GETDATE(), GETDATE(), 1, 1),
(N'Kho 07', N'Đồng Nai',             GETDATE(), GETDATE(), 1, 1),
(N'Kho 08', N'Khánh Hòa',            GETDATE(), GETDATE(), 1, 1),
(N'Kho 09', N'Hải Phòng',            GETDATE(), GETDATE(), 1, 1),
(N'Kho 10', N'Quảng Ninh',           GETDATE(), GETDATE(), 1, 1);

-- =========================
-- 6) SanPham (10 dòng) - SKU unique
--   DVTinhId: 1..10
-- =========================
INSERT INTO SanPham (TenSP, SKU, GiaGocSP, GiaBanSP, LoiNhuan, MoTa, Thue, HinhAnh, TrangThai, DVTinhId, HanSanXuat, CreateAt, UpdateAt, CreateBy, UpdateBy)
VALUES
(N'Sản phẩm 01', N'SP-0001', 100000, 130000, 30000,  N'Mô tả sản phẩm 01', 8, NULL, 1, 1, 12, GETDATE(), GETDATE(), 1, 1),
(N'Sản phẩm 02', N'SP-0002', 150000, 195000, 45000,  N'Mô tả sản phẩm 02', 8, NULL, 1, 2, 12, GETDATE(), GETDATE(), 1, 1),
(N'Sản phẩm 03', N'SP-0003', 200000, 260000, 60000,  N'Mô tả sản phẩm 03', 8, NULL, 1, 3, 12, GETDATE(), GETDATE(), 1, 1),
(N'Sản phẩm 04', N'SP-0004', 300000, 365000, 65000,  N'Mô tả sản phẩm 04', 8, NULL, 1, 4, 12, GETDATE(), GETDATE(), 1, 1),
(N'Sản phẩm 05', N'SP-0005', 120000, 155000, 35000,  N'Mô tả sản phẩm 05', 8, NULL, 1, 5, 12, GETDATE(), GETDATE(), 1, 1),
(N'Sản phẩm 06', N'SP-0006', 500000, 585000, 85000,  N'Mô tả sản phẩm 06', 8, NULL, 1, 6, 12, GETDATE(), GETDATE(), 1, 1),
(N'Sản phẩm 07', N'SP-0007', 800000, 930000, 130000, N'Mô tả sản phẩm 07', 8, NULL, 1, 7, 12, GETDATE(), GETDATE(), 1, 1),
(N'Sản phẩm 08', N'SP-0008',  90000, 120000, 30000,  N'Mô tả sản phẩm 08', 8, NULL, 1, 8, 12, GETDATE(), GETDATE(), 1, 1),
(N'Sản phẩm 09', N'SP-0009', 110000, 145000, 35000,  N'Mô tả sản phẩm 09', 8, NULL, 1, 9, 12, GETDATE(), GETDATE(), 1, 1),
(N'Sản phẩm 10', N'SP-0010', 700000, 825000, 125000, N'Mô tả sản phẩm 10', 8, NULL, 1, 10, 12, GETDATE(), GETDATE(), 1, 1);

-- =========================
-- 7) VatTu (10 dòng)
--   DVTinhId: 1..10
-- =========================
INSERT INTO VatTu (TenVatTu, GiaBan, Mota, HinhAnh, TrangThai, DVTinhId, CreateAt, UpdateAt, CreateBy, UpdateBy)
VALUES
(N'Vật tư 01', 10000, N'Mô tả vật tư 01', NULL, 1, 1,  GETDATE(), GETDATE(), 1, 1),
(N'Vật tư 02', 15000, N'Mô tả vật tư 02', NULL, 1, 2,  GETDATE(), GETDATE(), 1, 1),
(N'Vật tư 03', 20000, N'Mô tả vật tư 03', NULL, 1, 3,  GETDATE(), GETDATE(), 1, 1),
(N'Vật tư 04', 25000, N'Mô tả vật tư 04', NULL, 1, 4,  GETDATE(), GETDATE(), 1, 1),
(N'Vật tư 05', 30000, N'Mô tả vật tư 05', NULL, 1, 5,  GETDATE(), GETDATE(), 1, 1),
(N'Vật tư 06', 35000, N'Mô tả vật tư 06', NULL, 1, 6,  GETDATE(), GETDATE(), 1, 1),
(N'Vật tư 07', 40000, N'Mô tả vật tư 07', NULL, 1, 7,  GETDATE(), GETDATE(), 1, 1),
(N'Vật tư 08', 45000, N'Mô tả vật tư 08', NULL, 1, 8,  GETDATE(), GETDATE(), 1, 1),
(N'Vật tư 09', 50000, N'Mô tả vật tư 09', NULL, 1, 9,  GETDATE(), GETDATE(), 1, 1),
(N'Vật tư 10', 55000, N'Mô tả vật tư 10', NULL, 1, 10, GETDATE(), GETDATE(), 1, 1);

-- =========================
-- 8) VatTuCanDung (10 dòng)
--   Mỗi sản phẩm cần 1 vật tư (bạn có thể đổi SoLuongCan tùy nghiệp vụ)
-- =========================
INSERT INTO VatTuCanDung (SanPhamId, VatTuId, SoLuongCan)
VALUES
(1,  1, 2),
(2,  2, 3),
(3,  3, 1),
(4,  4, 4),
(5,  5, 2),
(6,  6, 5),
(7,  7, 3),
(8,  8, 2),
(9,  9, 1),
(10, 10, 6);
