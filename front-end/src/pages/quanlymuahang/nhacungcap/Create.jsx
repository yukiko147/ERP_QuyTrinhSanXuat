import { useState } from "react"
import { Form } from "../../../compoments/ui/FormInput"
import { post } from "../../../queries/apis/AxiosNghiepVu"
import Loading from "../../../compoments/ui/Loading"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const CreateNhaCungCap = () => {

    const account = JSON.parse(localStorage.getItem("Account"))
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        tenNCC: "",
        diaChi: "",
        email: "",
        sdt: "",
        maSoThue: "",
        hinhAnh: null,
        createBy: account.id,
        updateBy: account.id
    })

    const fliedModule = [
        {
            type: "input",
            lable: "Tên nhà cung cấp",
            placeholder: "Tên nhà cung cấp",
            value: formData.tenNCC,
            field: "tenNCC"
        },
        {
            type: "text",
            lable: "Địa chỉ",
            placeholder: "địa chỉ",
            value: formData.diaChi,
            field: "diaChi"
        },
        {
            type: "email",
            lable: "Email",
            placeholder: "Email",
            value: formData.email,
            field: "email"
        },
        ,
        {
            type: "text",
            lable: "SĐT",
            placeholder: "SĐT",
            value: formData.sdt,
            field: "sdt"
        },
        ,
        {
            type: "text",
            lable: "Mã số thuế",
            placeholder: "Mã số thuế",
            value: formData.maSoThue,
            field: "maSoThue"
        }

    ]

    const handleSubmit = async () => {
        const res = await post("/quanlymuahang/nhacungcap/add", formData, setLoading)
        if (res === true) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Tạo thành công !!!",
                icon: "success"
            })
            navigate("/QuanLyMuaHang/NhaCungCap")
        }
    }

    return (
        <>
            <Form
                title="Tạo mới"
                subTitle="Nhà cung cấp"
                onCreate={handleSubmit}
                showAvatar={false}
                setForm={setFormData}
                labelInput={fliedModule}
            />
            <Loading open={loading} />
        </>
    )
}

export default CreateNhaCungCap