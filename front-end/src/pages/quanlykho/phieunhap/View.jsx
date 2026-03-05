import { useEffect, useState } from "react"
import { createTimeId, formatCurrency } from "../../../queries/common/FormatString"
import { useNavigate, useParams } from "react-router-dom"
import HeaderForm from "../../../compoments/ui/HeaderForm"
import ActionBar from "../../../compoments/ui/ActionBar"
import LinesTable from "../../../compoments/ui/LinesTable"
import Loading from "../../../compoments/ui/Loading"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { dele, get, post, put } from "../../../queries/apis/AxiosNghiepVu"
import Swal from "sweetalert2"
import { generateRowId } from "../../../queries/common/Uitit"

const ViewPhieuNhap = () => {
    const [isLoading, setIsLoading] = useState(false);
    const parms = useParams()
    const navigate = useNavigate()
    const [rows, setRows] = useState([])
    const [lstSanPham, setLstSanPham] = useState([])
    const [lstKhoChua, setLstKhoChua] = useState([])
    const [lstNhaCungCap, setLstNhaCungCap] = useState([])
    const account = JSON.parse(localStorage.getItem("Account"))
    const [form, setForm] = useState({
        maPN: createTimeId("PN"),
        thue: 0,
        nhaCungCapId: 0,
        donNhapId: parms.donNhapId ? Number(parms.donNhapId) : null,
        khoChuaId: 0,
        createBy: account.id,
        updateBy: account.id,
        diaChi: "",
        ChiTietPhieuNhaps: []
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
            field: "nhaCungCapId",
            label: "Chọn nhà cung cấp",
            placeholder: "Chọn nhà cung cấp",
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
            type: "number",
            field: "thue",
            placeholder: "Thuế",
            label: "Thuế"
        }, {
            type: "text",
            field: "diaChi",
            placeholder: "Địa chỉ",
            label: "Địa chỉ"
        }
    ];

    const headTable = [
        { field: "vatTuId", label: "Vật tư", width: 150, align: "left" },
        { field: "donGia", label: "Đơn giá", width: 130, align: "left" },
        { field: "soLuongHang", label: "Số lượng hàng", width: 120, align: "left" },
        { field: "thue", label: "Thuế (%)", width: 100, align: "left" },
        { field: "thanhTienTruocThue", label: "Tiền trước thuế", width: 150, align: "left" },
        { field: "thanhTienText", label: "Thành tiền", width: 150, align: "left" },
    ];

    const bodyTable = [
        {
            field: "vatTuId",
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
        const res = await get("/QuanLyKho/VatTu", null, setIsLoading)
        if (res.data && Array.isArray(res.data)) {
            const data = res.data.map(item => ({
                value: item.id,
                opt: item.tenVatTu,
                donGia: item.giaBan,
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
        const res = await get("/QuanLyMuaHang/NhaCungCap", null, setIsLoading)
        if (res.data && Array.isArray(res.data)) {
            const data = res.data.map(item => ({
                value: item.id,
                opt: item.tenNCC
            }))

            setLstNhaCungCap(data)
        }
    }

    const getPhieuNhap = async () => {
        const res = await get("/QuanLyKho/PhieuNhap/" + parms.id, null, setIsLoading)
        if (res) {
            setForm(prev => ({
                ...prev,
                maPN: res.maPN,
                thue: res.thue,
                nhaCungCapId: res.nhaCungCapId,
                donNhapId: res.donNhapId,
                khoChuaId: res.khoChuaId,
                diaChi: res.diaChi,
                trangThai: res.trangThai
            }))

            console.log(res)
            if (res.chiTietPhieuNhaps && Array.isArray(res.chiTietPhieuNhaps)) {
                const custom = (res.chiTietPhieuNhaps || []).map(item => ({
                    id: generateRowId(),

                    vatTuId: item.vatTuId,
                    donGia: item.donGia,
                    soLuongHang: item.soLuongHang,
                    thanhTienTruocThue: item.ThanhTienTruocThue,
                    thue: item.thue,
                    thanhTienText: item.thanhTienText
                }))

                setRows(custom)
            }
        }
    }

    useEffect(() => {
        getNhaCungCap()
        getSanPham()
        getKhoChua()
        getPhieuNhap()
    }, [])

    const onCreate = async () => {
        const payload = {
            ...form,
            ChiTietPhieuNhaps: rows.map(item => ({
                vatTuId: item.vatTuId,
                soLuongHang: item.soLuongHang,
                thue: item.thue,
                donGia: item.donGia
            }))
        }
        console.log(payload)

        const res = await post("/QuanLyKho/PhieuNhap/add", payload, setIsLoading)
        if (res === true) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Tạo phiếu nhập thành công !!!",
                icon: "success"
            })
            navigate(-1)
        }
    }

    const handleRowsChange = (newRows) => {
        setRows(newRows);
        console.log("Rows mới: ", newRows);
    };


    const Title = ({ trangThai }) => {
        switch (trangThai) {
            case 0:
                return (
                    <>
                        <ActionBar
                            title="Phiếu nhập"
                            subtitle="Phiếu nhập"
                            totalLabel="Phiếu nhập"
                            color="primary"
                            buttons={[
                                {
                                    label: "Quay lại",
                                    onClick: () => {
                                        navigate("/QuanLyKho/PhieuNhap")
                                    },
                                    icon: <ArrowBackIcon />
                                }, {
                                    label: "Nhập kho",
                                    onClick: async () => {
                                        {
                                            if (!form.khoChuaId) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa chọn kho chứa !",
                                                    icon: "error",
                                                });
                                                return;
                                            }

                                            if (!form.nhaCungCapId) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa chọn nhà cung cấp !",
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

                                            const res = await put(`/QuanLyKho/PhieuNhap/update/state?id=${parms.id}&state=2`, null, setIsLoading)
                                            console.log(res)
                                            if (res === true) {


                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Nhập kho thành công !!!",
                                                    icon: "success"
                                                })
                                                await getPhieuNhap()
                                            }
                                        }
                                    }

                                },
                                {
                                    label: "Hủy"
                                }, {
                                    label: "Sửa",
                                    onClick: async () => {
                                        {
                                            const payload = {
                                                ...form,
                                                chiTietPhieuNhaps: (rows || []).map(item => ({
                                                    vatTuId: item.vatTuId,
                                                    donGia: item.donGia,
                                                    soLuongHang: item.soLuongHang,
                                                    thue: item.thue
                                                }))
                                            }
                                            const res = await put("/QuanLyKho/PhieuNhap/update/" + parms.id, payload, setIsLoading)
                                            if (res === true) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chỉnh sửa thành công !!!",
                                                    icon: "success"
                                                })

                                                navigate("/QuanLyKho/QuanLyPhieuNhap")
                                            }
                                        }
                                    }
                                }, {
                                    label: "Xóa",
                                    onClick: async () => {
                                        {
                                            const res = await dele("/QuanLyKho/PhieuNhap/delete/" + parms.id, setIsLoading)
                                            if (res === true) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Xóa thành công !!!",
                                                    icon: "success"
                                                })
                                                navigate("/QuanLyKho/PhieuNhap")
                                            }
                                        }
                                    }
                                }
                            ]}
                        />
                    </>
                )
            case 1:
                return (
                    <>
                        <ActionBar
                            title="Phiếu nhập"
                            subtitle="Phiếu nhập"
                            totalLabel="Xác nhận"
                            color="primary"
                            buttons={[
                                {
                                    label: "Quay lại",
                                    onClick: () => {
                                        navigate("/QuanLyKho/PhieuNhap")
                                    },
                                    icon: <ArrowBackIcon />
                                }, {
                                    label: "Nhập kho",
                                    onClick: async () => {
                                        {
                                            if (!form.khoChuaId) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa chọn kho chứa !",
                                                    icon: "error",
                                                });
                                                return;
                                            }

                                            if (!form.nhaCungCapId) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa chọn nhà cung cấp !",
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
                                            const res = await put(`/QuanLyKho/PhieuNhap/update/state?id=${parms.id}&state=2`, null, setIsLoading)
                                            console.log(res)
                                            if (res === true) {


                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Nhập kho thành công !!!",
                                                    icon: "success"
                                                })
                                                await getPhieuNhap()
                                            }
                                        }
                                    }
                                },
                                {
                                    label: "Hủy"
                                }
                            ]}
                        />
                    </>
                )
            case 2:
                return (
                    <>
                        <ActionBar
                            title="Phiếu nhập"
                            subtitle="Phiếu nhập"
                            totalLabel="Hoàn tất"
                            color="primary"
                            buttons={[
                                {
                                    label: "Quay lại",
                                    onClick: () => {
                                        navigate("/QuanLyKho/PhieuNhap")
                                    },
                                    icon: <ArrowBackIcon />
                                }
                            ]}
                        />
                    </>
                )
        }
    }

    return (
        <>
            <Title trangThai={form.trangThai} />

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

export default ViewPhieuNhap