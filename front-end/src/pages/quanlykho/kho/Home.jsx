import { useEffect, useState } from "react"
import { get } from "../../../queries/apis/AxiosNghiepVu"
import Loading from "../../../compoments/ui/Loading"
import { useNavigate } from "react-router-dom"
import { DataTable } from "../../../compoments/ui/Table"
import { PhongBanRender } from "../../../queries/common/Uitit"
import { formatCurrency } from "../../../queries/common/FormatString"


const HomeKho = () => {
    const [res, setRes] = useState({})
    const parm = {
        PageNunber: 1,
        PageSize: 1,
        Seacrch: "a"
    }

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const fetchAPI = async () => {
        const data = await get("/QuanLyKho/kho", parm, setIsLoading)
        console.log(data)
        if (data && Array.isArray(data.data)) {
            setIsLoading(true)
            const dulieu = data.data.map((item, index) => ({
                stt: index + 1,
                id: item.id,
                tenKho: item.tenKho,
                diaChiKho: item.diaChiKho
            }));

            setRes(dulieu);
            setIsLoading(false)
        }
    };


    const columm = [
        { field: 'stt', headerName: 'STT' },
        { field: "tenKho", headerName: "Tên kho" },
        { field: "diaChiKho", headerName: "Địa chỉ kho" },

    ];

    useEffect(() => {
        fetchAPI()

    }, [])
    console.log(res)
    return (
        <>
            <DataTable columns={columm} rows={Array.isArray(res) ? res : []} onCreate={() => {
                navigate("/quanlykho/kho/add")
            }}
                onView="/quanlykho/kho/info"
            />
            <Loading open={isLoading} />
        </>
    )
}

export default HomeKho