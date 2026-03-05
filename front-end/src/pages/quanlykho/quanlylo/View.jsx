import { useState } from "react"
import { Form } from "../../../compoments/ui/FormInput"
import Loading from "../../../compoments/ui/Loading"
import { dele, post } from "../../../queries/apis/AxiosNghiepVu"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"

const CreateDVTinh = () => {

    const account = JSON.parse(localStorage.getItem("Account"))

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        tenDVi: "",
        kyHieu: "",
        moTa: "",
        heSo: 0,
        createBy: account.id,
        updateBy: account.id
    })

    const parms = useParams()

    const [isloading, setIsLoading] = useState(false)
    const fliedModule = [
        {
            type: "input",
            label: "Tên đơn vị",
            placeholder: "Tên đơn vị",
            value: formData.tenDVi,
            field: "tenDVi"
        },
        {
            type: "input",
            label: "Ký hiệu",
            placeholder: "Ký hiệu",
            value: formData.kyHieu,
            field: "kyHieu"
        }, {
            type: "moTa",
            label: "Mô tả",
            placeholder: "Mô tả",
            value: formData.moTa,
            field: "moTa"
        },
        {
            type: "number",
            label: "Hệ số",
            placeholder: "Hệ số",
            value: formData.heSo,
            field: "heSo"
        }
    ]

    const handleSubmit = async () => {
        const res = await post("/QuanLyBanHang/DonViTinh/add", formData, setIsLoading)
        console.log("Data: " + res)
        if (res === true) {

            Swal.fire({
                title: "Thông báo !",
                text: "Sửa thành công !!!",
                icon: 'success',
            })
            navigate("/quanlykho/quanlylo")
        }



    }

    return (
        <>
            <Form
                title="Tạo mới"
                subTitle="Kho"
                onEdit={handleSubmit}
                onDelete={async () => {
                    {
                        const res = await dele("/QuanLyBanHang/DVTinh/delete" + parms.id, setIsLoading)
                        if (res === true) {
                            Swal.fire({
                                title: "Thông báo !",
                                text: "Xóa thành công !!!",
                                icon: 'success',
                            })
                            navigate("/quanlykho/quanlylo")
                        }
                    }
                }}
                showAvatar={true}
                setForm={setFormData}
                labelInput={fliedModule}
            />

            <Loading open={isloading} />
        </>
    )
}

export default CreateDVTinh