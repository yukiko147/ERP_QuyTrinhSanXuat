import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../../compoments/ui/Loading"
import { DataTable } from "../../../compoments/ui/Table"
import { useEffect, useState } from "react"
import { get } from "../../../queries/apis/AxiosNghiepVu"

const PhuongThucView = () => {
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
                "/QuanLyBanHang/PhuongThucThanhToan",
                parm,
                setIsLoading
            );

            if (data && Array.isArray(data.data)) {

                const dulieu = (data.data || []).map((item, index) => ({
                    stt: index + 1,
                    id: item.id,
                    tenDieuKhoan: item.tenDieuKhoan,
                    soPhanTramTraTruoc: item.soPhanTramTraTruoc,
                    soKyTra: item.soKyTra,
                    tienTraMoiKy: item.tienTraMoiKy
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
        { field: "tenDieuKhoan", headerName: "Tên điều khoản" },
        { field: "soPhanTramTraTruoc", headerName: "Số tiền trả trước" },
        { field: "soKyTra", headerName: "soKyTra" },
        { field: "tienTraMoiKy", headerName: "Tiền trả mỗi kỳ" },

    ];

    useEffect(() => {
        fetchAPI()

    }, [])

    return (
        <>
            <DataTable columns={columm} rows={Array.isArray(lstPhuongThuc) ? lstPhuongThuc : []} onCreate={() => {
                navigate("/QuanLyBanHang/phuongthucthanhtoan/add")
            }}
                onView="/quanlybanhang/phuongthucthanhtoan/info" />
            <Loading open={isLoading} />
        </>
    )
}

export default PhuongThucView