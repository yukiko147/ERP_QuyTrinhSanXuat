import { useState } from "react"
import { Form } from "../../../compoments/ui/FormInput"
import { post } from "../../../queries/apis/AxiosNghiepVu"
import Loading from "../../../compoments/ui/Loading"
import { uploadImgCloudinary } from "../../../queries/common/Upload"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const CreateNhanSu = () => {

    const account = JSON.parse(localStorage.getItem("Account"))
    const navigate = useNavigate()
    const [prevImg, setPrevImg] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        tenDangNhap: "",
        matKhau: "",
        hoTenNhanSu: "",
        gioiTinh: 0,
        email: "",
        diaChi: "",
        sdt: "",
        chucVu: 0,
        phongBan: 1,
        nguoiQuanLy: null,
        hinhAnh: null,
        createBy: account.id,
        updateBy: account.id
    })

    const fliedModule = [
        {
            type: "input",
            label: "Tên đăng nhập",
            placeholder: "Tên đăng nhập",
            value: formData.tenDangNhap,
            field: "tenDangNhap"
        },
        {
            type: "password",
            label: "Mật khẩu",
            placeholder: "Mật khẩu",
            value: formData.matKhau,
            field: "matKhau"
        },
        {
            type: "input",
            label: "Họ tên nhân sự",
            placeholder: "Họ tên nhân sự",
            value: formData.hoTenNhanSu,
            field: "hoTenNhanSu"
        },
        ,
        {
            type: "input",
            label: "Địa chỉ",
            placeholder: "Địa chỉ",
            value: formData.diaChi,
            field: "diaChi"
        },
        ,
        {
            type: "email",
            label: "Email",
            placeholder: "Email",
            value: formData.email,
            field: "email"
        },
        {
            type: "input",
            label: "SĐT",
            placeholder: "SĐT",
            value: formData.sdt,
            field: "sdt"
        },
        {
            type: "select",
            label: "Giới tính",
            placeholder: "Giới tính",
            value: formData.gioiTinh,
            field: "gioiTinh",
            options: [
                {
                    label: "Nữ",
                    value: 0
                }, {
                    label: "Nam",
                    value: 1
                }
            ]
        },
        {
            type: "select",
            label: "Chức vụ",
            placeholder: "Chức vụ",
            value: formData.chucVu,
            field: "chucVu",
            options: [
                {
                    label: "Nhân viên",
                    value: 0
                },
                {
                    label: "Quản lý",
                    value: 1
                }
            ]
        },
        {
            type: "select",
            label: "Phòng ban",
            placeholder: "Phòng ban",
            value: formData.phongBan,
            field: "phongBan",
            options: [
                {
                    label: "Nhân sự",
                    value: 1
                },
                {
                    label: "Kho",
                    value: 8
                },
                {
                    label: "Kế toán",
                    value: 2
                },
                {
                    label: "Bán hàng",
                    value: 4
                },
                {
                    label: "Mua hàng",
                    value: 6
                },
                {
                    label: "Sản xuất",
                    value: 10
                }
            ]
        }
    ]

    const handleSubmit = async () => {
        const res = await post("/quanlynhansu/nhansu/add", payload, setLoading)
        if (res === true) {
            Swal.fire({
                title: "Thông báo !",
                text: "Tạo nhân sự thành công !",
                icon: "success"
            })

            navigate(-1)
        }
    }

    return (
        <>
            <Form
                title="Tạo mới"
                subTitle="Nhân sự"
                onCreate={handleSubmit}
                showAvatar={true}
                setForm={setFormData}
                labelInput={fliedModule}
                setPrevImg={setPrevImg}
            />
            <Loading open={loading} />
        </>
    )
}

export default CreateNhanSu