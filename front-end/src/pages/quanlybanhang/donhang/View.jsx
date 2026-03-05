// CreateBanHang.jsx
import { useEffect, useState } from "react";
import ActionBar from "../../../compoments/ui/ActionBar";
import HeaderForm from "../../../compoments/ui/HeaderForm";
import LinesTable from "../../../compoments/ui/LinesTable";
import { dele, get, post, put } from "../../../queries/apis/AxiosNghiepVu";
import Loading from "../../../compoments/ui/Loading";
import {
    createTimeId,
    formatCurrency,
} from "../../../queries/common/FormatString";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, inputBaseClasses, TextField } from "@mui/material";
import PhuongThucView from "./PhuongThucView";
import { useNavigate, useParams } from "react-router-dom";
import MailIcon from '@mui/icons-material/Mail';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Swal from "sweetalert2";
import HandymanIcon from '@mui/icons-material/Handyman';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { generateRowId } from "../../../queries/common/Uitit";
import FullScreenDialog from "../../../compoments/ui/Dialog";
const trangThaiHang = (trangthai) => {
    switch (trangthai) {
        case 0:
            return "Chưa kiểm tra"
        case 1:
            return "Thiếu"
        case 2:
            return "Đủ"
        default:
            return "Không xác định"
    }
}

const ViewDonHang = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [lstKhachHang, setLstKhachHang] = useState([]);
    const [lstSanPham, setLstSanPham] = useState([]);
    const [lstPhuongThuc, setLstPhuongThuc] = useState([]);
    const [lstKhoChua, setLstKhoChua] = useState([])
    const [lstDVTinh, setLstDVTinh] = useState([])
    const account = JSON.parse(localStorage.getItem("Account"))
    const [email, setEmail] = useState("")
    const [openDialogEmail, setOpenDialogEmail] = useState(false);

    const [prev, setPrev] = useState("")

    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate()

    const [form, setForm] = useState({
        maDH: createTimeId("DH"),
        khachHangId: 0,
        phuongThucThanhToanId: 1,
        hetHan: null,
        hieuLuc: null,
        ngayDatHang: null,
        ngayGiaoHang: null,
        trangThai: 0,
        thue: 0,
        khoChuaId: 0,
        chiTietDonHangs: [],
    });

    const [rows, setRows] = useState([]);
    const parms = useParams()
    const parm = {
        PageNunber: 1,
        PageSize: 10,
        Seacrch: "a",
    };

    // ============== LOAD DATA ==============
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

    const getKhachHang = async () => {
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
                    hinhAnh: item.hinhAnh
                }));
                setLstKhachHang(dulieu);
            }
        } catch (error) {
            console.error("Lỗi load khách hàng:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getPhuongThuc = async () => {
        try {
            setIsLoading(true);
            const data = await get(
                "/QuanLyBanHang/PhuongThucThanhToan",
                parm,
                setIsLoading
            );

            if (data && Array.isArray(data.data)) {
                const dulieu = data.data.map((item) => ({
                    value: item.id,
                    opt: item.tenDieuKhoan,
                    soPhanTramTraTruoc: item.soPhanTramTraTruoc,
                    hanThanhToan: item.hanThanhToan,
                    tienTraMoiKy: item.tienTraMoiKy,
                }));
                setLstPhuongThuc(dulieu);
            }
        } catch (error) {
            console.error("Lỗi load phương thức thanh toán:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getDonHang = async () => {
        try {
            setIsLoading(true);
            const data = await get(`/quanlybanhang/donhang/${parms.id}`, "", setIsLoading)
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
                    tenNhanSu: data.tenNhanSu,
                    trangThai: data.trangThai,
                    khoChuaId: data.khoChuaId
                }))
                setPrev(data.hinhAnhKhach)
                const custom = (data.chiTietDonHangs || []).map(item => ({
                    id: generateRowId(),

                    sanPhamId: item.sanPhamId,
                    donGia: item.donGia,
                    soLuongHang: item.soLuongHang,
                    thue: item.thue,
                    tienTruocThue: formatCurrency(item.donGia * item.soLuongHang),
                    thanhTienText: formatCurrency(item.thanhTien),
                    trangThai: trangThaiHang(item.trangThai),
                    kiemTraHang: <button
                        type="button"
                        onClick={async () => {
                            const res = await get(
                                `/QuanLyBanHang/DonHang/kiemtratonkho/${item.sanPhamId}/${parms.id}`,
                                null,
                                setIsLoading
                            );

                            if (res === true) {
                                Swal.fire({
                                    title: "Thông báo !!!",
                                    text: "Kiểm tra thành công !!!",
                                    icon: "success",
                                });

                                getDonHang();
                            }
                        }}
                        className="
        inline-flex items-center justify-center
        rounded-md px-3 py-1.5 text-xs font-semibold
        bg-emerald-500 text-slate-900
        border border-emerald-600
        shadow-sm
        hover:bg-emerald-400 hover:border-emerald-500
        active:scale-[0.97]
        disabled:opacity-60 disabled:cursor-not-allowed
        transition
    "
                    >
                        <svg
                            className="mr-1 h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M9 2a7 7 0 014.95 11.95l3.28 3.3-1.42 1.4-3.3-3.28A7 7 0 119 2zm0 2a5 5 0 100 10A5 5 0 009 4z" />
                        </svg>
                        Kiểm tra
                    </button>


                    ,
                    cheTao: <button
                        disabled={item.trangThai === 1 ? false : true}
                        type="button"
                        onClick={async () => {
                            const payload = {
                                sanPhamId: item.sanPhamId,
                                donHangId: parms.id,
                                soLuongMua: item.soLuongHang,
                                trangThai: item.trangThai,
                                createBy: account.id,
                                updateBy: account.id,

                            };


                            const res = await post("/QuanLyBanHang/DonHang/TaoLenhSanXuat", payload, setIsLoading)
                            if (res) {
                                Swal.fire({
                                    title: "Thông báo !!!",
                                    text: "Mã lệnh " + res + " đang được sản xuất",
                                    icon: "success"
                                })
                                await getDonHang();

                            }
                            console.log(payload)

                        }}
                        className="
        inline-flex items-center justify-center
        rounded-md px-3 py-1.5 text-xs font-semibold
        bg-sky-500 text-slate-900
        border border-sky-600
        shadow-sm
        hover:bg-sky-400 hover:border-sky-500
        active:scale-[0.97]
        disabled:opacity-60 disabled:cursor-not-allowed
        transition
    "
                    >
                        {/* icon chế tạo */}
                        <svg
                            className="mr-1 h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            {/* Bánh răng đơn giản */}
                            <path d="M11.5 2.25a.75.75 0 00-3 0v.546a5.97 5.97 0 00-1.622.671l-.387-.387a.75.75 0 00-1.06 1.06l.387.387A5.97 5.97 0 004.046 6.5H3.5a.75.75 0 000 3h.546a5.97 5.97 0 00.671 1.622l-.387.387a.75.75 0 101.06 1.06l.387-.387A5.97 5.97 0 008.5 12.704v.546a.75.75 0 001.5 0v-.546a5.97 5.97 0 001.622-.671l.387.387a.75.75 0 101.06-1.06l-.387-.387A5.97 5.97 0 0015.954 9.5H16.5a.75.75 0 000-3h-.546a5.97 5.97 0 00-.671-1.622l.387-.387a.75.75 0 00-1.06-1.06l-.387.387A5.97 5.97 0 0011.5 2.796V2.25zM10 7a2.5 2.5 0 11-5e-3 5 2.5 2.5 0 015e-3-5z" />
                        </svg>
                        Chế tạo
                    </button>



                }))
                setRows(custom)
            }
        } catch (error) {
            console.error("Lỗi load phương thức thanh toán:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const getKhoChua = async () => {
        const res = await get("/QuanLyKho/Kho", null, setIsLoading)
        if (res.data && Array.isArray(res.data)) {
            const custom = (res.data || []).map(item => ({
                opt: item.tenKho,
                value: item.id
            }))

            setLstKhoChua(custom)
        }
    }

    const getDVTinh = async () => {
        const res = await get("/QuanLyBanHang/DonViTinh", null, setIsLoading)
        if (res.data && Array(res.data)) {
            const c = (res.data || []).map(item => ({
                value: item.id,
                opt: item.tenDVi
            }))

            setLstDVTinh(c)
        }
    }


    useEffect(() => {
        getKhachHang();
        getSanPham();
        getPhuongThuc();
        getDonHang()
        getKhoChua()
        getDVTinh()
    }, []);

    // ============== FORM HEADER CONFIG ==============
    const headerForm = [
        {
            type: "select",
            field: "khachHangId",
            label: "Tên khách hàng",
            placeholder: "Chọn khách hàng",
            options: lstKhachHang,
        },
        {
            type: "text",
            field: "maDH",
            label: "Mã đơn hàng",
            placeholder: "Mã đơn hàng",
            disabled: true,
        },
        {
            type: "select",
            field: "phuongThucThanhToanId",
            label: (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                        setOpenDialog(true);
                    }}
                    className="
                        !h-auto
                        !px-2 !py-0.5
                        !text-xs !font-medium !text-slate-300
                        !border-slate-600
                        hover:!border-slate-400
                        hover:!bg-slate-800/60
                        !normal-case
                    "
                >
                    ...
                </Button>
            ),
            placeholder: "Chọn phương thức",
            options: lstPhuongThuc,
        },
        {
            type: "select",
            field: "khoChuaId",
            placeholder: "Chọn kho chứa",
            label: "Kho chứa",
            options: lstKhoChua

        },
        // {
        //     type: "number",
        //     field: "thue",
        //     label: "Thuế",
        //     placeholder: "Thuế",
        // },
        {
            type: "date",
            field: "hieuLuc",
            label: "Ngày hiệu lực",
            placeholder: "Ngày hiệu lực",
            disabled: true
        },

        {
            type: "date",
            field: "hetHan",
            label: "Ngày hết hạn",
            placeholder: "Ngày hết hạn",
            disabled: true
        },
        {
            type: "text",
            field: "tenNhanSu",
            label: "Người tạo",
            disabled: true
        }
    ];

    // ============== TABLE CONFIG ==============
    const headTable = [
        { field: "sanPhamId", label: "Sản phẩm", width: 120, align: "left" },
        { field: "donGia", label: "Đơn giá", width: 100, align: "left" },
        {
            field: "soLuongHang",
            label: "Số lượng hàng",
            width: 120,
            align: "left",
        },
        // {
        //     field: "dVTinhId",
        //     label: "Đơn vị tính",
        //     width: 150,
        //     align: "left",
        // },
        { field: "thue", label: "Thuế", width: 100, align: "left" },
        { field: "tienTruocThue", label: "Tiền trước thuế", width: 150, align: "left" },
        { field: "thanhTienText", label: "Thành tiền", width: 100, align: "left" },
        { field: "trangThai", label: "Trạng thái", width: 85, align: "center" },
        { field: "sanXuat", label: "", width: 50, align: "center" },
        { field: "kiemTraHang", label: "", width: 100, align: "center" },

        { field: "cheTao", label: "", width: 100, align: "center" },

    ];

    const bodyTable = [
        {
            field: "sanPhamId",
            type: "select",
            width: 120,
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
            width: 100,
            align: "left",
        },
        {
            field: "soLuongHang",
            type: "number",
            width: 100,
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
        // {
        //     field: "dVTinhId",
        //     type: "select",
        //     width: 150,
        //     align: "center",
        //     options: lstDVTinh,
        // },
        {
            field: "thue",
            type: "number",
            width: 100,
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
            width: 100,
            align: "left",
        },
        {
            type: "textBox",
            field: "thanhTienText",
            width: 100,
            align: "left",
        },
        {
            type: "textBox",
            field: "trangThai",
            width: 85,
            align: "center",
        },
        {
            type: "textBox",
            field: "sanXuat",
            width: 50,
            align: "center",
        },
        {
            type: "textBox",
            field: "kiemTraHang",
            width: 120,
            align: "center",
        },
        {
            type: "textBox",
            field: "cheTao",
            width: 120,
            align: "center",
        },
    ];

    const handleRowsChange = (newRows) => {
        setRows(newRows);
        console.log("Rows mới: ", newRows);
    };

    const sendEmail = async () => {
        setOpenDialogEmail(false)
        const res = await get(`/QuanLyBanHang/DonHang/GuiEmail?email=${email}&id=${parms.id}`, null, setIsLoading)


        if (res === true) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Gửi email thành công !!!",
                icon: "success"
            })
        }
    }

    const handlEdit = async () => {

        const payload = {
            ...form,
            chiTietDonHangs: rows.map((r) => ({
                sanPhamId: r.sanPhamId,
                donGia: Number(r.donGia ?? 0),
                soLuongHang: Number(r.soLuongHang ?? 0),
                thue: Number(r.thue ?? 0),
                thanhTien: Number(r.thanhTien ?? 0),
                donHangId: parms.id,
                dVTinhId: r.dVTinhId
            })),
        };
        const res = await put("/QuanLyBanHang/DonHang/update/" + parms.id, payload, setIsLoading)
        if (res === true) {
            getDonHang()
            Swal.fire({
                title: "Thông báo !!!",
                text: "Sửa thành công !!!",
                icon: "success",
            })
        }

        // console.log(payload)


    }

    const handDelete = async () => {
        const res = await dele("/QuanLyBanHang/DonHang/delete/" + parms.id, setIsLoading)
        if (res === true) {

            Swal.fire({
                title: "Thông báo !!!",
                text: "Xóa thành công !!!",
                icon: "success",
            })
            navigate(-1)
        }
    }


    const handleClickOpen = () => {
        setOpenDialogEmail(true);
    };

    const handleClose = () => {
        setOpenDialogEmail(false);
    };

    const Title = ({ trangThai }) => {
        switch (trangThai) {
            case 0:
                return (
                    <>
                        <ActionBar
                            title="Đơn hàng"
                            subtitle="Chi tiết đơn hàng"
                            totalLabel="Xác nhận"
                            color="primary"
                            buttons={[
                                {
                                    icon: <MailIcon />,
                                    label: "Gửi email",
                                    onClick: handleClickOpen
                                },
                                {
                                    icon: <EditIcon />,
                                    label: "Sửa",
                                    onClick: handlEdit
                                },
                                {
                                    icon: <DeleteIcon />,
                                    label: "Xóa",
                                    onClick: handDelete
                                },
                                {
                                    label: "Trả trước",
                                    onClick: async () => {
                                        {
                                            const res = await get(`/QuanLyBanHang/DonHang/taohoadon?donHangid=${parms.id}&createBy=${account.id}`, parm, setIsLoading)
                                            if (res) {
                                                navigate("/QuanLyBanHang/hoadonban/ThanhToan/" + res)
                                            }

                                            console.log(res)
                                        }
                                    }
                                },
                                {
                                    label: "Tiến hành",
                                    onClick: async () => {
                                        {
                                            if (!form.khachHangId) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa chọn khách hàng !",
                                                    icon: "error",
                                                });
                                                return;
                                            }

                                            if (!form.maDH) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa có mã đơn hàng !",
                                                    icon: "error",
                                                });
                                                return;
                                            }

                                            if (!form.phuongThucThanhToanId) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa chọn phương thức thanh toán !",
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

                                            if (!form.hetHan) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa chọn ngày hết hạn !",
                                                    icon: "error",
                                                });
                                                return;
                                            }

                                            const res = await put("/QuanLyBanHang/DonHang/updateState/" + parms.id + "/2", null, setIsLoading)
                                            if (res === true) {
                                                await getDonHang()

                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Đơn hàng đang tiến hành",
                                                    icon: "success"
                                                })

                                            }
                                        }
                                    }
                                }, {
                                    label: "Quay lại",
                                    onClick: async () => {
                                        {
                                            navigate("/QuanLyBanHang/DonHang")
                                        }
                                    }
                                }
                            ]}
                        />

                    </>
                )

            case 2:
                return (
                    <>
                        <ActionBar
                            title="Đơn hàng"
                            subtitle="Chi tiết đơn hàng"
                            totalLabel="Chuẩn bị"
                            color="warring"
                            buttons={[
                                {
                                    icon: <MailIcon />,
                                    label: "Gửi email",
                                    onClick: handleClickOpen
                                },
                                {
                                    label: "Bổ sung",
                                    onClick: () => { console.log("Hello word") }
                                }
                                ,
                                {
                                    label: "Giao hàng",
                                    onClick: async () => {
                                        {
                                            if (!form.khachHangId) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa chọn khách hàng !",
                                                    icon: "error",
                                                });
                                                return;
                                            }

                                            if (!form.maDH) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa có mã đơn hàng !",
                                                    icon: "error",
                                                });
                                                return;
                                            }

                                            if (!form.phuongThucThanhToanId) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa chọn phương thức thanh toán !",
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

                                            if (!form.hetHan) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa chọn ngày hết hạn !",
                                                    icon: "error",
                                                });
                                                return;
                                            }

                                            const res = await put("/QuanLyBanHang/DonHang/updateState/" + parms.id + "/4", null, setIsLoading)
                                            if (res === true) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Đơn hàng đang giao",
                                                    icon: "success"
                                                })

                                                await getDonHang()
                                            }
                                        }
                                    }
                                }
                            ]}

                        />
                    </>
                )
            case 4:
                return (
                    <>
                        <ActionBar
                            title="Đơn hàng"
                            subtitle="Chi tiết đơn hàng"
                            totalLabel="Giao hàng"
                            color="warring"
                            buttons={[
                                {
                                    icon: <MailIcon />,
                                    label: "Gửi email",
                                    onClick: handleClickOpen
                                },
                                {
                                    label: "Hoàn đơn",
                                    onClick: () => {
                                        console.log("Trả hàng")
                                    }
                                },
                                {
                                    label: "Thanh Toán",
                                    onClick: async () => {
                                        {

                                            const res = await get(`/QuanLyBanHang/DonHang/thanhtoan?donHangid=${parms.id}&createBy=${account.id}`, parm, setIsLoading)
                                            if (res) {
                                                navigate("/QuanLyBanHang/hoadonban/ThanhToan/" + res)
                                            }

                                            console.log(res)
                                        }
                                    }
                                },
                                {
                                    label: "Hoàn tất",
                                    onClick: async () => {
                                        {
                                            if (!form.khachHangId) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa chọn khách hàng !",
                                                    icon: "error",
                                                });
                                                return;
                                            }

                                            if (!form.maDH) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa có mã đơn hàng !",
                                                    icon: "error",
                                                });
                                                return;
                                            }

                                            if (!form.phuongThucThanhToanId) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa chọn phương thức thanh toán !",
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

                                            if (!form.hetHan) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa chọn ngày hết hạn !",
                                                    icon: "error",
                                                });
                                                return;
                                            }
                                            const res = await put("/QuanLyBanHang/DonHang/updateState/" + parms.id + "/6", null, setIsLoading)
                                            if (res === true) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Đơn hoàn tất",
                                                    icon: "success"
                                                })

                                                await getDonHang()
                                            }
                                        }
                                    }
                                }
                            ]}

                        />
                    </>
                )
            case 6:
                return (
                    <>
                        <ActionBar
                            title="Đơn hàng"
                            subtitle="Chi tiết đơn hàng"
                            totalLabel="Hoàn tất"
                            color="warring"
                            buttons={[
                                {
                                    icon: <MailIcon />,
                                    label: "Gửi email",
                                    onClick: handleClickOpen
                                },
                            ]}

                        />
                    </>
                )
            default:
                return (
                    <>
                        <ActionBar
                            title="Đơn hàng"
                            subtitle="Chi tiết đơn hàng"
                            totalLabel="Không xác định"
                            color="gray"
                            buttons={[
                                {
                                    icon: <MailIcon />,
                                    label: "Gửi email",
                                    onClick: sendEmail
                                },
                                {
                                    icon: <EditIcon />,
                                    label: "Sửa",
                                    onClick: handlEdit
                                },
                                {
                                    icon: <DeleteIcon />,
                                    label: "Xóa",
                                    onClick: handDelete
                                },
                                {
                                    icon: <ReceiptLongIcon />,
                                    label: "Hóa đơn",
                                    onClick: () => {
                                        navigate("/QuanLyBanHang/hoadonban/add/" + form.id)
                                    }
                                },
                                {
                                    icon: <LocalShippingIcon />,
                                    label: "Lập phiếu",
                                    onClick: () => {
                                        navigate("/QuanLyBanHang/hoadonban/add/" + form.id)
                                    }
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
                isShowAvatar
                prev={prev}
            />

            <div style={{ width: "100%", overflowX: "auto" }}>
                <LinesTable
                    headTable={headTable}
                    bodyTable={bodyTable}
                    initialRows={rows}
                    title="Bảng chi tiết đơn hàng"
                    subtitle="Quản lý danh sách hàng hóa, giá bán, thuế."
                    onRowsChange={handleRowsChange}
                    taxt={form.thue}
                    isShowSumary={true}
                />
            </div>

            <FullScreenDialog
                setOpen={setOpenDialog}
                open={openDialog}
                title={`Chi tiết phương thức thanh toán`}
                main={
                    <>
                        {/* <DataTable columns={columm} rows={Array.isArray(lstPhuongThuc) ? lstPhuongThuc : []} />
                            <Loading open={isLoading} /> */}
                        <PhuongThucView />
                    </>
                }
            />

            <Dialog
                open={openDialogEmail}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Gửi email cho khách hàng"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <TextField
                            id="standard-suffix-shrink"
                            label="Email"
                            variant="standard"
                            onChange={e => setEmail(e.target.value)}
                            slotProps={{
                                htmlInput: {
                                    sx: { textAlign: 'right' },
                                },
                                input: {
                                    endAdornment: (
                                        <InputAdornment
                                            position="end"
                                            sx={{
                                                alignSelf: 'flex-end',
                                                margin: 0,
                                                marginBottom: '5px',
                                                opacity: 0,
                                                pointerEvents: 'none',
                                                [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                                                    opacity: 1,
                                                },
                                            }}
                                        >

                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={sendEmail}>Gửi email</Button>
                    <Button onClick={handleClose} >
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>

            <Loading open={isLoading} />
        </>
    );
};

export default ViewDonHang;
