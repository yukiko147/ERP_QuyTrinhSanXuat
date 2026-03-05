import { useEffect, useState } from "react"
import { get } from "../../../queries/apis/AxiosNghiepVu"
import Loading from "../../../compoments/ui/Loading"
import { useNavigate } from "react-router-dom"
import { DataTable } from "../../../compoments/ui/Table"
import { PhongBanRender } from "../../../queries/common/Uitit"
import { formatCurrency } from "../../../queries/common/FormatString"


const HomeSanPham = () => {
    const [res, setRes] = useState({})
    const parm = {
        PageNunber: 1,
        PageSize: 1,
        Seacrch: "a"
    }

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const fetchAPI = async () => {
        const data = await get("/QuanLyKho/sanpham", parm, setIsLoading)
        console.log(data)
        if (data && Array.isArray(data.data)) {
            setIsLoading(true)
            const dulieu = data.data.map((item, index) => ({
                stt: index + 1,
                id: item.id,
                tenSP: item.tenSP,
                sku: item.sku,
                giaGocSP: formatCurrency(item.giaGocSP),
                giaBanSP: formatCurrency(item.giaBanSP),
                soLuongTon: item.soLuongTon
            }));

            setRes(dulieu);
            setIsLoading(false)
        }
    };


    const columm = [
        { field: 'stt', headerName: 'STT' },
        { field: "tenSP", headerName: "Tên sản phẩm" },
        { field: "sku", headerName: "SKU" },
        { field: "giaGocSP", headerName: "Giá gốc sản phẩm" },
        { field: "giaBanSP", headerName: "Giá bán sản phẩm" },
        { field: "soLuongTon", headerName: "Số lượng tồn" },

    ];

    useEffect(() => {
        fetchAPI()

    }, [])
    console.log(res)
    return (
        <>
            <DataTable columns={columm} rows={Array.isArray(res) ? res : []} onCreate={() => {
                navigate("/quanlykho/sanpham/add")
            }}
                onView="/quanlykho/sanpham/info"
            />
            <Loading open={isLoading} />
        </>
    )
}

export default HomeSanPham