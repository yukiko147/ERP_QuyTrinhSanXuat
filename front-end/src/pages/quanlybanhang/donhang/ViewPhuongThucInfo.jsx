import { useEffect, useState } from "react"
import { Form } from "../../../compoments/ui/FormInput"
import Loading from "../../../compoments/ui/Loading"
import { dele, get, post } from "../../../queries/apis/AxiosNghiepVu"
import { useNavigate, useParams } from "react-router-dom"

const ViewPhuongThucInfo = () => {

    const account = JSON.parse(localStorage.getItem("Account"))
    const parms = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        tenDieuKhoan: "",
        soPhanTramTraTruoc: 0,
        soKyTra: 0,
        tienTraMoiKy: 0,
        createBy: account.id,
        updateBy: account.id
    })

    const [res, setRes] = useState({})
    const [isloading, setIsLoading] = useState(false)
    const fliedModule = [
        {
            type: "input",
            label: "Tên điều khoản",
            placeholder: "Tên điều khoản",
            value: formData.tenDieuKhoan,
            field: "tenDieuKhoan"
        },
        {
            type: "number",
            label: "Số phần trăm trả trước",
            placeholder: "Số phần trăm trả trước",
            value: formData.soPhanTramTraTruoc,
            field: "soPhanTramTraTruoc"
        },
        {
            type: "number",
            label: "Số kỳ trả",
            placeholder: "Số kỳ trả",
            value: formData.soKyTra,
            field: "soKyTra"
        },
        {
            type: "number",
            label: "Tiền trả mỗi kỳ",
            placeholder: "Tiền trả mỗi kỳ",
            value: formData.tienTraMoiKy,
            field: "tienTraMoiKy"
        }
    ]

    const fethAPI = async () => {
        const res = await get(`/quanlybanhang/phuongthucthanhtoan/${parms.id}`, null, setIsLoading)
        console.log(res)
        setFormData(prev => ({
            ...prev,
            tenDieuKhoan: res.tenDieuKhoan,
            soPhanTramTraTruoc: res.soPhanTramTraTruoc,
            soKyTra: res.hanThanhToan,
            tienTraMoiKy: res.tienTraMoiKy,
        }))
    }

    useEffect(() => {
        fethAPI()
    }, [])


    const handleEdit = async () => {
        const res = await post("/QuanLyBanHang/PhuongThucThanhToan/update/" + parms.id, formData, setIsLoading)
        alert("sửa thành công")
        console.log(res)
    }

    const handleDelete = async () => {
        const res = await dele("/QuanLyBanHang/PhuongThucThanhToan/delete/" + parms.id, setIsLoading)
        alert("xóa thành công")
        console.log(res)
    }


    return (
        <>
            <Form
                title="Tạo mới"
                subTitle="Phương thức thanh toán"
                onEdit={handleEdit}
                setForm={setFormData}
                onDelete={handleDelete}
                labelInput={fliedModule}
                onBack={() => { navigate(-1) }}

            />
            <Loading open={isloading} />
        </>
    )
}

export default ViewPhuongThucInfo