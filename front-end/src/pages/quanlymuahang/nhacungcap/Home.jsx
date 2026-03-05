import { useEffect, useState } from "react"
import { get } from "../../../queries/apis/AxiosNghiepVu"
import Loading from "../../../compoments/ui/Loading"
import { useNavigate } from "react-router-dom"
import { DataTable } from "../../../compoments/ui/Table"


const HomeNhaCungCap = () => {
    const [res, setRes] = useState({})
    const parm = {
        PageNunber: 1,
        PageSize: 1,
        Seacrch: "a"
    }

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const fetchAPI = async () => {
        const data = await get("/QuanLyMuaHang/NhaCungCap", parm, setIsLoading);

        if (data && Array.isArray(data.data)) {
            setIsLoading(true)
            const dulieu = data.data.map((item, index) => ({
                stt: index + 1,
                id: item.id,
                tenNCC: item.tenNCC,
                email: item.email,
                sdt: item.sdt
            }));

            setRes(dulieu);
            setIsLoading(false)
        }
    };


    const columm = [
        { field: 'stt', headerName: 'STT' },
        { field: "tenNCC", headerName: "Tên nhà cung cấp" },
        { field: "email", headerName: "Email" },
        { field: "sdt", headerName: "SĐT" }

    ];

    useEffect(() => {
        fetchAPI()

    }, [])
    console.log(res)
    return (
        <>
            <DataTable columns={columm} rows={Array.isArray(res) ? res : []} onCreate={() => {
                navigate("/quanlymuahang/nhacungcap/add")
            }}
                onView="/quanlymuahang/nhacungcap/info"
            />
            <Loading open={isLoading} />
        </>
    )
}

export default HomeNhaCungCap