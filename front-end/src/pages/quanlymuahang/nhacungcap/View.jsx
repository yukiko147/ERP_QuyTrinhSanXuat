import { useEffect, useState } from "react"
import { Form } from "../../../compoments/ui/FormInput"
import { dele, get, post, put } from "../../../queries/apis/AxiosNghiepVu"
import Loading from "../../../compoments/ui/Loading"
import Swal from "sweetalert2"
import { useNavigate, useParams } from "react-router-dom"

const ViewNhaCungCap = () => {

    const account = JSON.parse(localStorage.getItem("Account"))
    const parms = useParams()
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

    const getNhaCungCap = async () => {
        const res = await get("/QuanLyMuaHang/NhaCungCap/" + parms.id, null, setLoading)
        if (res) {
            setFormData(prev => ({
                ...prev,
                tenNCC: res.tenNCC,
                diaChi: res.diaChi,
                email: res.email,
                sdt: res.sdt,
                maSoThue: res.maSoThue
            }))
        }
    }

    useEffect(() => {
        getNhaCungCap()
    }, [])
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
        if (formData.maSoThue === "")
            return;

        if (formData.tenNCC === "")
            return;

        const res = await put("/quanlymuahang/nhacungcap/update/" + parms.id, formData, setLoading)

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
                onEdit={handleSubmit}
                onDelete={async () => {
                    {
                        const res = await dele("/QuanLyMuaHang/NhaCungCap/Delete/" + parms.id, setLoading)
                        if (res === true) {
                            Swal.fire({
                                title: "Thông báo !!!",
                                text: "Xóa thành công !!!",
                                icon: "success"
                            })

                            navigate("/QuanLyMuaHang/NhaCungCap")
                        }
                    }
                }}
                showAvatar={false}
                setForm={setFormData}
                labelInput={fliedModule}
            />
            <Loading open={loading} />
        </>
    )
}

export default ViewNhaCungCap