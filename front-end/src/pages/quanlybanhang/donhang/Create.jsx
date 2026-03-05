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

import { Button } from "@mui/material";
import Dialog from "../../../compoments/ui/Dialog";
import PhuongThucView from "./PhuongThucView";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from "sweetalert2";

const CreateDonHang = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [lstKhachHang, setLstKhachHang] = useState([]);
    const [lstSanPham, setLstSanPham] = useState([]);
    const [lstPhuongThuc, setLstPhuongThuc] = useState([]);
    const [lstKhoChua, setLstKhoChua] = useState([])
    const [lstDVTinh, setLstDVTinh] = useState([])


    const account = JSON.parse(localStorage.getItem("Account"))
    const [openDialog, setOpenDialog] = useState(false);

    const navigate = useNavigate()
    const [form, setForm] = useState({
        maDH: createTimeId("DH"),
        khachHangId: 0,
        phuongThucThanhToanId: 0,
        hetHan: null,
        hieuLuc: new Date(),
        ngayDatHang: null,
        ngayGiaoHang: null,
        thue: 0,
        createBy: account.id,
        updateBy: account.id,
        khoChuaId: 0,
        chiTietDonHangs: [],
    });

    const [rows, setRows] = useState([]);

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
            field: "hetHan",
            label: "Ngày hết hạn",
            placeholder: "Ngày hết hạn",
        },
    ];

    // ============== TABLE CONFIG ==============
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
            }
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

    const handleRowsChange = (newRows) => {
        setRows(newRows);
        console.log("Rows mới: ", newRows);
    };

    // ============== CREATE HANDLER ==============
    const onCreate = async () => {
        // Validate tối thiểu
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


        const payload = {
            ...form,
            chiTietDonHangs: rows.map((r) => ({
                sanPhamId: r.sanPhamId,
                donGia: Number(r.donGia ?? 0),
                soLuongHang: Number(r.soLuongHang ?? 0),
                thue: Number(r.thue ?? 0),
                thanhTien: Number(r.thanhTien ?? 0),
                dVTinhId: Number(r.dVTinhId ?? 0)
            })),
        };

        const res = await post("/QuanLyBanHang/donhang/add", payload, setIsLoading)
        if (res === true) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Tạo mới thành công !!!",
                icon: "success"
            })

            navigate(-1)
        }
    };

    return (
        <>
            <ActionBar
                title="Đơn hàng"
                subtitle="Tạo đơn hàng"
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
                isShowAvatar
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
            <Loading open={isLoading} />
        </>
    );
};

export default CreateDonHang;
