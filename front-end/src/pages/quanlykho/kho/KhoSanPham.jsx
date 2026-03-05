import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { get } from "../../../queries/apis/AxiosNghiepVu"
import { DataTable } from "../../../compoments/ui/Table"
import Loading from "../../../compoments/ui/Loading"
import { formatDate } from "../../../queries/common/FormatString"

const KhoSanPham = () => {
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
                "/QuanLyKho/Kho/khosanpham",
                parm,
                setIsLoading
            );

            if (data && Array.isArray(data)) {

                const dulieu = data.map((item, index) => ({
                    stt: index + 1,
                    id: item.id,
                    soLo: item.soLo,
                    tenKho: item.tenKho,
                    tenSanPham: item.tenSP,
                    soLuongTon: item.soLuongTon,
                    ngaySX: formatDate(item.ngaySX),
                    ngayHetHan: formatDate(item.ngayHetHan)
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
        { field: "soLo", headerName: "Số lô" },
        { field: "tenKho", headerName: "Tên kho" },
        { field: "tenSanPham", headerName: "Tên sản phẩm" },
        { field: "soLuongTon", headerName: "Số lượng tồn" },
        { field: "ngaySX", headerName: "Ngày sản xuất" },
        { field: "ngayHetHan", headerName: "Ngày hết hạn" }

    ];

    useEffect(() => {
        fetchAPI()

    }, [])

    return (
        <>
            <DataTable columns={columm} rows={Array.isArray(lstPhuongThuc) ? lstPhuongThuc : []} />
            <Loading open={isLoading} />
        </>
    )
}

export default KhoSanPham