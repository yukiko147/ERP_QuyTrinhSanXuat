import { useEffect, useState } from "react"
import { createTimeId, formatCurrency } from "../../../queries/common/FormatString"
import { useNavigate, useParams } from "react-router-dom"
import HeaderForm from "../../../compoments/ui/HeaderForm"
import ActionBar from "../../../compoments/ui/ActionBar"
import LinesTable from "../../../compoments/ui/LinesTable"
import Loading from "../../../compoments/ui/Loading"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { get, post } from "../../../queries/apis/AxiosNghiepVu"
import Swal from "sweetalert2"
const CreatePhieuXuat = () => {
    const [isLoading, setIsLoading] = useState(false);
    const parms = useParams()
    const navigate = useNavigate()
    const [rows, setRows] = useState([])
    const [lstSanPham, setLstSanPham] = useState([])
    const [lstKhoChua, setLstKhoChua] = useState([])
    const [lstNhaCungCap, setLstNhaCungCap] = useState([])
    const account = JSON.parse(localStorage.getItem("Account"))
    const [form, setForm] = useState({
        maPN: createTimeId("PX"),
        createBy: account.id,
        updateBy: account.id,
        moTa: "",
        khoChuaId: 0,
        khachHangId: 0,
        diaChi: "",
        ChiTietPhieuXuats: []
    })


    const headerForm = [
        {
            type: "select",
            field: "khoChuaId",
            label: "Chọn kho chứa",
            placeholder: "Chọn kho chứa",
            options: lstKhoChua,
        },
        {
            type: "select",
            field: "khachHangId",
            label: "Chọn khách hàng",
            placeholder: "Chọn khách hàng",
            options: lstNhaCungCap,
        },
        {
            type: "text",
            field: "maPN",
            label: "Mã phiếu nhập",
            placeholder: "Mã phiếu nhập",
            disabled: true,
        },
        {
            type: "text",
            field: "diaChi",
            placeholder: "Địa chỉ",
            label: "Địa chỉ"
        }
    ];

    const headTable = [
        { field: "sanPhamId", label: "Sản phẩm", width: 150, align: "left" },
        { field: "donGia", label: "Đơn giá", width: 130, align: "left" },
        { field: "soLuongHang", label: "Số lượng hàng", width: 120, align: "left" },
        { field: "thue", label: "Thuế (%)", width: 100, align: "left" },
        { field: "thanhTienTruocThue", label: "Tiền trước thuế", width: 150, align: "left" },
        { field: "thanhTienText", label: "Thành tiền", width: 150, align: "left" },
    ];

    const bodyTable = [
        {
            field: "sanPhamId",
            type: "select",
            width: 150,
            options: lstSanPham,
            defaultValue: "",
            onChangeRow: (row, value) => {
                const sp = lstSanPham.find((x) => x.value === value);
                if (!sp) return row;

                const soLuongHang = Number(row.soLuongHang ?? 1);
                const donGia = Number(sp.donGia ?? 0);
                const thue = Number(row.thue ?? 0);

                const thanhTienTruocThue = soLuongHang * donGia;
                const thanhTien = thanhTienTruocThue + (thanhTienTruocThue * thue) / 100;

                return {
                    ...row,
                    sanPhamId: value,
                    donGia,
                    soLuongHang,
                    thue,
                    thanhTienTruocThue,
                    thanhTienText: formatCurrency(thanhTien),
                };
            },
        },
        {
            field: "donGia",
            type: "textBox",
            width: 130,

        },

        {
            field: "soLuongHang",
            type: "number",
            width: 120,
            onChangeRow: (row, value) => {
                const soLuongHang = Number(value ?? 0);
                const donGia = Number(row.donGia ?? 0);
                const thue = Number(row.thue ?? 0);

                const thanhTienTruocThue = soLuongHang * donGia;
                const thanhTien = thanhTienTruocThue + (thanhTienTruocThue * thue) / 100;

                return {
                    ...row,
                    soLuongHang,
                    donGia,
                    thue,
                    thanhTienTruocThue,
                    thanhTienText: formatCurrency(thanhTien),
                };
            },
        },

        {
            field: "thue",
            type: "number",
            width: 100,
            onChangeRow: (row, value) => {
                const thue = Number(value ?? 0);
                const soLuongHang = Number(row.soLuongHang ?? 0);
                const donGia = Number(row.donGia ?? 0);

                const thanhTienTruocThue = soLuongHang * donGia;
                const thanhTien = thanhTienTruocThue + (thanhTienTruocThue * thue) / 100;

                return {
                    ...row,
                    soLuongHang,
                    donGia,
                    thue,
                    thanhTienTruocThue,
                    thanhTienText: formatCurrency(thanhTien),
                };
            },
        },

        { field: "thanhTienTruocThue", type: "textBox", width: 150 },
        { field: "thanhTienText", type: "textBox", width: 150 },
    ];

    const getSanPham = async () => {
        const res = await get("/QuanLyKho/SanPham", null, setIsLoading)
        if (res.data && Array.isArray(res.data)) {
            const data = res.data.map(item => ({
                value: item.id,
                opt: item.tenSP,
                donGia: item.giaBanSP
            }))

            setLstSanPham(data)
        }
    }

    const getKhoChua = async () => {
        const res = await get("/QuanLyKho/Kho", null, setIsLoading)
        if (res.data && Array.isArray(res.data)) {
            const data = res.data.map(item => ({
                value: item.id,
                opt: item.tenKho
            }))

            setLstKhoChua(data)
        }
    }

    const getNhaCungCap = async () => {
        const res = await get("/QuanLyBanHang/KhachHang", null, setIsLoading)
        if (res.data && Array.isArray(res.data)) {
            const data = res.data.map(item => ({
                value: item.id,
                opt: item.hoTenKh
            }))

            setLstNhaCungCap(data)
        }
    }

    useEffect(() => {
        getNhaCungCap()
        getSanPham()
        getKhoChua()
    }, [])

    const onCreate = async () => {
        if (!form.khoChuaId) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Chưa chọn kho chứa !",
                icon: "error",
            });
            return;
        }

        if (!form.khachHangId) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Chưa chọn khách hàng !",
                icon: "error",
            });
            return;
        }

        if (!form.maPN) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Chưa có mã phiếu nhập !",
                icon: "error",
            });
            return;
        }

        if (!form.diaChi || String(form.diaChi).trim() === "") {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Chưa nhập địa chỉ !",
                icon: "error",
            });
            return;
        }

        const payload = {
            ...form,
            ChiTietPhieuXuats: rows.map(item => ({
                sanPhamId: item.sanPhamId,
                soLuongHang: item.soLuongHang,
                thue: item.thue,
                donGia: item.donGia
            }))
        }
        console.log(payload)

        const res = await post("/QuanLyKho/PhieuXuat/add", payload, setIsLoading)
        if (res === true) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Tạo phiếu xuất thành công !!!",
                icon: "success"
            })
            navigate("/QuanLyKho/PhieuXuat")
        }
    }

    const handleRowsChange = (newRows) => {
        setRows(newRows);
        console.log("Rows mới: ", newRows);
    };

    return (
        <>
            <ActionBar
                title="Phiếu xuất"
                subtitle="Tạo phiếu xuất"
                totalLabel="Tạo mới"
                color="gray"
                onCreate={onCreate}
                buttons={[
                    {
                        label: "Quay lại",
                        onClick: () => {
                            navigate(-1)
                        },
                        icon: <ArrowBackIcon />
                    }
                ]}
            />

            <HeaderForm
                formInput={headerForm}
                form={form}
                setForm={setForm}
                isShowAvatar={false}

            />

            <LinesTable
                headTable={headTable}
                bodyTable={bodyTable}
                initialRows={rows}
                title="Bảng chi tiết phiếu nhập"
                subtitle="Quản lý danh sách hàng hóa, giá bán, thuế."
                onRowsChange={handleRowsChange}
                taxt={form.thue}
                isShowSumary={true}
            />

            <Loading open={isLoading} />
        </>
    )
}

export default CreatePhieuXuat