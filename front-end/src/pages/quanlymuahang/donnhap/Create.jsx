import { useEffect, useState } from "react"
import { createTimeId, formatCurrency } from "../../../queries/common/FormatString"
import ActionBar from "../../../compoments/ui/ActionBar"
import HeaderForm from "../../../compoments/ui/HeaderForm"
import LinesTable from "../../../compoments/ui/LinesTable"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loading from "../../../compoments/ui/Loading"
import { get, post } from "../../../queries/apis/AxiosNghiepVu"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
const CreateDonNhap = () => {
    const navigate = useNavigate()
    const account = JSON.parse(localStorage.getItem("Account"))
    const [isLoading, setIsLoading] = useState(false);

    const [lstNhaCungCap, setNhaCungCap] = useState([])
    const [lstVatTu, setLstVatTu] = useState([])
    const [lstKhoChua, setLstKhoChua] = useState([])

    const [rows, setRows] = useState([])

    const [form, setForm] = useState({
        maDGH: createTimeId("MDN"),
        thoiGianGiao: null,
        thue: 0,
        nhaCungCapId: 0,
        khoChuaId: 0,
        createBy: account.id,
        updateBy: account.id
    })

    const headerForm = [
        {
            type: "select",
            field: "nhaCungCapId",
            label: "Tên nha cung cap",
            placeholder: "Chọn nha cung cap",
            options: lstNhaCungCap,
        },
        {
            type: "text",
            field: "maDGH",
            label: "Mã đơn hàng",
            placeholder: "Mã đơn hàng",
            disabled: true,
        },
        {
            type: "select",
            field: "khoChuaId",
            placeholder: "Chọn kho chứa",
            label: "Chọn kho chứa",
            options: lstKhoChua
        },
        {
            type: "number",
            field: "thue",
            label: "Thuế",
            placeholder: "Thuế",
        }, {
            type: "date",
            field: "thoiGianGiao",
            label: "Thời gian giao",
            placeholder: "Thời gian giao"
        }
    ];

    const headTable = [
        { field: "vatTuId", label: "Vật tư", width: 180, align: "left" },
        { field: "donGia", label: "Đơn giá", width: 150, align: "left" },
        {
            field: "soLuongHang",
            label: "Số lượng hàng",
            width: 150,
            align: "left",
        },
        { field: "thue", label: "Thuế", width: 150, align: "left" },
        { field: "thanhTien", label: "Thành tiền", width: 150, align: "left" },
    ];


    const bodyTable = [
        {
            field: "vatTuId",
            type: "select",
            width: 220,
            options: lstVatTu,
            defaultValue: "",
            onChangeRow: (row, value) => {
                const sp = lstVatTu.find((x) => x.value === value);
                if (!sp) return row;

                const soLuongHang = Number(row.soLuongHang ?? 1);
                const donGia = Number(sp.donGia ?? 0);
                const thue = Number(row.thue ?? 0);
                const thanhTien =
                    soLuongHang * donGia * (1 + thue / 100);

                return {
                    ...row,
                    sanPhamId: value, // đúng tên field gửi backend
                    donGia,
                    thue,
                    soLuongHang,
                    thanhTien,
                    thanhTienText: formatCurrency(thanhTien),
                };
            },
        },
        {
            field: "donGia",
            type: "textBox",
            width: 150,
            align: "left",
        },
        {
            field: "soLuongHang",
            type: "number",
            width: 150,
            align: "left",
            defaultValue: 0,
            onChangeRow: (row, value) => {
                const soLuongHang = Number(value ?? 0);
                const donGia = Number(row.donGia ?? 0);
                const thue = Number(row.thue ?? 0);
                const thanhTien =
                    soLuongHang * donGia * (1 + thue / 100);

                return {
                    ...row,
                    soLuongHang,
                    thanhTien,
                    thanhTienText: formatCurrency(thanhTien),
                };
            },
        },
        {
            field: "thue",
            type: "number",
            width: 150,
            align: "left",
            onChangeRow: (row, value) => {
                const thue = Number(value ?? 0);
                const soLuongHang = Number(row.soLuongHang ?? 0);
                const donGia = Number(row.donGia ?? 0);
                const thanhTien =
                    soLuongHang * donGia * (1 + thue / 100);

                return {
                    ...row,
                    thue,
                    thanhTien,
                    thanhTienText: formatCurrency(thanhTien),
                };
            },
        },
        {
            type: "textBox",
            field: "thanhTienText",
            width: 150,
            align: "left",
        },
    ];


    const getNhaCungCap = async () => {
        const res = await get("/QuanLyMuaHang/NhaCungCap", null, setIsLoading);
        if (res.data && Array.isArray(res.data)) {
            const c = (res.data || []).map(item => ({
                opt: item.tenNCC,
                value: item.id
            }))
            setNhaCungCap(c)
        }
    }

    const getVatTu = async () => {
        const res = await get("/QuanLyKho/VatTu", null, setIsLoading)
        console.log(res)
        if (res.data && Array.isArray(res.data)) {
            const c = (res.data || []).map(item => ({
                opt: item.tenVatTu,
                value: item.id,
                donGia: item.giaBan
            }))
            setLstVatTu(c)
        }
    }

    const getKhoCHua = async () => {
        const res = await get("/QuanLyKho/Kho", null, setIsLoading)
        if (res.data && Array.isArray(res.data)) {
            const c = (res.data || []).map(item => ({
                opt: item.tenKho,
                value: item.id
            }))
            setLstKhoChua(c)
        }
    }

    useEffect(() => {
        getNhaCungCap()
        getVatTu()
        getKhoCHua()
    }, [])
    const onCreate = async () => {
        if (!form.nhaCungCapId) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Chưa chọn nhà cung cấp !",
                icon: "error",
            });
            return;
        }

        if (!form.maDGH) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Chưa có mã đơn hàng !",
                icon: "error",
            });
            return;
        }

        if (!form.khoChuaId) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Chưa chọn kho chứa !",
                icon: "error",
            });
            return;
        }

        if (!form.thoiGianGiao) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Chưa chọn thời gian giao !",
                icon: "error",
            });
            return;
        }

        const payload = {
            ...form,
            chiTietDonNhaps: (rows || []).map(item => ({
                vatTuId: item.vatTuId,
                soLuongHang: item.soLuongHang,
                thue: item.thue,
                donGia: item.donGia
            }))
        }


        const res = await post("/QuanLyMuaHang/DonNhap/add", payload, setIsLoading)
        if (res === true) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Thêm thành công !!!",
                icon: "success"
            })
            navigate("/QuanLyMuaHang/DonNhap")
        }
    }

    const handleRowsChange = (newRows) => {
        setRows(newRows);
        console.log("Rows mới: ", newRows);
    };
    return (
        <>

            <ActionBar
                title="Đơn nhập"
                subtitle="Tạo đơn nhập"
                totalLabel="Đơn nhập"
                color="primary"
                onCreate={onCreate}
                buttons={[
                    {
                        label: "Quay lại",
                        onClick: () => {
                            navigate("/QuanLyMuaHang/DonNhap")
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
                title="Bảng chi tiết đơn nhập"
                subtitle="Quản lý danh sách hàng hóa, giá bán, thuế."
                onRowsChange={handleRowsChange}
                taxt={form.thue}
                isShowSumary={true}
            />
            <Loading open={isLoading} />
        </>
    )
}

export default CreateDonNhap