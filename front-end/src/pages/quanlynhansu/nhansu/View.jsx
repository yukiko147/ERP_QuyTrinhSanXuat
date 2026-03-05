import { useEffect, useState } from "react"
import { Form } from "../../../compoments/ui/FormInput"
import { dele, get, post, put } from "../../../queries/apis/AxiosNghiepVu"
import Loading from "../../../compoments/ui/Loading"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"

const ViewNhanSu = () => {

    const account = JSON.parse(localStorage.getItem("Account"))
    const [prevImg, setPrevImg] = useState()
    const parms = useParams()
    const navigate = useNavigate()
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
        phongBan: 0,
        nguoiQuanLy: null,
        hinhAnh: null,
        createBy: account.id,
        updateBy: account.id
    })

    const fliedModule = [
        {
            type: "input",
            lable: "Tên đăng nhập",
            placeholder: "Tên đăng nhập",
            value: formData.tenDangNhap,
            defaultValue: formData.tenDangNhap,
            field: "tenDangNhap"
        },
        {
            type: "password",
            lable: "Mật khẩu",
            placeholder: "Mật khẩu",
            value: formData.matKhau,
            field: "matKhau"
        },
        {
            type: "input",
            lable: "Họ tên nhân sự",
            placeholder: "Họ tên nhân sự",
            value: formData.hoTenNhanSu,
            field: "hoTenNhanSu"
        },
        {
            type: "input",
            lable: "SĐT",
            placeholder: "SĐT",
            value: formData.sdt,
            field: "sdt"
        },
        {
            type: "select",
            lable: "Giới tính",
            placeholder: "Giới tính",
            value: formData.gioiTinh,
            field: "gioiTinh",
            options: [
                {
                    label: "Nữ",
                    value: 0
                },
                {
                    label: "Nam",
                    value: 1
                }
            ]
        },
        {
            type: "select",
            lable: "Chức vụ",
            placeholder: "Chức vụ",
            value: formData.chucVu,
            field: "chucVu",
            options: [
                {
                    label: "Quản lý",
                    value: 0
                },
                {
                    label: "Nhân viên",
                    value: 1
                }
            ]
        },
        {
            type: "select",
            lable: "Phòng ban",
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

    const fethAPI = async () => {
        const res = await get(`/quanlynhansu/nhansu/${parms.id}`, "", setLoading)
        setFormData(prev => ({
            ...prev,
            tenDangNhap: res.tenDangNhap,
            matKhau: res.matKhau,
            hoTenNhanSu: res.hoTenNhanSu,
            gioiTinh: res.gioiTinh,
            diaChi: res.diaChi,
            email: res.email,
            sdt: res.sdt,
            chucVu: res.chucVu,
            phongBan: res.phongBan,
            nguoiQuanLy: res?.nguoiQuanLy,
            hinhAnh: res.hinhAnh
        }))

        setPrevImg(res.hinhAnh)
    }

    useEffect(() => {
        fethAPI()

    }, [])

    const handleDelete = async () => {
        const res = await dele(`/quanlynhansu/nhansu/delete/${parms.id}`, setLoading)
        if (res === true) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Xóa thành công !!!",
                icon: "success"
            })

            navigate("/quanlynhansu/nhansu")

        }
    }

    const handleEdit = async () => {
        const res = await put(`/quanlynhansu/nhansu/update/${parms.id}`, formData, setLoading)
        if (res === true) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Chỉnh sửa thành công !!!",
                icon: "success"
            })
            navigate("/quanlynhansu/nhansu")
        }


    }

    const handleBack = async () => {
        navigate("/quanlynhansu/nhansu")
    }
    return (
        <>
            <Form
                title="Chi tiết nhân sự"
                subTitle="Nhân sự"
                showAvatar={true}
                setForm={setFormData}
                labelInput={fliedModule}
                onBack={handleBack}
                onDelete={handleDelete}
                onEdit={handleEdit}
                setPrevImg={setPrevImg}
                prevImg={prevImg}
            />
            <Loading open={loading} />
        </>
    )
}

export default ViewNhanSu