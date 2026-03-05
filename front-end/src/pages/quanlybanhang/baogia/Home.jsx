import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { formatCurrency } from "../../../queries/common/FormatString"
import { DataTable } from "../../../compoments/ui/Table"
import Loading from "../../../compoments/ui/Loading"
import { get } from "../../../queries/apis/AxiosNghiepVu"


const trangthaibaogia = (trangthai) => {
    switch (trangthai) {
        case 0:
            return "Báo giá"
        case 1:
            return "Đã gửi"
    }
}
const HomeBaoGia = () => {
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
                "/QuanLyBanHang/DonHang/BaoGia",
                parm,
                setIsLoading
            );

            if (data && Array.isArray(data.data)) {

                console.log(data)
                const dulieu = data.data.map((item, index) => ({
                    stt: index + 1,
                    id: item.id,
                    tongTien: formatCurrency(item.tongGTriDH),
                    tongHang: item.tongHang,
                    trangThai: trangthaibaogia(item.trangThai),
                    maDH: item.maDH
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
        { field: "maDH", headerName: "Mã báo giá" },
        { field: "tongTien", headerName: "Tổng tiền" },
        { field: "tongHang", headerName: "Tổng hàng" },
        { field: "trangThai", headerName: "Trạng thái" },

    ];

    useEffect(() => {
        fetchAPI()

    }, [])

    return (
        <>
            <DataTable columns={columm} rows={Array.isArray(lstPhuongThuc) ? lstPhuongThuc : []} onCreate={() => {
                navigate("/QuanLyBanHang/baogia/add")
            }}
                onView="/quanlybanhang/baogia/info" />
            <Loading open={isLoading} />
        </>
    )
}

export default HomeBaoGia