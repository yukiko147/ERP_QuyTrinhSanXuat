// CreateBanHang.jsx
import { useEffect, useState } from "react";
import ActionBar from "../../../compoments/ui/ActionBar";
import HeaderForm from "../../../compoments/ui/HeaderForm";
import LinesTable from "../../../compoments/ui/LinesTable";
import { get, post, put } from "../../../queries/apis/AxiosNghiepVu";
import Loading from "../../../compoments/ui/Loading";
import {
    createTimeId,
    formatCurrency,
} from "../../../queries/common/FormatString";

import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from "sweetalert2";
import { Box } from "@mui/material";

const ThanhToanPage = () => {
    const parms = useParams();
    const [lstSanPham, setLstSanPham] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [lstKhachHang, setLstKhachHang] = useState([])
    const navigate = useNavigate()

    const [rows, setRows] = useState([])

    const [form, setForm] = useState({
        id: "",
        maHD: createTimeId("HDB"),
        ngayLap: null,
        ngayTra: null,
        tinhTrangHoaDon: 0,
        tinhTrangTra: 0,
        donHangId: 0,
        tenKhachHang: "",
        thue: 0,
        phanTramTraTruoc: 0,
        soLan: 0,
    })

    const parm = {
        PageNunber: 1,
        PageSize: 10,
        Seacrch: "a",
    };

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

    const getDonHang = async (id) => {
        try {
            setIsLoading(true);
            const data = await get("/QuanLyBanHang/DonHang/" + form.donHangId, parm, setIsLoading);
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

    const getHoaDon = async () => {
        try {
            setIsLoading(true);
            const data = await get("/QuanLyBanHang/HoaDonBan/LayHoaDon?donHangId=" + parms.maHD, parm, setIsLoading);
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
                    phanTramTraTruoc: data.phanTramTra,
                    thue: data.thue,
                    tongGTriDH: data.tongGTriDH,
                    soTienTra: data.soTienTra,
                    soLan: data.soLan,
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


    useEffect(() => {
        getHoaDon()
        getSanPham()
        getDonHang()
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

    const HeadTable = [
        { field: "sanPhamId", label: "Sản phẩm", width: 180, align: "left" },
        { field: "donGia", label: "Đơn giá", width: 150, align: "left" },
        {
            field: "soLuongHang",
            label: "Số lượng hàng",
            width: 150,
            align: "left",
        },
        { field: "thue", label: "Thuế", width: 150, align: "left" },
        { field: "thanhTien", label: "Thành tiền", width: 150, align: "left" },
    ]

    const bodyTable = [
        {
            field: "sanPhamId",
            type: "select",
            width: 220,
            options: lstSanPham,
            defaultValue: "",
            disable: true
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
            disable: true
        },
        {
            field: "thue",
            type: "number",
            width: 150,
            align: "left",
            disable: true
        },
        {
            type: "textBox",
            field: "thanhTien",
            width: 150,
            align: "left",

        },
    ];

    const Title = ({ trangThai }) => {
        switch (trangThai) {
            case 0:
                return (
                    <ActionBar
                        title="Hóa đơn"
                        subtitle="Xem hóa đơn"
                        totalLabel="Chưa thanh toán"
                        color="gray"
                        buttons={[
                            {
                                label: "Quay lại",
                                onClick: () => navigate(`/QuanLyBanHang/DonHang/Info/${form.donHangId}`),
                                icon: <ArrowBackIcon />,
                            },
                            {
                                label: "Đã Thanh Toán",
                                onClick: async () => {
                                    const res = await put(
                                        `/QuanLyBanHang/HoaDonBan/state/${form.id}/1`,
                                        null,
                                        setIsLoading
                                    );
                                    if (res === true) {
                                        await Swal.fire({
                                            title: "Thông báo",
                                            text: "Đã cập nhật hóa đơn thanh toán!",
                                            icon: "success",
                                        });
                                        await getHoaDon();
                                    }
                                },
                            },
                            {
                                label: "Hủy",
                                onClick: async () => {
                                    const res = await put(
                                        `/QuanLyBanHang/HoaDonBan/state/${form.id}/-1`,
                                        null,
                                        setIsLoading
                                    );
                                    if (res === true) {
                                        await Swal.fire({
                                            title: "Thông báo !!!",
                                            text: "Hủy thanh toán thành công !!",
                                            icon: "success",
                                        });
                                        await getHoaDon();
                                    }
                                },
                            },
                        ]}
                    />
                );

            case 1:
                return (
                    <ActionBar
                        title="Hóa đơn"
                        subtitle="Xem hóa đơn"
                        totalLabel="Đã thanh toán"
                        color="success"
                        buttons={[
                            {
                                label: "Quay lại",
                                onClick: () => navigate(`/QuanLyBanHang/DonHang/Info/${form.donHangId}`),
                                icon: <ArrowBackIcon />,
                            },
                        ]}
                    />
                );

            case -1:
                return (
                    <ActionBar
                        title="Hóa đơn"
                        subtitle="Xem hóa đơn"
                        totalLabel="Đã hủy"
                        color="yellow"
                        buttons={[
                            {
                                label: "Quay lại",
                                onClick: () => navigate(`/QuanLyBanHang/DonHang/Info/${form.donHangId}`),
                                icon: <ArrowBackIcon />,
                            },
                        ]}
                    />
                );

            default:
                return (
                    <ActionBar
                        title="Hóa đơn"
                        subtitle="Xem hóa đơn"
                        totalLabel="Không xác định"
                        color="gray"
                        buttons={[
                            {
                                label: "Quay lại",
                                onClick: () => { navigate(`/QuanLyBanHang/DonHang/Info/${form.donHangId}`) },
                                icon: <ArrowBackIcon />,
                            },
                        ]}
                    />
                );
        }
    };


    return (
        <>

            <Title trangThai={form.tinhTrangHoaDon} />
            <HeaderForm
                formInput={headFormConfig}
                form={form}
                setForm={setForm}
                isShowAvatar
                prev={form.hinhAnhKhach}
            />

            <LinesTable
                headTable={HeadTable}
                bodyTable={bodyTable}
                initialRows={rows}
                title="Bảng chi tiết đơn hàng"
                subtitle="Quản lý danh sách hàng hóa, giá bán, thuế."
                onRowsChange={handleRowsChange}
                taxt={form.thue}
                isShowSumary={false}
                noShowButonAddLine={true}
                noTableDelete={false}

            />

            <Box sx={{ mt: 1.5, display: "flex", justifyContent: "flex-end" }}>
                <div className="w-full max-w-sm rounded-xl border border-slate-700/60 bg-slate-900/70 p-4">
                    <h3 className="text-base font-semibold text-slate-100">TÓM TẮT ĐƠN HÀNG</h3>

                    <div className="mt-4 space-y-2 text-sm">


                        <div className="flex justify-between text-slate-300">
                            <span>Giá trị đơn hàng</span>
                            <span className="font-medium text-amber-400">{formatCurrency(Number(form.tongGTriDH))}</span>
                        </div>

                        {/* <div className="flex justify-between text-slate-300">
                            <span>Thuế</span>
                            <span className="font-medium">{form.thue + "%"}</span>
                        </div> */}

                        <div className="flex justify-between text-slate-300">
                            <span>{form.soLan > 1 ? "Phần trăm trả sau" : "Phần trăm trả trước"}</span>
                            <span className="font-medium">{form.phanTramTraTruoc}%</span>
                        </div>

                        <div className="my-3 border-t border-slate-700/60" />

                        <div className="flex justify-between">
                            <span className="font-semibold text-slate-100">Số tiền trả {form.soLan > 1 ? "sau" : "trước"}</span>
                            <span className="text-lg font-bold text-emerald-400">
                                {formatCurrency(Number(form.soTienTra))}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-slate-100">Số tiền còn lại</span>
                            <span className="text-lg font-bold text-emerald-400">
                                {form.soLan > 1 ? formatCurrency(0) : formatCurrency(Number(form.tongGTriDH - form.soTienTra))}
                            </span>
                        </div>
                    </div>
                </div>
            </Box>
            <Loading open={isLoading} />
        </>
    )
}

export default ThanhToanPage