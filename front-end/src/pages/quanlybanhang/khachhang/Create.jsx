import { use, useState } from "react"
import { Form } from "../../../compoments/ui/FormInput"
import Loading from "../../../compoments/ui/Loading"
import { post } from "../../../queries/apis/AxiosNghiepVu"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const CreateKhachHang = () => {

    const account = JSON.parse(localStorage.getItem("Account"))

    const navigate = useNavigate()
    const [prevImg, setPrevImg] = useState(null)
    const [formData, setFormData] = useState({
        hoTenKh: "",
        email: "",
        diaChi: "",
        sdt: "",
        hinhAnh: null,
        createBy: account.id,
        updateBy: account.id
    })

    const [isloading, setIsLoading] = useState(false)
    const fliedModule = [
        {
            type: "input",
            label: "Họ tên khách hàng",
            placeholder: "Họ tên khách hàng",
            value: formData.hoTenKh,
            field: "hoTenKh"
        },
        {
            type: "email",
            label: "email",
            placeholder: "email",
            value: formData.email,
            field: "email"
        },
        {
            type: "input",
            label: "Địa chỉ",
            placeholder: "Địa chỉ",
            value: formData.diaChi,
            field: "diaChi"
        },
        {
            type: "input",
            label: "SĐT",
            placeholder: "SĐT",
            value: formData.sdt,
            field: "sdt"
        }
    ]

    const handleSubmit = async () => {

        const res = await post("/QuanLyBanHang/KhachHang/add", formData, setIsLoading)
        console.log("Data: " + res)
        if (res === true) {
            Swal.fire({
                title: "Thông báo !",
                text: "Tạo thành công !!!",
                icon: 'success',
            })
            navigate("/quanlybanhang/khachhang")
        }
    }

    return (
        <>
            <Form
                title="Tạo mới"
                subTitle="Khách hàng"
                onCreate={handleSubmit}
                showAvatar={true}
                setForm={setFormData}
                labelInput={fliedModule}
                setPrevImg={setPrevImg}
                prevImg={prevImg}
            />

            <Loading open={isloading} />
        </>
    )
}

export default CreateKhachHang