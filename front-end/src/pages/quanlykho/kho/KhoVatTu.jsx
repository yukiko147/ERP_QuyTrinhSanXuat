import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { get } from "../../../queries/apis/AxiosNghiepVu"
import { DataTable } from "../../../compoments/ui/Table"
import Loading from "../../../compoments/ui/Loading"
import { formatDate } from "../../../queries/common/FormatString"

const KhoVatTu = () => {
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
                "/QuanLyKho/Kho/khovattu",
                parm,
                setIsLoading
            );

            if (data && Array.isArray(data)) {

                const dulieu = data.map((item, index) => ({
                    stt: index + 1,
                    id: item.id,
                    tenVatTu: item.tenVatTu,
                    tenKho: item.tenKho,
                    soLuongTon: item.soLuongTon
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
        { field: "tenVatTu", headerName: "Tên vật tư" },
        { field: "tenKho", headerName: "Tên kho" },
        { field: "soLuongTon", headerName: "Số lượng tồn" },

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

export default KhoVatTu