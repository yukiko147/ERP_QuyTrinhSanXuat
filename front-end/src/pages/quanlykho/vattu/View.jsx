import { useEffect, useState } from "react"
import { Form } from "../../../compoments/ui/FormInput"
import { dele, get, post, put } from "../../../queries/apis/AxiosNghiepVu"
import Loading from "../../../compoments/ui/Loading"
import Swal from "sweetalert2"
import { useNavigate, useParams } from "react-router-dom"

const ViewVattu = () => {

    const account = JSON.parse(localStorage.getItem("Account"))
    const navigate = useNavigate()
    const parms = useParams()
    const [loading, setLoading] = useState(false)
    const [prev, setPrev] = useState("")
    const [lstDVTinh, setDVTinh] = useState([])
    const [formData, setFormData] = useState({
        tenVatTu: "",
        giaBan: "",
        moTa: "",
        luongTonToiThieu: 0,
        hinhAnh: null,
        tonKho: 0,
        trangThai: 1,
        dVTinhId: 0,
        hinhAnh: "",
        createBy: account.id,
        updateBy: account.id
    })

    const getVatTu = async () => {
        const res = await get("/QuanLyKho/VatTu/" + parms.id, null, setLoading)
        if (res) {
            setFormData(prev => ({
                ...prev,
                tenVatTu: res.tenVatTu,
                giaBan: res.giaBan,
                moTa: res.moTa,
                soLuongTon: res.soTon
            }))
            setPrev(res.hinhAnh)
        }
    }

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

    useEffect(() => {
        getVatTu()
        getDVTinh()
    }, [])
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
            type: "text",
            label: "Mô tả",
            placeholder: "Mô tả",
            value: formData.moTa,
            field: "moTa"
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
            label: "Số lượng tồn",
            disable: true,
            placeholder: "Số lượng tồn",
            value: formData.tonKho,
            field: "moTa",

        }
    ]


    const onEdit = async () => {
        const res = await put("/quanlykho/vattu/add", formData, setLoading)
        if (res === true) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Sửa thông tin vật tư thành công !!!",
                icon: "success"
            })

            navigate(-1)
        }
    }

    const onDelete = async () => {
        const res = await dele("/quanlykho/vattu/delete/" + parms.id, setLoading)
        if (res === true) {
            Swal.fire({
                title: "Thông báo !!!",
                text: "Xóa thông tin thành công !!!",
                icon: "success"
            })

            navigate("/QuanLyKho/VatTu")
        }
    }



    return (
        <>
            <Form
                title="Vật tư"
                subTitle="Chi tiết vật tư"
                onEdit={onEdit}
                onDelete={onDelete}
                onBack={() => { navigate("/QuanLyKho/VatTu") }}
                showAvatar={true}
                setForm={setFormData}
                labelInput={fliedModule}
                prev={prev}
            />
            <Loading open={loading} />
        </>
    )
}

export default ViewVattu