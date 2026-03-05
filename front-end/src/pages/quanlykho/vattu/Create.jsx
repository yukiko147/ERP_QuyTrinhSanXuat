import { useEffect, useState } from "react"
import { Form } from "../../../compoments/ui/FormInput"
import { get, post } from "../../../queries/apis/AxiosNghiepVu"
import Loading from "../../../compoments/ui/Loading"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const CreateVattu = () => {

    const navigate = useNavigate()
    const account = JSON.parse(localStorage.getItem("Account"))
    const [loading, setLoading] = useState(false)
    const [lstDVTinh, setDVTinh] = useState([])
    const [formData, setFormData] = useState({
        tenVatTu: "",
        giaBan: "",
        moTa: "",
        luongTonToiThieu: 0,
        hinhAnh: null,
        trangThai: 1,
        dVTinhId: 0,
        hinhAnh:"",
        createBy: account.id,
        updateBy: account.id
    })

    const getDVTinh = async () => {
        const res = await get("/QuanLyBanHang/api/DonViTinh", null, setLoading)
        if (res.data && Array.isArray(res.data)) {
            const c = (res.data || []).map(item => ({
                opt: item.tenDVi,
                value: item.id
            }))

            setDVTinh(c);
        }
    }
    const fliedModule = [
        {
            type: "input",
            label: "Tên vật tư",
            placeholder: "Tên vật tư",
            value: formData.tenVatTu,
            field: "tenVatTu"
        },
        {
            type: "number",
            label: "Giá bán",
            placeholder: "Giá bán",
            value: formData.giaBan,
            field: "giaBan"
        },
        {
            type: "number",
            label: "Lượng tồn tối thiệu",
            placeholder: "Lượng tồn tối thiểu",
            value: formData.luongTonToiThieu,
            field: "luongTonToiThieu"
        },
        {
            type: "select",
            label: "Đơn vị tính",
            value: formData.dVTinhId,
            field: "dVTinhId",
            options: lstDVTinh
        },
        {
            type: "text",
            label: "Mô tả",
            placeholder: "Mô tả",
            value: formData.moTa,
            field: "moTa"
        }
    ]

    const handleSubmit = async () => {
        const res = await post("/quanlykho/vattu/add", formData, setLoading)
        if (res === true) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Tạo thành công !!!",
                icon: "success"
            })
            navigate("/QuanLyKho/VatTu")
        }
    }

    useEffect(() => {
        getDVTinh()
    }, [])
    return (
        <>
            <Form
                title="Tạo mới"
                subTitle="Vật tư"
                onCreate={handleSubmit}
                showAvatar={true}
                setForm={setFormData}
                labelInput={fliedModule}
            />
            <Loading open={loading} />
        </>
    )
}

export default CreateVattu