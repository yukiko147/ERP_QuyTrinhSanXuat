import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { get } from "../../../queries/apis/AxiosNghiepVu"
import { DataTable } from "../../../compoments/ui/Table"
import Loading from "../../../compoments/ui/Loading"

const HomeDVTinh = () => {
    const [res, setRes] = useState({})
    const parm = {
        PageNunber: 1,
        PageSize: 1,
        Seacrch: "a"
    }

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const fetchAPI = async () => {
        const data = await get("/QuanLyBanHang/DonViTinh", parm, setIsLoading)
        console.log(data)
        if (data && Array.isArray(data.data)) {
            setIsLoading(true)
            const dulieu = data.data.map((item, index) => ({
                stt: index + 1,
                id: item.id,
                tenDVi: item.tenDVi,
                kyHieu: item.kyHieu
            }));

            setRes(dulieu);
            setIsLoading(false)
        }
    };


    const columm = [
        { field: 'stt', headerName: 'STT' },
        { field: "tenDVi", headerName: "Tên đơn vị" },
        { field: "kyHieu", headerName: "Ký hiệu" },

    ];

    useEffect(() => {
        fetchAPI()

    }, [])
    console.log(res)
    return (
        <>
            <DataTable columns={columm} rows={Array.isArray(res) ? res : []} onCreate={() => {
                navigate("/quanlykho/QuanLyLo/add")
            }}
                onView="/quanlykho/kho/info"
            />
            <Loading open={isLoading} />
        </>
    )
}

export default HomeDVTinh