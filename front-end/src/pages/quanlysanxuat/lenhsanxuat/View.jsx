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


import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from "sweetalert2";
import { plugin } from "postcss";
import { generateRowId } from "../../../queries/common/Uitit";

const trangThaiSwtich = (trangThai) => {
    switch (trangThai) {
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

const ViewLenhSanXuat = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [lstSanPham, setLstSanPham] = useState([]);
    const [lstVatTu, setLstVatTu] = useState([])
    const [lstKhoChua, setLstKhoChua] = useState([])
    const parms = useParams()
    const account = JSON.parse(localStorage.getItem("Account"))


    const navigate = useNavigate()
    const [form, setForm] = useState({
        maLenhSX: createTimeId("BG"),
        soLuongSX: 1,
        trangThaiLenh: 0,
        sanPhamId: 0,
        khoChuaId: null,
        donHangId: null,
        chiTietChetTaos: [],
        createBy: account.id,
        updateBy: account.id
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

    const getVatTu = async () => {
        try {
            setIsLoading(true);
            const data = await get("/QuanLyKho/VatTu", parm, setIsLoading);

            if (data && Array.isArray(data.data)) {
                const dulieu = data.data.map((item) => ({
                    value: item.id,
                    opt: item.tenVatTu,
                    giaBan: item.giaBan,
                }));

                setLstVatTu(dulieu);

            }
        } catch (error) {
            console.error("Lỗi load sản phẩm:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getKhoChua = async () => {
        const data = await get("/QuanLyKho/kho", parm, setIsLoading)
        console.log(data)
        if (data && Array.isArray(data.data)) {
            setIsLoading(true)
            const dulieu = data.data.map((item, index) => ({
                value: item.id,
                opt: item.tenKho,
            }));

            setLstKhoChua(dulieu);

        }
        setIsLoading(false)
    };

    const getLenhSanXuat = async () => {
        const res = await get("/QuanLySanXuat/LenhSanXuat/" + parms.id, null, setIsLoading);
        console.log(res)
        if (res) {
            setForm(prev => ({
                ...prev,
                id: res.id,
                maLenhSX: res.maLenhSX,
                soLuongSX: res.soLuongSX,
                trangThaiLenh: res.trangThaiLenh,
                sanPhamId: res.sanPhamId,
                khoChuaId: res.khoChuaId,
                donHangId: res.donHangId,
                chiTietChetTaos: [],
            }))

            const data = (res.chiTietCheTao || []).map(item => ({
                id: generateRowId(),

                vatTuId: item.vatTuId,
                soLuongCan: item.soLuongCan,
                trangThai: trangThaiSwtich(item.trangThai),
                trangThaiInt: item.trangThai,
                kiemTra: <button
                    type="button"
                    onClick={async () => {
                        {
                            const res = await get(`/QuanLySanXuat/LenhSanXuat/KiemTraVatTu/${parms.id}/${item.vatTuId}`, null, setIsLoading)
                            console.log(res)
                            if (res === true) {
                                Swal.fire({
                                    title: "Thông báo !!!",
                                    text: "Kiểm tra thành công !!!",
                                    icon: "success"
                                })

                                await getLenhSanXuat()

                            }
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
                </button>,
                boSung: <button
                    type="button"
                    onClick={async () => {
                        {
                            const payload = {
                                vatTuId: item.vatTuId,
                                soLuongCan: item.soLuongCan,
                                lenhSanXuatId: parms.id
                            }
                            console.log(payload)
                            const res = await post(`/QuanLySanXuat/LenhSanXuat/bosung`, payload, setIsLoading)
                            console.log(res)
                            if (res) {
                                Swal.fire({
                                    title: "Thông báo !!!",
                                    text: res,
                                    icon: "success"
                                })

                                await getLenhSanXuat()

                            }
                        }
                    }}
                    className="
                        inline-flex items-center justify-center
  rounded-md px-3 py-1.5 text-xs font-semibold
  bg-amber-400 text-slate-900
  border border-amber-500
  shadow-sm
  hover:bg-amber-300 hover:border-amber-400
  active:scale-[0.97]
  disabled:opacity-60 disabled:cursor-not-allowed
  transition
                    "
                >
                    <svg
                        className="mr-1 h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 7h3v2h-3v3H9v-3H6V9h3V6h2v3z" />
                    </svg>
                    Bổ sung
                </button>

            }))

            console.log(data)
            setRows(data)
        }
    }

    useEffect(() => {
        getLenhSanXuat()
        getSanPham();
        getVatTu();
        getKhoChua()

    }, []);

    // ============== FORM HEADER CONFIG ==============
    const headerForm = [
        {
            type: "select",
            field: "sanPhamId",
            label: "Tên sản phẩm",
            placeholder: "Chọn sản phẩm",
            options: lstSanPham,
            onChangeRows: async (e) => {
                {
                    const res = await get(`/QuanLyKho/SanPham/${e.target.value}`, null, setIsLoading)

                    if (res) {
                        const custom = (res.vatTuCanDungs || []).map(item => ({
                            vatTuId: item.vatTuId,
                            soLuongCan: item.soLuongCan,
                            giaBan: item.giaBan,
                            thanhTienText: formatCurrency(item.thanhTien)
                        }))
                        console.log(res)
                        setRows(custom)
                    }
                }
            }
        },
        {
            type: "select",
            field: "khoChuaId",
            placeholder: "Chọn kho",
            label: "Chọn kho chứa",
            options: lstKhoChua
        },
        {
            type: "text",
            field: "maLenhSX",
            label: "Mã lệnh sản xuất",
            placeholder: "Mã lệnh sản xuất",
            disabled: true,
        }, {
            type: "number",
            field: "soLuongSX",
            label: "Số lượng sản xuất",
            placeholder: "Số lượng sản xuất",
            disabled: form.trangThaiLenh === 0 ? false : true
        }


    ];

    // ============== TABLE CONFIG ==============
    const headTable = [
        { field: "vatTuId", label: "VatTu", width: 180, align: "left" },
        { field: "soLuongCan", label: "Số lượng cần", width: 150, align: "left" },
        { field: "trangThai", label: "Trạng thái", width: 150, align: "left" },
        { field: "kiemTra", label: "", width: 150, align: "left" },
        { field: "boSung", label: "", width: 150, align: "left" }

    ];

    const bodyTable = [
        {
            field: "vatTuId",
            type: "select",
            width: 220,
            options: lstVatTu,
            defaultValue: "",
            onChangeRow: (row, value) => {
                const vt = lstVatTu.find((x) => x.value === value);
                if (!vt) return row;
                const giaBan = Number(vt.giaBan)
                const thanhTien = Number(giaBan * vt.soLuongCan)
                const thanhTienText = formatCurrency(thanhTien)
                return {
                    ...row,
                    vatTuId: value,
                    giaBan,
                    thanhTien,
                    thanhTienText
                }
            },
            disabled: true
        },
        {
            field: "soLuongCan",
            disabled: true,
            type: "number",
            width: 150,
            align: "left",
            defaultValue: 0,
            onChangeRow: (row, value) => {
                const soLuongCan = Number(value ?? 0)
                const giaBan = Number(row.giaBan ?? 0)
                const thanhTien = soLuongCan * giaBan
                return {
                    ...row,
                    soLuongCan,
                    giaBan,
                    thanhTien,
                    thanhTienText: formatCurrency(thanhTien)
                }
            },
        },
        {
            field: "trangThai",
            type: "textBox",
            width: 150,
        }
        ,
        {
            field: "kiemTra",
            type: "textBox",
            width: 150,
            align: "center"
        },
        {
            field: "boSung",
            type: "textBox",
            width: 150,
            align: "center"

        }
    ];

    const handleRowsChange = (newRows) => {
        setRows(newRows);
        console.log("Rows mới: ", newRows);
    };

    // ============== CREATE HANDLER ==============
    const onEdit = async () => {
        // Validate tối thiểu
        if (!form.sanPhamId) {
            return;
        }

        if (!form.khoChuaId) {
            return;
        }


        const payload = {
            ...form,
            chiTietCheTaos: rows.map((r) => ({
                vatTuId: r.vatTuId,
                giaBan: Number(r.giaBan ?? 0),
                soLuongCan: Number(r.soLuongCan ?? 0),
                thanhTien: Number(r.thanhTien ?? 0),
                trangThai: r.trangThaiInt,
            })),
        };

        const res = await put(`/QuanLySanXuat/LenhSanXuat/update/${form.id}`, payload, setIsLoading)
        if (res === true) {
            await getLenhSanXuat()
            Swal.fire({
                title: "Thông báo !!!",
                text: "Cập nhật thành công !!!",
                icon: "success",
            })


        }
    };


    const Title = ({ trangThai }) => {
        switch (trangThai) {
            case 0:
                return (
                    <>
                        <ActionBar
                            title="Lệnh sản xuất"
                            subtitle="Thao tác lệnh"
                            totalLabel="Đang chờ"
                            color="primary"

                            buttons={[
                                {
                                    label: "Quay lại",
                                    onClick: () => {
                                        navigate(-1)
                                    },
                                    icon: <ArrowBackIcon />
                                }, {
                                    label: "Cập nhật",
                                    // onClick: onEdit,

                                }, {
                                    label: "Xóa",
                                    onClick: async () => {
                                        {
                                            const res = await dele("/QuanLySanXuat/LenhSanXuat/Delete/" + parms.id, setIsLoading);
                                            if (res === true) {
                                                Swal.fire({
                                                    Title: "Thông báo !!!",
                                                    text: "Xóa thành công !!!",
                                                    icon: "success"
                                                })
                                                navigate("/QuanLySanXuat/LenhsanXuat")
                                            }
                                        }
                                    },

                                },
                                {
                                    label: "Tiến hành",
                                    onClick: async () => {
                                        {
                                            if (!form.sanPhamId) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa chọn sản phẩm !",
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

                                            if (!form.maLenhSX) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Chưa có mã lệnh sản xuất !",
                                                    icon: "error",
                                                });
                                                return;
                                            }

                                            const res = await put(`/QuanLySanXuat/LenhSanXuat/State/${parms.id}/2`, null, setIsLoading)
                                            if (res === true) {
                                                Swal.fire({
                                                    title: "Thông báo !!!",
                                                    text: "Tiến hành sản xuất !!!",
                                                    icon: "success"
                                                })
                                                await getLenhSanXuat()

                                            }
                                        }
                                    },

                                }
                            ]}
                        />

                    </>
                )
            case 1:
                return (
                    <ActionBar
                        title="Lệnh sản xuất"
                        subtitle="Thao tác lệnh"
                        totalLabel="Sẵn sàng"
                        color="primary"

                        buttons={[
                            {
                                label: "Quay lại",
                                onClick: () => {
                                    navigate(-1)
                                },
                                icon: <ArrowBackIcon />
                            },
                            //  {
                            //     label: "Cập nhật",
                            //     onClick: onEdit,

                            // }, 
                            // {
                            //     label: "Xóa",
                            //     onClick: async () => {
                            //         {
                            //             const res = await dele("/QuanLySanXuat/LenhSanXuat/Delete/" + parms.id, setIsLoading);
                            //             if (res === true) {
                            //                 Swal.fire({
                            //                     Title: "Thông báo !!!",
                            //                     text: "Xóa thành công !!!",
                            //                     icon: "success"
                            //                 })
                            //                 navigate(-1)
                            //             }
                            //         }
                            //     },

                            // },
                            {
                                label: "Tiến hành",
                                onClick: async () => {
                                    {
                                        if (!form.sanPhamId) {
                                            Swal.fire({
                                                title: "Thông báo !!!",
                                                text: "Chưa chọn sản phẩm !",
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

                                        if (!form.maLenhSX) {
                                            Swal.fire({
                                                title: "Thông báo !!!",
                                                text: "Chưa có mã lệnh sản xuất !",
                                                icon: "error",
                                            });
                                            return;
                                        }

                                        const res = await put(`/QuanLySanXuat/LenhSanXuat/State/${parms.id}/2`, null, setIsLoading)
                                        if (res === true) {
                                            Swal.fire({
                                                title: "Thông báo !!!",
                                                text: "Tiến hành sản xuất !!!",
                                                icon: "success"
                                            })
                                            await getLenhSanXuat()

                                        }
                                    }
                                },

                            }
                        ]}
                    />
                )
            case 2:
                return (
                    <ActionBar
                        title="Lệnh sản xuất"
                        subtitle="Thao tác lệnh"
                        totalLabel="Tiến hành"
                        color="warring"

                        buttons={[
                            {
                                label: "Quay lại",
                                onClick: () => {
                                    navigate(-1)
                                },
                                icon: <ArrowBackIcon />
                            }, {
                                label: "Hoàn tất",
                                onClick: async () => {
                                    {
                                        if (!form.sanPhamId) {
                                            Swal.fire({
                                                title: "Thông báo !!!",
                                                text: "Chưa chọn sản phẩm !",
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

                                        if (!form.maLenhSX) {
                                            Swal.fire({
                                                title: "Thông báo !!!",
                                                text: "Chưa có mã lệnh sản xuất !",
                                                icon: "error",
                                            });
                                            return;
                                        }

                                        const res = await put(`/QuanLySanXuat/LenhSanXuat/State/${parms.id}/4`, null, setIsLoading)
                                        if (res === true) {
                                            Swal.fire({
                                                title: "Thông báo !!!",
                                                text: "Hoàn tất sản xuất !!!",
                                                icon: "success"
                                            })
                                            await getLenhSanXuat()

                                        }
                                    }
                                },

                            }
                        ]}
                    />
                )
            case 4:
                return (
                    <ActionBar
                        title="Lệnh sản xuất"
                        subtitle="Thao tác lệnh"
                        totalLabel="Hoàn tất"
                        color="succes"

                        buttons={[
                            {
                                label: "Quay lại",
                                onClick: () => {
                                    navigate(-1)
                                },
                                icon: <ArrowBackIcon />
                            },
                        ]}
                    />
                )
            default:
                return (
                    <ActionBar
                        title="Lệnh sản xuất"
                        subtitle="Thao tác lệnh"
                        totalLabel="Không xác định"
                        color="gray"
                    />
                )
        }
    }

    return (
        <>

            <Title trangThai={form.trangThaiLenh} />
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
                title="Bảng chi tiết vật tư"
                subtitle="Quản lý danh sách vật tư,số lượng."
                onRowsChange={handleRowsChange}
                taxt={form.thue}
                noShowButonAddLine={true}
            />

            <Loading open={isLoading} />
        </>
    );
};

export default ViewLenhSanXuat;
