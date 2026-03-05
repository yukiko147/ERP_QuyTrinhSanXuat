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
import Swal from "sweetalert2";
import { plugin } from "postcss";

const CreateLenhSanXuat = () => {
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

    useEffect(() => {

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
        },


    ];

    // ============== TABLE CONFIG ==============
    const headTable = [
        { field: "vatTuId", label: "VatTu", width: 180, align: "left" },

        { field: "soLuongCan", label: "Số lượng cần", width: 150, align: "left" },

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
        }
    ];

    const handleRowsChange = (newRows) => {
        setRows(newRows);
        console.log("Rows mới: ", newRows);
    };

    // ============== CREATE HANDLER ==============
    const onCreate = async () => {
        // Validate tối thiểu
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



        const payload = {
            ...form,
            chiTietCheTaos: rows.map((r) => ({
                vatTuId: r.vatTuId,
                giaBan: Number(r.giaBan ?? 0),
                soLuongCan: Number(r.soLuongCan ?? 0),
                thanhTien: Number(r.thanhTien ?? 0),
            })),
        };

        const res = await post(`/QuanLySanXuat/LenhSanXuat/add`, payload, setIsLoading)
        if (res === true) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Tạo lệnh thành công !!!",
                icon: "success",
            })

            navigate(-1)
        }
    };

    return (
        <>
            <ActionBar
                title="Lệnh sản xuất"
                subtitle="Tạo lệnh"
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

export default CreateLenhSanXuat;
