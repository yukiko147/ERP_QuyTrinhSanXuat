// LoginPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, post } from "../queries/apis/AxiosNghiepVu";
import Cookies from "js-cookie";
import navigateRouter from "../queries/common/NavigatePhongBan";
import Loading from "../compoments/ui/Loading";
import Swal from "sweetalert2";

const LoginPage = () => {
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const navigate = useNavigate();

    const [mode, setMode] = useState("login"); // "login" | "register"

    const [form, setForm] = useState({
        tenDangNhap: "",
        hoTenNhanSu: "",
        matKhau: "",
        gioiTinh: 1,
        diaChi: "",
        email: "",
        sdt: "",
    });

    const [regNhapLaiMatKhau, setRegNhapLaiMatKhau] = useState("");

    const handleSubmit = async () => {
        if (tenDangNhap === "" || matKhau === "") return;

        const res = await login(tenDangNhap, matKhau, setIsloading);
        if (res) {
            localStorage.setItem("Account", JSON.stringify(res));
            navigateRouter(res.phongBan, navigate);
            Swal.fire({
                title: "Thông báo !!!",
                text: "Đăng nhập thành công !!!",
                icon: "success"
            })
        }
        console.log(res);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSubmit();
    };

    const handleKeyDownRegister = (e) => {
        if (e.key === "Enter") handleRegister();
    };

    const handleRegister = async () => {
        // validate theo form (đúng dữ liệu bạn submit)
        if (
            form.hoTenNhanSu.trim() === "" ||
            form.tenDangNhap.trim() === "" ||
            form.matKhau.trim() === "" ||
            regNhapLaiMatKhau.trim() === ""
        ) {
            Swal.fire({
                title: "Thiếu thông tin!",
                text: "Vui lòng nhập đầy đủ các trường bắt buộc.",
                icon: "warning",
            });
            return;
        }

        if (form.matKhau !== regNhapLaiMatKhau) {
            Swal.fire({
                title: "Mật khẩu không khớp!",
                text: "Vui lòng nhập lại mật khẩu chính xác.",
                icon: "error",
            });
            return;
        }

        const res = await post("/QuanLyNhanSu/NhanSu/KhoiTao", form, setIsloading);

        if (res === true) {
            Swal.fire({
                title: "Thông báo !",
                text: "Khởi tạo thành công !",
                icon: "success",
            });

            // reset form register
            setForm({
                tenDangNhap: "",
                hoTenNhanSu: "",
                matKhau: "",
                gioiTinh: 1,
                diaChi: "",
                email: "",
                sdt: "",
            });
            setRegNhapLaiMatKhau("");

            // quay về login
            setMode("login");
        }
    };

    useEffect(() => {
        if (Cookies.get("AccesToken")) {
            navigate("/quanlynhansu/nhansu");
        }
    }, [navigate]);

    const disableRegister =
        isLoading ||
        form.hoTenNhanSu.trim() === "" ||
        form.tenDangNhap.trim() === "" ||
        form.matKhau.trim() === "" ||
        regNhapLaiMatKhau.trim() === "" ||
        form.matKhau !== regNhapLaiMatKhau;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-slate-900/80 border border-slate-700/70 rounded-3xl shadow-2xl shadow-black/40 p-6 sm:p-8 backdrop-blur-xl">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            {mode === "login" ? "Đăng nhập hệ thống" : "Đăng ký tài khoản"}
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-400 mt-2">
                            {mode === "login"
                                ? "Nhập tên đăng nhập và mật khẩu để tiếp tục làm việc."
                                : "Nhập thông tin để tạo tài khoản mới."}
                        </p>
                    </div>

                    <div className="mb-5 grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => setMode("login")}
                            className={
                                mode === "login"
                                    ? "rounded-2xl py-2 text-sm font-semibold text-white bg-slate-800 border border-slate-600/70 shadow-sm"
                                    : "rounded-2xl py-2 text-sm font-semibold text-slate-300 bg-slate-900/40 border border-slate-700/60 hover:bg-slate-800/50 transition"
                            }
                        >
                            Đăng nhập
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode("register")}
                            className={
                                mode === "register"
                                    ? "rounded-2xl py-2 text-sm font-semibold text-white bg-slate-800 border border-slate-600/70 shadow-sm"
                                    : "rounded-2xl py-2 text-sm font-semibold text-slate-300 bg-slate-900/40 border border-slate-700/60 hover:bg-slate-800/50 transition"
                            }
                        >
                            Khởi tạo tài khoản
                        </button>
                    </div>

                    {mode === "login" && (
                        <div className="space-y-4">
                            <div className="space-y-1.5 text-sm">
                                <label htmlFor="tenDangNhap" className="block text-slate-200 font-medium">
                                    Tên đăng nhập
                                </label>
                                <input
                                    id="tenDangNhap"
                                    type="text"
                                    value={tenDangNhap}
                                    onChange={(e) => setTenDangNhap(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Nhập tên đăng nhập..."
                                    autoComplete="username"
                                    className="w-full rounded-2xl bg-slate-900/90 border border-slate-700/80 px-3 py-2.5 text-sm text-slate-100
                  placeholder:text-slate-500 outline-none
                  focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-400
                  hover:border-slate-500 transition-all duration-200"
                                />
                            </div>

                            <div className="space-y-1.5 text-sm">
                                <label htmlFor="matKhau" className="block text-slate-200 font-medium">
                                    Mật khẩu
                                </label>
                                <input
                                    id="matKhau"
                                    type="password"
                                    value={matKhau}
                                    onChange={(e) => setMatKhau(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Nhập mật khẩu..."
                                    autoComplete="current-password"
                                    className="w-full rounded-2xl bg-slate-900/90 border border-slate-700/80 px-3 py-2.5 text-sm text-slate-100
                  placeholder:text-slate-500 outline-none
                  focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-400
                  hover:border-slate-500 transition-all duration-200"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isLoading || tenDangNhap.trim() === "" || matKhau.trim() === ""}
                                className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-semibold text-white
                bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400
                shadow-lg shadow-indigo-500/40
                hover:from-indigo-400 hover:via-sky-400 hover:to-cyan-300
                disabled:opacity-60 disabled:cursor-not-allowed
                transition-all duration-300"
                            >
                                {isLoading ? (
                                    <span className="inline-flex items-center gap-2">
                                        <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        Đang đăng nhập...
                                    </span>
                                ) : (
                                    "Đăng nhập"
                                )}
                            </button>
                            {/* 
                            <p className="pt-1 text-center text-xs text-slate-400">
                                Chưa có tài khoản?{" "}
                                <button
                                    type="button"
                                    onClick={() => setMode("register")}
                                    className="font-semibold text-sky-300 hover:text-sky-200 transition"
                                >
                                    Khởi tạo tài khoản
                                </button>
                            </p> */}
                        </div>
                    )}

                    {mode === "register" && (
                        <div className="space-y-4">
                            <div className="space-y-1.5 text-sm">
                                <label className="block text-slate-200 font-medium">Họ và tên</label>
                                <input
                                    type="text"
                                    value={form.hoTenNhanSu}
                                    onChange={(e) => setForm((prev) => ({ ...prev, hoTenNhanSu: e.target.value }))}
                                    onKeyDown={handleKeyDownRegister}
                                    placeholder="Nhập họ và tên..."
                                    className="w-full rounded-2xl bg-slate-900/90 border border-slate-700/80 px-3 py-2.5 text-sm text-slate-100
                  placeholder:text-slate-500 outline-none
                  focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-400
                  hover:border-slate-500 transition-all duration-200"
                                />
                            </div>

                            <div className="space-y-1.5 text-sm">
                                <label className="block text-slate-200 font-medium">Địa chỉ</label>
                                <input
                                    type="text"
                                    value={form.diaChi}
                                    onChange={(e) => setForm((prev) => ({ ...prev, diaChi: e.target.value }))}
                                    onKeyDown={handleKeyDownRegister}
                                    placeholder="Nhập địa chỉ..."
                                    className="w-full rounded-2xl bg-slate-900/90 border border-slate-700/80 px-3 py-2.5 text-sm text-slate-100
                  placeholder:text-slate-500 outline-none
                  focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-400
                  hover:border-slate-500 transition-all duration-200"
                                />
                            </div>

                            <div className="space-y-1.5 text-sm">
                                <label className="block text-slate-200 font-medium">SĐT</label>
                                <input
                                    type="text"
                                    value={form.sdt}
                                    onChange={(e) => setForm((prev) => ({ ...prev, sdt: e.target.value }))}
                                    onKeyDown={handleKeyDownRegister}
                                    placeholder="Nhập số điện thoại..."
                                    className="w-full rounded-2xl bg-slate-900/90 border border-slate-700/80 px-3 py-2.5 text-sm text-slate-100
                  placeholder:text-slate-500 outline-none
                  focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-400
                  hover:border-slate-500 transition-all duration-200"
                                />
                            </div>

                            <div className="space-y-1.5 text-sm">
                                <label className="block text-slate-200 font-medium">Email</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                                    onKeyDown={handleKeyDownRegister}
                                    placeholder="Nhập email..."
                                    autoComplete="email"
                                    className="w-full rounded-2xl bg-slate-900/90 border border-slate-700/80 px-3 py-2.5 text-sm text-slate-100
                  placeholder:text-slate-500 outline-none
                  focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-400
                  hover:border-slate-500 transition-all duration-200"
                                />
                            </div>

                            <div className="space-y-1.5 text-sm">
                                <label className="block text-slate-200 font-medium">Tên đăng nhập</label>
                                <input
                                    type="text"
                                    value={form.tenDangNhap}
                                    onChange={(e) => setForm((prev) => ({ ...prev, tenDangNhap: e.target.value }))}
                                    onKeyDown={handleKeyDownRegister}
                                    placeholder="Nhập tên đăng nhập..."
                                    autoComplete="username"
                                    className="w-full rounded-2xl bg-slate-900/90 border border-slate-700/80 px-3 py-2.5 text-sm text-slate-100
                  placeholder:text-slate-500 outline-none
                  focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-400
                  hover:border-slate-500 transition-all duration-200"
                                />
                            </div>

                            <div className="space-y-1.5 text-sm">
                                <label className="block text-slate-200 font-medium">Mật khẩu</label>
                                <input
                                    type="password"
                                    value={form.matKhau}
                                    onChange={(e) => setForm((prev) => ({ ...prev, matKhau: e.target.value }))}
                                    onKeyDown={handleKeyDownRegister}
                                    placeholder="Nhập mật khẩu..."
                                    autoComplete="new-password"
                                    className="w-full rounded-2xl bg-slate-900/90 border border-slate-700/80 px-3 py-2.5 text-sm text-slate-100
                  placeholder:text-slate-500 outline-none
                  focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-400
                  hover:border-slate-500 transition-all duration-200"
                                />
                            </div>

                            <div className="space-y-1.5 text-sm">
                                <label className="block text-slate-200 font-medium">Nhập lại mật khẩu</label>
                                <input
                                    type="password"
                                    value={regNhapLaiMatKhau}
                                    onChange={(e) => setRegNhapLaiMatKhau(e.target.value)}
                                    onKeyDown={handleKeyDownRegister}
                                    placeholder="Nhập lại mật khẩu..."
                                    autoComplete="new-password"
                                    className="w-full rounded-2xl bg-slate-900/90 border border-slate-700/80 px-3 py-2.5 text-sm text-slate-100
                  placeholder:text-slate-500 outline-none
                  focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-400
                  hover:border-slate-500 transition-all duration-200"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={handleRegister}
                                disabled={disableRegister}
                                className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-semibold text-white
                bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400
                shadow-lg shadow-emerald-500/30
                hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-300
                disabled:opacity-60 disabled:cursor-not-allowed
                transition-all duration-300"
                            >
                                {isLoading ? (
                                    <span className="inline-flex items-center gap-2">
                                        <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        Đang tạo tài khoản...
                                    </span>
                                ) : (
                                    "Đăng ký"
                                )}
                            </button>

                            <p className="pt-1 text-center text-xs text-slate-400">
                                Đã có tài khoản?{" "}
                                <button
                                    type="button"
                                    onClick={() => setMode("login")}
                                    className="font-semibold text-sky-300 hover:text-sky-200 transition"
                                >
                                    Đăng nhập
                                </button>
                            </p>
                        </div>
                    )}

                    <p className="mt-6 text-[11px] text-center text-slate-500">
                        © {new Date().getFullYear()} Your Company. All rights reserved.
                    </p>
                </div>
            </div>

            <Loading open={isLoading} />
        </div>
    );
};

export default LoginPage;
