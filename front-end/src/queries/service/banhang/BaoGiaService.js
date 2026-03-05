export const getSanPham = async () => {
    try {
        setIsLoading(true);
        const data = await get("/QuanLyKho/SanPham", parm, setIsLoading);

        if (data && Array.isArray(data.data)) {
            const dulieu = data.data.map((item) => ({
                value: item.id,
                opt: item.tenSP,
                donGia: item.giaBanSP,
            }));
            setLstSanPham(dulieu);
        }
    } catch (error) {
        console.error("Lỗi load sản phẩm:", error);
    } finally {
        setIsLoading(false);
    }
};

export const getKhachHang = async () => {
    try {
        setIsLoading(true);
        const data = await get(
            "/QuanLyBanHang/KhachHang",
            parm,
            setIsLoading
        );

        if (data && Array.isArray(data.data)) {
            const dulieu = data.data.map((item) => ({
                value: item.id,
                opt: item.hoTenKh,
            }));
            setLstKhachHang(dulieu);
        }
    } catch (error) {
        console.error("Lỗi load khách hàng:", error);
    } finally {
        setIsLoading(false);
    }
};
export const getDonHang = async () => {
    try {
        setIsLoading(true);
        const data = await get(`/quanlybanhang/donhang/baogia/${parms.id}`, "", setIsLoading)
        console.log(data)
        if (data) {
            setForm(prev => ({
                ...prev,
                id: data.id,
                maDH: data.maDH,
                khachHangId: data.khachHangId,
                phuongThucThanhToanId: data.phuongThucThanhToanId,
                hetHan: data.hetHan,
                hieuLuc: data.hieuLuc,
                ngayDatHang: data.ngayDatHang,
                ngayGiaoHang: data.ngayGiaoHang,
                thue: data.thue,
                chiTietDonHangs: data.chiTietDonHangs,
                dVTinhId: data.dVTinhId,
                trangThai: data.trangThai,
                tenNhanSu: data.tenNhanSu
            }))

            const ctdh = data.chiTietDonHangs.map(item => ({
                id: generateRowId(),
                sanPhamId: item.sanPhamId,
                donGia: item.donGia,
                soLuongHang: item.soLuongHang,
                thue: item.thue,
                tienTruocThue: item.soLuongHang * item.donGia,
                thanhTien: (item.soLuongHang * item.donGia) + ((item.soLuongHang * item.donGia) * item.thue) / 100,
                tienTruocThueText: formatCurrency(item.soLuongHang * item.donGia),
                thanhTienText: formatCurrency((item.soLuongHang * item.donGia) + ((item.soLuongHang * item.donGia) * item.thue) / 100)
            }))
            setRows(ctdh)
        }
    } catch (error) {
        console.error("Lỗi load phương thức thanh toán:", error);
    } finally {
        setIsLoading(false);
    }
}

export const getDVTinh = async () => {
    const res = await get("/QuanLyBanHang/DonViTinh", null, setIsLoading)
    if (res.data && Array(res.data)) {
        const c = (res.data || []).map(item => ({
            value: item.id,
            opt: item.tenDVi
        }))

        setLstDVTinh(c)
    }
}