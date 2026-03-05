import { useState } from "react"
import { Form } from "../../../compoments/ui/FormInput"
import Loading from "../../../compoments/ui/Loading"
import { post } from "../../../queries/apis/AxiosNghiepVu"
import { useNavigate } from "react-router-dom"

const CreatePhuongThuc = () => {

    const account = JSON.parse(localStorage.getItem("Account"))
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        tenDieuKhoan: "",
        soPhanTramTraTruoc: 0,
        hanThanhToan: 0,
        tienTraMoiKy: 0,
        createBy: account.id,
        updateBy: account.id
    })

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
            value: formData.hanThanhToan,
            field: "hanThanhToan"
        },
        {
            type: "number",
            label: "Tiền trả mỗi kỳ",
            placeholder: "Tiền trả mỗi kỳ",
            value: formData.tienTraMoiKy,
            field: "tienTraMoiKy"
        }
    ]

    const handleSubmit = async () => {
        const res = await post("/QuanLyBanHang/PhuongThucThanhToan/add", formData, setIsLoading)
        alert("tạo thành công")
        console.log(res)
    }


    return (
        <>
            <Form
                title="Tạo mới"
                subTitle="Phương thức thanh toán"
                onCreate={handleSubmit}
                setForm={setFormData}
                labelInput={fliedModule}
                onBack={() => { navigate(-1) }}
            />
            <Loading open={isloading} />
        </>
    )
}

export default CreatePhuongThuc