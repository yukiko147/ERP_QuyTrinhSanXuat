import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { formatCurrency } from "../../../queries/common/FormatString"
import { DataTable } from "../../../compoments/ui/Table"
import Loading from "../../../compoments/ui/Loading"
import { get } from "../../../queries/apis/AxiosNghiepVu"


const trangThai = (trangThai) => {
    switch (trangThai) {

        case 1:
            return "Xác nhận"

    }
}
const HomePhieuNhap = () => {
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
                "/QuanLyKho/PhieuNhap",
                parm,
                setIsLoading
            );

            if (data && Array.isArray(data.data)) {

                console.log(data)
                const dulieu = data.data.map((item, index) => ({
                    stt: index + 1,
                    id: item.id,
                    maPN: item.maPN,
                    tongGTri: formatCurrency(item.tongGiaTri),
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
        { field: "maPN", headerName: "Mã phiếu nhập" },
        { field: "tongGTri", headerName: "Tổng giá trị" },

    ];

    useEffect(() => {
        fetchAPI()

    }, [])

    return (
        <>
            <DataTable columns={columm} rows={Array.isArray(lstPhuongThuc) ? lstPhuongThuc : []} onCreate={() => {
                navigate("/QuanLyKho/phieunhap/add")
            }}
                onView="/quanlykho/phieunhap/info" />
            <Loading open={isLoading} />
        </>
    )
}

export default HomePhieuNhap