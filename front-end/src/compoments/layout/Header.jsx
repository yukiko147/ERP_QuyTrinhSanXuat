import { createElement, useEffect, useMemo, useRef, useState } from "react";
import {
    HiMiniBell,
    HiMiniChevronDown,
    HiMiniChevronRight,
    HiMiniMagnifyingGlass,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const performanceTrend = [
    { label: "T2", value: 45 },
    { label: "T3", value: 58 },
    { label: "T4", value: 62 },
    { label: "T5", value: 78 },
    { label: "T6", value: 84 },
    { label: "T7", value: 69 },
    { label: "CN", value: 91 },
];


const phongBanSelect = (phongBan) => {
    switch (phongBan) {
        case 0:
            return "Quản trị"
        case 1:
            return "Nhân sự"
        case 2:
            return "Kế toán"
        case 4:
            return "Bán hàng"
        case 6:
            return "Mua hàng"
        case 8:
            return "Kho"
        case 10:
            return "Sản xuất"
    }
}
const Header = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const profileRef = useRef(null);
    const account1 = JSON.parse(localStorage.getItem("Account")) || {};

    const todayLabel = useMemo(
        () =>
            new Intl.DateTimeFormat("vi-VN", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }).format(new Date()),
        []
    );

    useEffect(() => {
        if (typeof document === "undefined") return;
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [isDarkMode]);

    useEffect(() => {
        if (typeof document === "undefined") return undefined;
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const sidebarWidth = useMemo(
        () => (isSidebarCollapsed ? "w-20" : "w-72"),
        [isSidebarCollapsed]
    );

    const toggleMenu = (key) => {
        // hiện chưa dùng, giữ nguyên logic như bản gốc
        setOpenMenus((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    const navigate = useNavigate();
    const dangxuat = () => {
        localStorage.removeItem("Account");
        Cookies.remove("AccesToken", { path: "/" });
        navigate("/login");
    };

    return (
        <>
            <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/70 bg-white/90 px-6 py-3 shadow-sm shadow-slate-900/5 backdrop-blur-md transition-colors duration-300 dark:border-slate-800/60 dark:bg-slate-900/85">
                {/* LEFT: Title + breadcrumb */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        <span>Bảng điều khiển</span>
                        <HiMiniChevronRight className="text-slate-500" />
                        <span className="text-slate-700 dark:text-slate-200">
                            Tổng quan
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                            DoAnERP Workspace
                        </h1>
                        <span className="relative inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm dark:bg-emerald-500/15 dark:text-emerald-200">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            Realtime
                        </span>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {todayLabel}
                    </p>
                </div>

                {/* RIGHT: Search + actions + profile */}
                <div className="flex flex-1 flex-wrap items-center justify-end gap-3">
                    {/* Search (desktop) */}
                    <div className="hidden md:flex items-center rounded-full bg-slate-100/80 px-3 py-1.5 text-xs text-slate-500 shadow-inner ring-1 ring-slate-200/60 transition focus-within:ring-slate-400/80 dark:bg-slate-800/80 dark:text-slate-300 dark:ring-slate-700/80 dark:focus-within:ring-slate-500">
                        <HiMiniMagnifyingGlass className="mr-2 text-slate-400 dark:text-slate-500" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Tìm kiếm nhanh..."
                            className="w-40 bg-transparent text-xs text-slate-700 placeholder:text-slate-400 outline-none dark:text-slate-100"
                        />
                    </div>

                    {/* Notification */}
                    <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-700">
                        <HiMiniBell className="text-lg" />
                        <span className="absolute -right-0.5 -top-0.5 inline-flex h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
                    </button>

                    {/* Profile */}
                    <div ref={profileRef} className="relative">
                        <button
                            className="flex items-center space-x-3 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-sm shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                            onClick={() => setIsProfileOpen((prev) => !prev)}
                        >
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand/70 to-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-900/40">
                                TN
                            </span>
                            <span className="hidden text-left leading-tight text-slate-700 dark:text-slate-100 md:block">
                                <span className="block text-sm font-semibold">
                                    {account1.tenNhanSu}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    {phongBanSelect(account1.phongBan)}
                                </span>
                            </span>
                            <HiMiniChevronDown className="text-base text-slate-400 transition-transform duration-200 group-open:rotate-180" />
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white/95 p-2 text-sm shadow-xl shadow-slate-900/10 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/95">
                                <button className="block w-full rounded-xl px-3 py-2 text-left text-slate-700 transition hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-700/80">
                                    Hồ sơ cá nhân
                                </button>
                                <button className="block w-full rounded-xl px-3 py-2 text-left text-slate-700 transition hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-700/80">
                                    Cài đặt hệ thống
                                </button>
                                <button
                                    className="block w-full rounded-xl px-3 py-2 text-left text-red-500 transition hover:bg-red-50 dark:hover:bg-slate-700/80"
                                    onClick={dangxuat}
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
