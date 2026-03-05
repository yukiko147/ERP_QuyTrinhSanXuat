import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { formatCurrency } from "../../../queries/common/FormatString"
import { DataTable } from "../../../compoments/ui/Table"
import Loading from "../../../compoments/ui/Loading"
import { get } from "../../../queries/apis/AxiosNghiepVu"

const trangThai = (trangThai) => {
    switch (trangThai) {
        case 0:
            return "Chưa thanh toán"
        case 1:
            return "Đã thanh toán"
        case -1:
            return "Đã hủy"
    }
}

const HomeHoaDonBan = () => {
    const [lstPhuongThuc, setLstPhuongThuc] = useState([])
    const parms = useParams()
    const parm = {
        PageNunber: 1,
        PageSize: 1,
        Seacrch: "a"
    }

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const data = await get(
                "/QuanLyBanHang/HoaDonBan",
                parm,
                setIsLoading
            );

            if (data && Array.isArray(data.data)) {

                console.log(data)
                const dulieu = data.data.map((item, index) => ({
                    stt: index + 1,
                    id: item.maHD,
                    maHD: item.maHD,
                    maDH: item.maDH,
                    soLan: item.soLan === 1 ? "1/2" : "2/2",
                    soTienTra: formatCurrency(item.soTienTra),
                    

                }));

                setLstPhuongThuc(dulieu)
            }
        } catch (error) {
            console.error("Lỗi load khách hàng:", error);
        } finally {
            setIsLoading(false);
        }
    }


    const columm = [
        { field: 'stt', headerName: 'STT' },
        { field: "maHD", headerName: "Mã hóa dơn" },
        { field: "maDH", headerName: "Mã đơn hàng" },
        { field: "soTienTra", headerName: "Số tiền trả" },
        { field: "soLan", headerName: "Tiến độ" }

    ];

    useEffect(() => {
        fetchAPI()

    }, [])

    return (
        <>
            <DataTable columns={columm} rows={Array.isArray(lstPhuongThuc) ? lstPhuongThuc : []}
                onView="/quanlybanhang/hoadonban/info" />
            <Loading open={isLoading} />
        </>
    )
}

export default HomeHoaDonBan