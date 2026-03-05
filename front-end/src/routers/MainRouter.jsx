import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import DashBoard from "../layouts/Dashboard"
import Blank from "../layouts/Blank"
import LoginForm from "../pages/LoginPage"
import HomeNhanSu from "../pages/quanlynhansu/nhansu/Home"
import { useEffect } from "react"
import Cookies from 'js-cookie';
import CreateNhanSu from "../pages/quanlynhansu/nhansu/Create"
import NotFound404 from "../pages/404Page"
import CreateDonHang from "../pages/quanlybanhang/donhang/Create"
import HomeLenhSanXuat from "../pages/quanlysanxuat/lenhsanxuat/Home"
import CreateKhachHang from "../pages/quanlybanhang/khachhang/Create"
import CreateLenhSanXuat from "../pages/quanlysanxuat/lenhsanxuat/Create"
import HomeKhachHang from "../pages/quanlybanhang/khachhang/Home"
import RequireRole from "./RequireRole"
import HomeQuanLyNhanSu from "../pages/quanlynhansu/HomeQuanLyNhanSu"
import navigateRouter from "../queries/common/NavigatePhongBan"
import ViewNhanSu from "../pages/quanlynhansu/nhansu/View"
import HomeQuanLyBanHang from "../pages/quanlybanhang/HomeQuanLyBanHang"
import HomeDonHang from "../pages/quanlybanhang/donhang/Home"
import HomeQuanTri from "../pages/quantri/HomeQuantri"
import HomeNhaCungCap from "../pages/quanlymuahang/nhacungcap/Home"
import CreateNhaCungCap from "../pages/quanlymuahang/nhacungcap/Create"
import HomeDonNhap from "../pages/quanlymuahang/donnhap/Home"
import CreateDonNhap from "../pages/quanlymuahang/donnhap/Create"
import HomeSanPham from "../pages/quanlykho/sanpham/Home"
import CreateSanPham from "../pages/quanlykho/sanpham/Create"
import ViewDonHang from "../pages/quanlybanhang/donhang/View"
import CreatePhuongThuc from "../pages/quanlybanhang/donhang/CreatePhuongThuc"
import ViewPhuongThucInfo from "../pages/quanlybanhang/donhang/ViewPhuongThucInfo"
import ViewLenhSanXuat from "../pages/quanlysanxuat/lenhsanxuat/View"
import HomeVatTu from "../pages/quanlykho/vattu/Home"
import CreateVattu from "../pages/quanlykho/vattu/Create"
import CreateHoaDonBan from "../pages/quanlybanhang/hoadon/Create"
import HomeHoaDonBan from "../pages/quanlybanhang/hoadon/Home"
import ViewHoaDonBan from "../pages/quanlybanhang/hoadon/View"
import CreateKho from "../pages/quanlykho/kho/Create"
import HomeKho from "../pages/quanlykho/kho/Home"
import CreatePhieuNhap from "../pages/quanlykho/phieunhap/Create"
import HomePhieuNhap from "../pages/quanlykho/phieunhap/Home"
import HomePhieuXuat from "../pages/quanlykho/phieuxuat/Home"
import HomeBaoGia from "../pages/quanlybanhang/baogia/Home"
import CreateBaoGia from "../pages/quanlybanhang/baogia/Create"
import ViewBaoGia from "../pages/quanlybanhang/baogia/View"
import HomeQuanLyKho from "../pages/quanlykho/HoneQuanLyKho"
import HomeMuaHang from "../pages/quanlymuahang/HomeMuaHang"
import HomeSanXuat from "../pages/quanlysanxuat/HomeQuanLySanXuat"
import ViewKho from "../pages/quanlykho/kho/View"
import ViewSanPham from "../pages/quanlykho/sanpham/View"
import ViewVattu from "../pages/quanlykho/vattu/View"
import ThanhToanPage from "../pages/quanlybanhang/hoadon/ThanhToanPage"
import ViewNhaCungCap from "../pages/quanlymuahang/nhacungcap/View"
import ViewPhieuNhap from "../pages/quanlykho/phieunhap/View"
import CreatePhieuXuat from "../pages/quanlykho/phieuxuat/Create"
import ViewPhieuXuat from "../pages/quanlykho/phieuxuat/View"
import ViewDonNhap from "../pages/quanlymuahang/donnhap/View"
import ViewKhachHang from "../pages/quanlybanhang/khachhang/View"
import HomeDVTinh from "../pages/quanlykho/quanlylo/Home"
import CreateDVTinh from "../pages/quanlykho/quanlylo/Create"




const MainRouter = () => {
    const navigate = useNavigate()
    const local = useLocation()
    useEffect(() => {
        const token = Cookies.get('AccesToken');
        if (!token || !localStorage.getItem("Account")) {
            navigate('/login', { replace: true });
        }
        if (local.pathname === "/") {
            const account = JSON.parse(localStorage.getItem("Account"))

            navigateRouter(account.phongBan, navigate)
        }
    }, [navigate])

    return (
        <>
            <Routes>
                <Route element={<DashBoard />}>
                    {/* Nhân Sự */}
                    <Route path="/" element={<RequireRole allowedDepartments={0} />}>
                        <Route index element={<HomeQuanTri />} />
                    </Route>
                    <Route path="quanlynhansu" element={<RequireRole allowedDepartments={1} />}>
                        <Route index element={<HomeQuanLyNhanSu />} />

                        <Route path="nhansu">
                            <Route index element={<HomeNhanSu />} />
                            <Route path="add" element={<CreateNhanSu />} />
                            <Route path="info/:id" element={<ViewNhanSu />} />
                        </Route>
                    </Route>
                    <Route path="quanlybanhang" element={<RequireRole allowedDepartments={4} />} >
                        <Route index element={<HomeQuanLyBanHang />} />
                        <Route path="donhang">
                            <Route index element={<HomeDonHang />} />
                            <Route path="add" element={<CreateDonHang />} />
                            <Route path="info/:id" element={<ViewDonHang />} />
                        </Route>
                        <Route path="baogia">
                            <Route index element={<HomeBaoGia />} />
                            <Route path="add" element={<CreateBaoGia />} />
                            <Route path="info/:id" element={<ViewBaoGia />} />
                        </Route>
                        <Route path="hoadonban" >
                            <Route index element={<HomeHoaDonBan />} />
                            <Route path="add/:donHangId" element={<CreateHoaDonBan />} />
                            <Route path="info/:maHD" element={<ViewHoaDonBan />} />
                            <Route path="thanhtoan/:maHD" element={<ThanhToanPage />} />
                        </Route>

                        <Route path="khachhang" >
                            <Route index element={<HomeKhachHang />} />
                            <Route path="add" element={<CreateKhachHang />} />
                            <Route path="info/:id" element={<ViewKhachHang />} />
                        </Route>
                        <Route path="phuongthucthanhtoan">
                            <Route path="add" element={<CreatePhuongThuc />} />
                            <Route path="info/:id" element={<ViewPhuongThucInfo />} />
                        </Route>
                    </Route>
                    <Route path="quanlysanxuat" element={<RequireRole allowedDepartments={10} />} >
                        <Route index element={<HomeSanXuat />} />
                        <Route path="lenhsanxuat">
                            <Route index element={<HomeLenhSanXuat />} />
                            <Route path="add" element={<CreateLenhSanXuat />} />
                            <Route path="info/:id" element={<ViewLenhSanXuat />} />
                        </Route>
                    </Route>
                    <Route path="quanlymuahang" element={<RequireRole allowedDepartments={6} />}>
                        <Route index element={<HomeMuaHang />} />
                        <Route path="nhacungcap">
                            <Route index element={<HomeNhaCungCap />} />
                            <Route path="add" element={<CreateNhaCungCap />} />
                            <Route path="info/:id" element={<ViewNhaCungCap />} />
                        </Route>

                        <Route path="donnhap">
                            <Route index element={<HomeDonNhap />} />
                            <Route path="add" element={<CreateDonNhap />} />
                            <Route path="info/:id" element={<ViewDonNhap />} />
                        </Route>
                    </Route>
                    <Route path="quanlykho" element={<RequireRole allowedDepartments={8} />}>
                        <Route index element={<HomeQuanLyKho />} />
                        <Route path="QuanLyLo">
                            <Route index element={<HomeDVTinh />} />
                            <Route path="add" element={<CreateDVTinh />} />

                        </Route>
                        <Route path="kho">
                            <Route index element={<HomeKho />} />
                            <Route path="add" element={<CreateKho />} />
                            <Route path="info/:id" element={<ViewKho />} />
                        </Route>
                        <Route path="sanpham">
                            <Route index element={<HomeSanPham />} />
                            <Route path="add" element={<CreateSanPham />} />
                            <Route path="info/:id" element={<ViewSanPham />} />
                        </Route>
                        <Route path="vattu">
                            <Route index element={<HomeVatTu />} />
                            <Route path="add" element={<CreateVattu />} />
                            <Route path="info/:id" element={<ViewVattu />} />
                        </Route>
                        <Route path="phieunhap">
                            <Route index element={<HomePhieuNhap />} />
                            <Route path="add" element={<CreatePhieuNhap />} />
                            <Route path="info/:id" element={<ViewPhieuNhap />} />
                        </Route>
                        <Route path="phieuxuat">
                            <Route index element={<HomePhieuXuat />} />
                            <Route path="add" element={<CreatePhieuXuat />} />
                            <Route path="info/:id" element={<ViewPhieuXuat />} />
                        </Route>
                    </Route>

                </Route>
                <Route element={<Blank />}>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="*" element={<NotFound404 />} />
                </Route>
            </Routes>
        </>
    )
}

export default MainRouter