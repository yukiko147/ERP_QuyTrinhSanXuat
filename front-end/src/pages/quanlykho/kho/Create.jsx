import { useState } from "react"
import { Form } from "../../../compoments/ui/FormInput"
import Loading from "../../../compoments/ui/Loading"
import { post } from "../../../queries/apis/AxiosNghiepVu"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const CreateKho = () => {

    const account = JSON.parse(localStorage.getItem("Account"))

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        tenKho: "",
        diaChiKho: "",
        createBy: account.id,
        updateBy: account.id,

    })

    const [isloading, setIsLoading] = useState(false)
    const fliedModule = [
        {
            type: "input",
            label: "Tên kho",
            placeholder: "Tên kho",
            value: formData.tenKho,
            field: "tenKho"
        },
        {
            type: "input",
            label: "Địa chỉ kho",
            placeholder: "Địa chỉ kho",
            value: formData.diaChiKho,
            field: "diaChiKho"
        }
    ]

    const handleSubmit = async () => {
        const res = await post("/QuanLykho/kho/add", formData, setIsLoading)
        console.log("Data: " + res)
        if (res === true) {

            Swal.fire({
                title: "Thông báo !",
                text: "Tạo thành công !!!",
                icon: 'success',
            })
            navigate("/quanlykho/kho")
        }



    }

    return (
        <>
            <Form
                title="Tạo mới"
                subTitle="Kho"
                onCreate={handleSubmit}
                showAvatar={false}
                setForm={setFormData}
                labelInput={fliedModule}
            />

            <Loading open={isloading} />
        </>
    )
}

export default CreateKho