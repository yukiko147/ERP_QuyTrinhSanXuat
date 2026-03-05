import { useState } from "react"
import { useParams } from "react-router-dom"

const ViewHoaDonMua = () => {

    const parms = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const account = JSON.parse()

    const [lstNhaCC, setLstNhaCC] = useState([])

    const [form, setForm] = useState({
        id: 0,
        maDGH: "",
        thoiGianGiao: null,
        trangThai: 0,
        thue: 0,
        tienTruocThue: 0,
        tongHang: 0,
        tongGTriDH: 0,
        nhaCungCapId: 0,
        khoHangId: null,
        lenhSanXuatId: null,
        createBy: 0,
        updateBy: 0,
    })

    const getNhaCungCap = async () => {
        const res = await get("/QuanLyMuaHang/NhaCungCap", null, setIsLoading)
        if (res && Array.isArray(res)) {
            const options = (res || []).map(item => ({
                value: item.id,
                otps
            }))
        }
    }

    return (
        <>

        </>
    )
}

export default ViewHoaDonMua