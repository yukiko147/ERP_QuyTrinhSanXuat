import { useEffect, useState } from "react"
import { Form } from "../../../compoments/ui/FormInput"
import { dele, get, post, put } from "../../../queries/apis/AxiosNghiepVu"
import Loading from "../../../compoments/ui/Loading"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { Dialog } from "@mui/material"
import KhoSanPham from "./KhoSanPham"
import FullScreenDialog from "../../../compoments/ui/Dialog"
import { Edit } from "@mui/icons-material"
import KhoVatTu from "./KhoVatTu"

const ViewKho = () => {

    const account = JSON.parse(localStorage.getItem("Account"))
    const navigate = useNavigate()
    const parms = useParams();
    const [loading, setLoading] = useState(false)

    const [openDialogSP, setOpenDialogSP] = useState(false)
    const [openDialogVT, setOpenDialogVT] = useState(false)

    const [formData, setFormData] = useState({
        tenKho: "",
        diaChiKho: "",
        createBy: account.id,
        updateBy: account.id
    })

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
        },
        {
            type: "button",
            btnText: "Kho vật tư",
            onClick: async () => {
                {
                    setOpenDialogVT(true)
                }
            }

        },
        {
            type: "button",
            btnText: "Kho sản phẩm",
            onClick: async () => {
                {
                    setOpenDialogSP(true)
                }
            }
        }
    ]

    const fethAPI = async () => {
        const res = await get(`/QuanLyKho/Kho/${parms.id}`, null, setLoading)
        if (res) {
            setFormData(prev => ({
                ...prev,
                tenKho: res.tenKho,
                diaChiKho: res.diaChiKho,

            }))
        }
    }

    const deleteKho = async () => {
        const res = await dele(`/QuanLyKho/Kho/delete/${parms}`, setLoading)
        if (res === true) {
            Swal.fire({
                title: "Thông báo !",
                text: "Xóa thành công !",
                icon: "success"
            })

            navigate(-1)
        }
    }

    const suaKho = async () => {
        const res = await put(`/QuanLyKho/Kho/update/${parms}`, formData, setLoading)
        if (res === true) {
            Swal.fire({
                title: "Thông báo !",
                text: "Sửa thành công !",
                icon: "success"
            })

            navigate(-1)
        }
    }

    useEffect(() => {
        fethAPI()
    }, [])

    return (
        <>
            <Form
                title="Tạo mới"
                subTitle="Sản phẩm"
                showAvatar={false}
                onDelete={deleteKho}
                onEdit={suaKho}
                onBack={() => {
                    {
                        navigate(-1)
                    }
                }}
                labelInput={fliedModule}
            />

            <FullScreenDialog
                setOpen={setOpenDialogSP}
                open={openDialogSP}
                title={`Kho sản phẩm`}
                main={
                    <>
                        {/* <DataTable columns={columm} rows={Array.isArray(lstPhuongThuc) ? lstPhuongThuc : []} />
                        <Loading open={isLoading} /> */}
                        <KhoSanPham />
                    </>
                }
            />


            <FullScreenDialog
                setOpen={setOpenDialogVT}
                open={openDialogVT}
                title={`Kho vật tư`}
                main={
                    <>
                        {/* <DataTable columns={columm} rows={Array.isArray(lstPhuongThuc) ? lstPhuongThuc : []} />
                        <Loading open={isLoading} /> */}
                        <KhoVatTu />
                    </>
                }
            />
            <Loading open={loading} />
        </>
    )
}

export default ViewKho