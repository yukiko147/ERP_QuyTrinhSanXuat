// CreateBanHang.jsx
import { useEffect, useState } from "react";
import ActionBar from "../../../compoments/ui/ActionBar";
import HeaderForm from "../../../compoments/ui/HeaderForm";
import LinesTable from "../../../compoments/ui/LinesTable";
import { get, post } from "../../../queries/apis/AxiosNghiepVu";
import Loading from "../../../compoments/ui/Loading";
import {
    createTimeId,
    formatCurrency,
} from "../../../queries/common/FormatString";

import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreateHoaDonBan = () => {
    const parms = useParams();
    const [donHang, setDonHang] = useState({})
    const [lstSanPham, setLstSanPham] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const [rows, setRows] = useState([])

    const [form, setForm] = useState({
        maHD: createTimeId("HDB"),
        ngayLap: null,
        ngayTra: null,
        tinhTrangHoaDon: 0,
        tinhTrangTra: 0,
        donHangId: parms.donHangId,
        tenKhachHang: "",
        thue: 0,
    })

    const parm = {
        PageNunber: 1,
        PageSize: 10,
        Seacrch: "a",
    };

    const getHoaDon = async () => {
        try {
            setIsLoading(true);
            const data = await get("/QuanLyBanHang/HoaDonBan/" + parms.id, parm, setIsLoading);
            console.log(data)
            if (data) {
                setForm(prev => ({
                    ...prev,
                    id: data.id,
                    maHD: data.maHD,
                    ngayLap: data.ngayLap,
                    ngayTra: data.ngayTra,
                    tinhTrangHoaDon: data.tinhTrangHoaDon,
                    tinhTrangTra: data.tinhTrangTra,
                    donHangId: data.donHangId,
                    tenKhachHang: data.tenKhachHang,
                    thue: data.thue,
                    soTienTra: data.soTienTra,
                    tongGTriDH: data.tongGTriDH,
                    hinhAnhKhach: data.hinhAnhKhach
                }))
                const cthd = (data.chiTietDonHangs || []).map(item => ({
                    sanPhamId: item.sanPhamId,
                    donGia: item.donGia,
                    soLuongHang: item.soLuongHang,
                    thue: item.thue,
                    thanhTien: item.thanhTien
                }))

                setRows(cthd)
            }
        } catch (error) {
            console.error("Lỗi load sản phẩm:", error);
        } finally {
            setIsLoading(false);
        }

    }

    const handleRowsChange = (newRows) => {
        setRows(newRows);
        console.log("Rows mới: ", newRows);
    };

    const getSanPham = async () => {
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

    const getDonHang = async () => {
        try {
            setIsLoading(true);
            const data = await get("/QuanLyBanHang/DonHang/" + parms.donHangId, parm, setIsLoading);

            console.log(data)
            if (data) {
                setForm(prev => ({
                    ...prev,
                    tenKhachHang: data.tenKhachHang ?? "",
                    thue: data.thue ?? 0,
                    hinhAnhKhach: data.hinhAnhKhach
                }))

                if (data.chiTietDonHangs && Array.isArray(data.chiTietDonHangs)) {
                    const dulieu = data.chiTietDonHangs.map((item) => ({
                        sanPhamId: item.sanPhamId,
                        thanhTien: Number(item.thanhTien ?? 0),
                        soLuongHang: Number(item.soLuongHang ?? 0),
                        thue: Number(item.Thue ?? 0)
                    }));
                    setRows(dulieu);
                }
            }
        } catch (error) {
            console.error("Lỗi load sản phẩm:", error);
        } finally {
            setIsLoading(false);
        }
    }
    const onCreate = async () => {
        try {
            const res = await post("quanlybanhang/hoadonban/add", form, setIsLoading)
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }



    useEffect(() => {
        getSanPham()
        getDonHang()
        getHoaDon()
    }, [])


    const headFormConfig = [
        {
            type: "text",
            field: "tenKhachHang",
            label: "Tên khách hàng",
            placeholder: "Tên khách hàng",
            disabled: true
        },
        {

        },
        {
            type: 'date',
            field: "ngayLap",
            label: "Ngày lập",
            placeholder: "Ngày lập",
            disabled: true

        },
        {
            type: "date",
            field: "ngayTra",
            label: "Ngày trả",
            placeholder: "Ngày trả",
            disabled: true
        }
    ]

    const headerTable = [
        { field: "sanPhamId", label: "Sản phẩm", width: 180, align: "left" },
        { field: "donGia", label: "Đơn giá", width: 150, align: "left" },
        {
            field: "soLuongHang",
            label: "Số lượng hàng",
            width: 150,
            align: "left",
        },
        { field: "thue", label: "Thuế", width: 150, align: "left" },
        { field: "tienTruocThue", label: "Tiền trước thuế", width: 150, align: "left" },
        { field: "thanhTien", label: "Thành tiền", width: 150, align: "left" },
    ];

    const bodyTable = [
        {
            field: "sanPhamId",
            type: "select",
            width: 170,
            options: lstSanPham,
            defaultValue: "",
            onChangeRow: (row, value) => {
                const sp = lstSanPham.find((x) => x.value === value);
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
                const tienTruocThue = soLuongHang * donGia
                const thanhTien =
                    soLuongHang * donGia * (1 + thue / 100);

                return {
                    ...row,
                    soLuongHang,
                    tienTruocThue,
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
                const tienTruocThue = soLuongHang * donGia
                const thanhTien =
                    soLuongHang * donGia * (1 + thue / 100);

                return {
                    ...row,
                    thue,
                    thanhTien,
                    tienTruocThue,
                    thanhTienText: formatCurrency(thanhTien),
                };
            },
        },
        {
            type: "textBox",
            field: "tienTruocThue",
            width: 150,
            align: "left",
        },
        {
            type: "textBox",
            field: "thanhTienText",
            width: 150,
            align: "left",
        },

    ];

    console.log(form)
    return (
        <>
            <ActionBar
                title="Hóa đơn"
                subtitle="Tạo hóa đơn"
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
                formInput={headFormConfig}
                form={form}
                setForm={setForm}
                isShowAvatar
                prev={form.hinhAnhKhach}
            />

            <LinesTable
                headTable={headerTable}
                bodyTable={bodyTable}
                initialRows={rows}
                title="Bảng chi tiết đơn hàng"
                subtitle="Quản lý danh sách hàng hóa, giá bán, thuế."
                onRowsChange={handleRowsChange}
                taxt={form.thue}
                isShowSumary={true}
                noShowButonAddLine={true}

            />


            <Loading open={isLoading} />
        </>
    )
}

export default CreateHoaDonBan