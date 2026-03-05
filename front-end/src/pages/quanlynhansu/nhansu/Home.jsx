import { useEffect, useState } from "react"
import { get } from "../../../queries/apis/AxiosNghiepVu"
import Loading from "../../../compoments/ui/Loading"
import { useNavigate } from "react-router-dom"
import { DataTable } from "../../../compoments/ui/Table"
import { PhongBanRender } from "../../../queries/common/Uitit"


const HomeNhanSu = () => {
    const [res, setRes] = useState({})
    const parm = {
        PageNunber: 1,
        PageSize: 1,
        Seacrch: "a"
    }

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const fetchAPI = async () => {
        const data = await get("/QuanLyNhanSu/NhanSu", parm, setIsLoading);

        if (data && Array.isArray(data.data)) {
            setIsLoading(true)
            const dulieu = data.data.map((item, index) => ({
                stt: index + 1,
                id: item.id,
                tenDangNhap: item.tenDangNhap,
                hoTen: item.hoTenNhanSu,
                gioiTinh: item.gioiTinh === 1 ? "Nam" : "Nữ",
                phongBan: PhongBanRender(item.phongBan),
                chucVu: item.chucVu === 1 ? "Quản lý" : "Nhân viên",

            }));

            setRes(dulieu);
            setIsLoading(false)
        }
    };


    const columm = [
        { field: 'stt', headerName: 'STT' },
        { field: "tenDangNhap", headerName: "Tên Đăng Nhập" },
        { field: "hoTen", headerName: "Họ tên" },
        { field: "gioiTinh", headerName: "Giới tính" },
        { field: "phongBan", headerName: "Phòng ban" },
        { field: "chucVu", headerName: "Chức vụ" }
    ];

    useEffect(() => {
        fetchAPI()

    }, [])
    console.log(res)
    return (
        <>
            <DataTable columns={columm} rows={Array.isArray(res) ? res : []} onCreate={() => {
                navigate("/quanlynhansu/nhansu/add")
            }}
                onView="/quanlynhansu/nhansu/info"
            />
            <Loading open={isLoading} />
        </>
    )
}

export default HomeNhanSu