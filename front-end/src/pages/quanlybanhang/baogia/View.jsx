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
import CustomizedSnackbars from "../../../compoments/ui/ThongBao";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, inputBaseClasses, TextField } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import MailIcon from '@mui/icons-material/Mail';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Swal from "sweetalert2";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ApprovalIcon from '@mui/icons-material/Approval';
import { generateRowId } from "../../../queries/common/Uitit";

const ViewDonHang = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [lstKhachHang, setLstKhachHang] = useState([]);
    const [lstSanPham, setLstSanPham] = useState([]);
    const [lstPhuongThuc, setLstPhuongThuc] = useState([]);
    const [lstDVTinh, setLstDVTinh] = useState([])

    const [email, setEmail] = useState("")

    const [openDialog, setOpenDialog] = useState(false);
    const [openThongBao, setOpenThongBao] = useState(false)

    const navigate = useNavigate()

    const [prev, setPrev] = useState("")

    const [form, setForm] = useState({
        maDH: createTimeId("DH"),
        khachHangId: 0,
        phuongThucThanhToanId: 0,
        hetHan: null,
        hieuLuc: null,
        ngayDatHang: null,
        ngayGiaoHang: null,
        trangThai: 0,
        thue: 0,
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

    const getDonHang = async () => {
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

                setPrev(data.hinhAnhKhach)

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
        getDonHang()
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
        },

        {
            type: "date",
            field: "hetHan",
            label: "Ngày hết hạn",
            placeholder: "Ngày hết hạn",
        },
        {
            type: "text",
            field: "tenNhanSu",
            label: "Người tạo",
            disabled: true
        }
    ];

    // ============== TABLE CONFIG ==============
    // ✅ 1) Chuẩn hoá width để head/body luôn khớp nhau
    const COL = {
        SAN_PHAM: 220,
        DON_GIA: 120,
        SO_LUONG: 110,
        DVT: 120,
        THUE: 90,
        TRUOC_THUE: 140,
        THANH_TIEN: 140,
    };
    const headTable = [
        { field: "sanPhamId", label: "Sản phẩm", width: 180, align: "left" },
        { field: "donGia", label: "Đơn giá", width: 150, align: "left" },
        {
            field: "soLuongHang",
            label: "Số lượng hàng",
            width: 150,
            align: "left",
        },
        // {
        //     field: "dVTinhId",
        //     label: "Đơn vị tính",
        //     width: 150,
        //     align: "left",
        // },
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


    const handleRowsChange = (newRows) => {
        setRows(newRows);
        console.log("Rows mới: ", newRows);
    };

    const sendEmail = async () => {
        setOpenDialog(false)
        const res = await get(`/QuanLyBanHang/DonHang/GuiEmail?email=${encodeURIComponent(email)}&id=${encodeURIComponent(parms.id)}`, null, setIsLoading)


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
        console.log(res)
        if (res === true) {
            getDonHang()
            Swal.fire({
                title: "Thông báo !!!",
                text: "Sửa thành công !!!",
                icon: "success",
            })
        }


        console.log(payload)
    }

    const handDelete = async () => {
        const res = await dele("/QuanLyBanHang/DonHang/delete/" + parms.id, setIsLoading)
        console.log(res)
        if (res === true) {

            Swal.fire({
                title: "Thông báo !!!",
                text: "Xóa thành công !!!",
                icon: "success",
            })
            navigate(-1)
        }
    }


    const chuyendoi = async () => {
        const res = await put(`/QuanLyBanHang/DonHang/updateState/${parms.id}/${2}`, null, setIsLoading);
        if (res === true) {
            await getDonHang();
            Swal.fire({
                title: "Thông báo !",
                text: "Chuyển đổi thành công !!!",
                icon: "success"
            })

        }

    }


    const doibaogiasangdonhang = async () => {
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
                text: "Chưa có mã báo giá !",
                icon: "error",
            });
            return;
        }

        if (!form.hieuLuc) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Chưa chọn ngày hiệu lực !",
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

        // optional: check ngày hết hạn phải >= ngày hiệu lực
        if (new Date(form.hetHan) < new Date(form.hieuLuc)) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Ngày hết hạn phải lớn hơn hoặc bằng ngày hiệu lực !",
                icon: "error",
            });
            return;
        }

        const res = await get(`/QuanLyBanHang/DonHang/chuyenbaogiathanhdonhang/${parms.id}`, null, setIsLoading)

        if (res === true) {

            Swal.fire({
                title: "Thông báo !",
                text: "Đổi báo giá thành đơn hàng thành công!!!",
                icon: "success"
            })
            navigate("/Quanlybanhang/donhang/info/" + parms.id)
            return;
        }

        Swal.fire({
            title: "Thông báo !!!",
            text: "Không thể chuyển thành báo giá !!!",
            icon: "error"
        })

        console.log(res)
    }

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const Title = ({ trangThai }) => {
        console.log(trangThai)
        switch (trangThai) {
            case 0:
                return (
                    <>
                        <ActionBar
                            title="Báo giá"
                            subtitle="Chi tiết báo giá"
                            totalLabel="Báo giá"
                            color="primary"
                            buttons={[
                                {
                                    icon: <ShoppingCartCheckoutIcon />,
                                    label: "Chuyển thành đơn hàng",
                                    onClick: async () => {
                                        {
                                            const res = await get("/QuanLyBanHang/DonHang/chuyenbaogiathanhdonhang/" + parms.id, null, setIsLoading)
                                            if (res === true) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chuyển báo giá thành đơn hàng thành công !!!",
                                                    icon: "success"
                                                })

                                                navigate("/QuanLyBanHang/DonHang/info/" + parms.id)
                                            }
                                        }
                                    }

                                },
                                // {
                                //     icon: <ApprovalIcon />,
                                //     label: "Đồng ý",
                                //     onClick: chuyendoi
                                // },
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
                                }, {
                                    label: "Quay lại",
                                    onClick: () => {
                                        navigate("/QuanLyBanHang/BaoGia")
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
                            title="Báo giá"
                            subtitle="Chi tiết đơn hàng"
                            totalLabel="Đã gửi"
                            color="primary"
                            buttons={[
                                {
                                    icon: <ShoppingCartCheckoutIcon />,
                                    label: "Chuyển thành đơn hàng",
                                    onClick: async () => {
                                        {
                                            const res = await get("/QuanLyBanHang/DonHang/chuyenbaogiathanhdonhang/" + parms.id, null, setIsLoading)
                                            if (res === true) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chuyển báo giá thành đơn hàng thành công !!!",
                                                    icon: "success"
                                                })

                                                navigate("/QuanLyBanHang/DonHang/info/" + parms.id)
                                            }
                                        }
                                    }

                                },
                                // {
                                //     icon: <ApprovalIcon />,
                                //     label: "Đồng ý",
                                //     onClick: chuyendoi
                                // },
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
                                }, {
                                    label: "Quay lại",
                                    onClick: () => {
                                        navigate("/QuanLyBanHang/BaoGia")
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
                            title="Báo giá"
                            subtitle="Chi tiết báo giá"
                            totalLabel="Đồng ý"
                            color="blue"
                            buttons={[
                                {
                                    icon: <ShoppingCartCheckoutIcon />,
                                    label: "Chuyển thành đơn hàng",
                                    onClick: doibaogiasangdonhang
                                },
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
                                }, {
                                    label: "Quay lại",
                                    onClick: () => {
                                        navigate("/QuanLyBanHang/BaoGia")
                                    }
                                }
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




            <Dialog
                open={openDialog}
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
