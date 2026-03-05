import { useEffect, useState } from "react"
import { Form } from "../../../compoments/ui/FormInput"
import { get, post } from "../../../queries/apis/AxiosNghiepVu"
import Loading from "../../../compoments/ui/Loading"
import LinesTable from "../../../compoments/ui/LinesTable"
import { formatCurrency } from "../../../queries/common/FormatString"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const CreateSanPham = () => {

    const navigate = useNavigate();
    const account = JSON.parse(localStorage.getItem("Account"))
    const [loading, setLoading] = useState(false)
    const [lstVatTu, setVatTu] = useState([])
    const [lstDVTinh, setDVTinh] = useState([])
    const [rows, setRows] = useState([])
    const getDVTinh = async () => {
        const res = await get("/QuanLyBanHang/api/DonViTinh", null, setLoading)
        if (res.data && Array.isArray(res.data)) {
            const c = (res.data || []).map(item => ({
                opt: item.tenDVi,
                value: item.id
            }))

            setDVTinh(c);
        }
    }
    const [formData, setFormData] = useState({
        tenSP: "",
        giaGocSP: 0,
        loiNhuan: 0,
        moTa: "",
        trangThai: 1,
        luongTonToiThieu: 0,
        thue: 0,
        hinhAnh: null,
        dVTinhId: 0,
        hanSanXuat: 0,
        hinhAnh:"",
        createBy: account.id,
        updateBy: account.id
    })

    const fliedModule = [
        {
            type: "input",
            label: "Tên sản phẩm",
            placeholder: "Tên sản phẩm",
            value: formData.tenSanPham,
            field: "tenSP"
        },
        {
            type: "number",
            label: "Giá gốc sản phẩm",
            placeholder: "Giá gốc sản phẩm",
            value: formData.giaGocSP,
            field: "giaGocSP"
        },
        {
            type: "number",
            label: "Lợi nhuận",
            placeholder: "Lợi nhuận",
            value: formData.loiNhuan,
            field: "loiNhuan"
        },
        {
            type: "select",
            label: "Đơn vị tính",
            value: formData.dVTinhId,
            field: "dVTinhId",
            options: lstDVTinh
        }
        , {
            type: "number",
            label: "Hạn sử dụng",
            value: formData.hanSanXuat,
            field: "hanSanXuat",
        }
        ,
        {
            type: "text",
            label: "Mô tả",
            placeholder: "Mô tả",
            value: formData.moTa,
            field: "moTa"
        }
    ]



    const headTable = [
        { field: "vatTuId", label: "Vật tư", width: 180, align: "left" },
        { field: "soLuongCan", label: "Số lượng cần", width: 150, align: "left" },
        { field: "giaVatTu", label: "Giá vật tư", width: 150, align: "left" },
        { field: "thanhTien", label: "Thành tiền", width: 150, align: "left" },
    ];

    const parm = {

    }
    const getVattu = async () => {
        const data = await get("/QuanLyKho/Vattu", parm, setLoading)
        console.log(data)
        if (data && Array.isArray(data.data)) {
            setLoading(true)
            const dulieu = data.data.map((item, index) => ({
                value: item.id,
                opt: item.tenVatTu,
                giaVatTu: item.giaBan
            }));

            setVatTu(dulieu);
            setLoading(false)
        }
    }

    useEffect(() => {
        getVattu()
        getDVTinh()
    }, [])
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
                const giaVatTu = Number(sp.giaVatTu ?? 0);
                const soLuongCan = Number(row.soLuongCan ?? 0)
                const thanhTien = giaVatTu * soLuongCan
                setFormData(prev => ({
                    ...prev,
                    giaGocSP: formData.giaGocSP + thanhTien
                }))


                return {
                    ...row,
                    giaVatTu,
                    soLuongCan,
                    thanhTien,
                    thanhTienText: formatCurrency(thanhTien)
                };
            },
        },
        {
            field: "soLuongCan",
            type: "number",
            width: 150,
            align: "left",
            onChangeRow: (row, value) => {
                const soLuongCan = Number(value ?? 0);
                const giaVatTu = Number(row.giaVatTu ?? 0);
                const thanhTien = giaVatTu * soLuongCan;

                return {
                    ...row,
                    soLuongCan,
                    giaVatTu,
                    thanhTien,
                    thanhTienText: formatCurrency(thanhTien)
                }

            }
        },
        {
            field: "giaVatTu",
            type: "textBox",
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

    const handleSubmit = async () => {
        const payload = {
            ...formData,
            vatTuCanDungs: rows.map((r) => ({
                vatTuId: r.vatTuId,
                soLuongCan: r.soLuongCan
            })),
        };
        const res = await post("/quanlykho/sanpham/add", payload, setLoading)
        if (res === true) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Tạo thành công !!!",
                icon: "success"
            })
            navigate("/QuanLyKho/SanPham")
        }
        console.log(res)
    }

    return (
        <>
            <Form
                title="Tạo mới"
                subTitle="Sản phẩm"
                onCreate={handleSubmit}
                showAvatar={true}
                setForm={setFormData}
                labelInput={fliedModule}
                element={<LinesTable
                    headTable={headTable}
                    bodyTable={bodyTable}
                    initialRows={rows}
                    title="Bảng chi tiết vật tư sử dụng"
                    subtitle="Quản lý danh sách vật tư."
                    onRowsChange={handleRowsChange}
                />}
            />

            <Loading open={loading} />
        </>
    )
}

export default CreateSanPham