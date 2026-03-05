import { useEffect, useState } from "react"
import { get } from "../../../queries/apis/AxiosNghiepVu"
import Loading from "../../../compoments/ui/Loading"
import { useNavigate } from "react-router-dom"
import { DataTable } from "../../../compoments/ui/Table"

const trangThai = (trangThai) => {
    switch (trangThai) {
        case 0:
            return "Xác nhận"
        case 1:
            return "Yêu cầu"
        case 2:
            return "Hoàn thành"
        case -1:
            return "Đã hủy"
    }
}

const HomeDonNhap = () => {
    const [res, setRes] = useState({})
    const parm = {
        PageNunber: 1,
        PageSize: 1,
        Seacrch: "a"
    }

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const fetchAPI = async () => {
        const data = await get("/QuanLyMuaHang/DonNhap", parm, setIsLoading);
        console.log("data", data)
        if (data && Array.isArray(data.data)) {
            setIsLoading(true)
            const dulieu = data.data.map((item, index) => ({
                stt: index + 1,
                id: item.id,
                maDGH: item.maDGH,
                tongHang: item.tongHang,
                tongGTriDH: item.tongGTriDH,
                trangThai: trangThai(item.trangThai)
            }));

            setRes(dulieu);
            setIsLoading(false)
        }
    };


    const columm = [
        { field: 'stt', headerName: 'STT' },
        { field: "maDGH", headerName: "Mã đơn giao" },
        { field: "tongHang", headerName: "Tổng hàng" },
        { field: "tongGTriDH", headerName: "Tổng giá trị đơn hàng" },
        { field: "trangThai", headerName: "Trạng thái" }

    ];

    useEffect(() => {
        fetchAPI()

    }, [])
    console.log(res)
    return (
        <>
            <DataTable columns={columm} rows={Array.isArray(res) ? res : []} onCreate={() => {
                navigate("/quanlymuahang/donnhap/add")
            }}
                onView="/quanlymuahang/donnhap/info"
            />
            <Loading open={isLoading} />
        </>
    )
}

export default HomeDonNhap