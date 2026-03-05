import { useEffect, useState } from "react"
import { get } from "../../../queries/apis/AxiosNghiepVu"
import Loading from "../../../compoments/ui/Loading"
import { useNavigate } from "react-router-dom"
import { DataTable } from "../../../compoments/ui/Table"


const HomeKhachHang = () => {
    const [res, setRes] = useState({})
    const parm = {
        PageNunber: 1,
        PageSize: 1,
        Seacrch: "a"
    }

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const fetchAPI = async () => {
        const data = await get("/QuanLyBanHang/KhachHang", parm, setIsLoading);
        if (data && Array.isArray(data.data)) {
            setIsLoading(true)
            const dulieu = data.data.map((item, index) => ({
                stt: index + 1,
                id: item.id,
                hoten: item.hoTenKh,
                email: item.email,
                hinhAnh: (<img src={item.hinhAnh} />)
            }));

            setRes(dulieu);
            setIsLoading(false)
        }
    };


    const columm = [
        { field: 'stt', headerName: 'STT' },
        { field: "hoten", headerName: "Họ tên" },
        { field: "email", headerName: "Email" }
    ];

    useEffect(() => {
        fetchAPI()

    }, [])
    console.log(res)
    return (
        <>
            <DataTable columns={columm} rows={Array.isArray(res) ? res : []} onCreate={() => {
                navigate("/quanlybanhang/khachhang/add")
            }}
                onView={"/quanlybanhang/khachhang/info"}
            />
            <Loading open={isLoading} />
        </>
    )
}

export default HomeKhachHang