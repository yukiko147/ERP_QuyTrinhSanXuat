import { use, useEffect, useState } from "react"
import { Form } from "../../../compoments/ui/FormInput"
import Loading from "../../../compoments/ui/Loading"
import { dele, get, post, put } from "../../../queries/apis/AxiosNghiepVu"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"

const ViewKhachHang = () => {

    const account = JSON.parse(localStorage.getItem("Account"))

    const parms = useParams()
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
        const urlImg = prevImg;
        const payload = { ...formData, hinhAnh: urlImg }
        const res = await post("/QuanLyBanHang/KhachHang/add", payload, setIsLoading)
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

    const getKhachHang = async () => {
        const res = await get("/QuanLyBanHang/KhachHang/" + parms.id, null, setIsLoading);
        console.log(res)
        if (res) {
            setFormData(prev => ({
                ...prev,
                hoTenKh: res.hoTenKh,
                email: res.email,
                diaChi: res.diaChi,
                sdt: res.sdt,

            }))

            setPrevImg(res.hinhAnh)
        }
    }

    useEffect(() => {
        getKhachHang()
    }, [])
    return (
        <>
            <Form
                title="Khách hành"
                subTitle="Khách hàng"
                onEdit={async () => {
                    {
                        const res = await put("/QuanLyBanHang/KhachHang/update/" + parms.id, formData, setIsLoading);
                        if (res === true) {
                            Swal.fire({
                                title: "Thông báo !!!",
                                text: "Sửa khách hàng thành công !!!",
                                icon: "success"
                            })
                            navigate("/QuanLyBanHang/KhachHang")
                        }
                    }
                }}

                onDelete={async () => {
                    {
                        const res = await dele("/QuanLyBanHang/KhachHang/delete/" + parms.id, setIsLoading)
                        // console.log(res)
                        if (res === true) {
                            Swal.fire({
                                title: "Thông báo !!!",
                                text: "Đã xóa thành công !!!",
                                icon: "success"
                            })
                            navigate("/QuanLyBanHang/KhachHang")
                        }

                    }
                }}

                onBack={() => navigate("/QuanLyBanHang/KhachHang")}
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

export default ViewKhachHang