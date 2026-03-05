import { useEffect, useState } from "react"
import { get } from "../../../queries/apis/AxiosNghiepVu"
import Loading from "../../../compoments/ui/Loading"
import { useNavigate } from "react-router-dom"
import { DataTable } from "../../../compoments/ui/Table"


const trangThaiLenh = (trangThai) => {
    switch (trangThai) {
        case 0:
            return "Đang chờ"
        case 1:
            return "Sẵn sàng"
        case 2:
            return "Tiến hành"
        case 4:
            return "Hoàn tất"
        default:
            return "Không xác định"
    }
}
const HomeLenhSanXuat = () => {
    const [res, setRes] = useState({})
    const parm = {
        PageNunber: 1,
        PageSize: 1,
        Seacrch: "a"
    }

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const fetchAPI = async () => {
        const data = await get("/QuanLySanXuat/LenhSanXuat", parm, setIsLoading);

        if (data && Array.isArray(data.data)) {
            setIsLoading(true)
            const dulieu = data.data.map((item, index) => ({
                stt: index + 1,
                id: item.id,
                maLenhSX: item.maLenhSX,
                trangThai: trangThaiLenh(item.trangThaiLenh),
            }));

            setRes(dulieu);
            setIsLoading(false)
        }
    };


    const columm = [
        { field: 'stt', headerName: 'STT' },
        { field: "maLenhSX", headerName: "Mã lệnh sản xuất" },
        { field: "trangThai", headerName: "Trạng thái" }
    ];

    useEffect(() => {
        fetchAPI()

    }, [])
    console.log(res)
    return (
        <>
            <DataTable columns={columm} rows={Array.isArray(res) ? res : []} onCreate={() => {
                navigate("/quanlysanxuat/lenhsanxuat/add")
            }}
                onView="/quanlysanxuat/lenhsanxuat/info" />
            <Loading open={isLoading} />
        </>
    )
}

export default HomeLenhSanXuat