import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
    HiMiniBars3,
    HiMiniChevronDown,
    HiMiniSquares2X2,
} from "react-icons/hi2";

import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DescriptionIcon from "@mui/icons-material/Description";
import CalculateIcon from "@mui/icons-material/Calculate";
import InventoryIcon from "@mui/icons-material/Inventory";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import OutboxIcon from "@mui/icons-material/Outbox";
import HandymanIcon from "@mui/icons-material/Handyman";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

// const module = [
//     {
//         moduleName: "Quản lý nhân sự",
//         key: "quanlynhansu",
//         role: 1,
//         navigation: [
//             { key: 'nhansu', label: 'Nhân sự', icon: PersonIcon, to: '/nhan-su' },
//             { key: 'bangluong', label: 'Bảng lương', icon: AttachMoneyIcon, to: '/bang-luong' },
//             {
//                 key: 'hopdong',
//                 label: 'Hợp đồng',
//                 icon: DescriptionIcon,
//                 to: '/hop-dong',
//                 children: [
//                     { key: 'orders', label: 'Đơn hàng', to: '/hop-dong/don-hang' },
//                     { key: 'invoices', label: 'Hóa đơn', to: '/hop-dong/hoa-don' },
//                     { key: 'shipments', label: 'Vận chuyển', to: '/hop-dong/van-chuyen' },
//                 ],
//             },
//             {
//                 key: 'nghiphep',
//                 label: 'Nghỉ phép',
//                 icon: HolidayVillageIcon,
//                 to: '/nghi-phep',
//                 children: [
//                     { key: 'tasks', label: 'Nhiệm vụ', to: '/nghi-phep/nhiem-vu' },
//                     { key: 'projects', label: 'Dự án', to: '/nghi-phep/du-an' },
//                 ],
//             },
//             { key: 'bangcong', label: 'Bảng công', icon: BarChartIcon, to: '/bang-cong' },
//             { key: 'phatthuong', label: 'Phạt thưởng  ', icon: CurrencyExchangeIcon, to: '/phat-thuong' },
//             { key: 'phucap', label: 'Phụ cấp', icon: SensorOccupiedIcon, to: '/phu-cap' },
//         ]
//     },

//     {
//         moduleName: "Quản lý bán hàng",
//         key: "quanlybanhang",
//         role: 4,
//         navigation: [
//             { key: 'khachhang', label: 'Khách hàng', icon: PersonIcon, to: '/khach-hang' },
//             { key: 'donhang', label: 'Đơn hàng', icon: AttachMoneyIcon, to: '/don-hang' },
//         ]
//     },
//     {
//         moduleName: "Quản lý mua hàng",
//         key: "quanlymuahang",
//         role: 6,
//         navigation: [
//             { key: 'khachhang', label: 'Khách hàng', icon: PersonIcon, to: '/khach-hang' },
//             { key: 'donhang', label: 'Đơn hàng', icon: AttachMoneyIcon, to: '/don-hang' },
//         ]
//     },
//     {
//         moduleName: "Quản lý kho",
//         key: "quanlykho",
//         role: 6,
//         navigation: [
//             { key: 'khachhang', label: 'Khách hàng', icon: PersonIcon, to: '/khach-hang' },
//             { key: 'donhang', label: 'Đơn hàng', icon: AttachMoneyIcon, to: '/don-hang' },
//         ]
//     },
//     {
//         moduleName: "Quản lý sản xuất",
//         key: "quanlysanxuat",
//         role: 10,
//         navigation: [
//             { key: 'khachhang', label: 'Khách hàng', icon: PersonIcon, to: '/khach-hang' },
//             { key: 'donhang', label: 'Đơn hàng', icon: AttachMoneyIcon, to: '/don-hang' },
//         ]
//     },
//     {
//         moduleName: "Quản lý kế toán",
//         key: "quanlyketoan",
//         role: 2,
//         navigation: [
//             { key: 'khachhang', label: 'Khách hàng', icon: PersonIcon, to: '/khach-hang' },
//             { key: 'donhang', label: 'Đơn hàng', icon: AttachMoneyIcon, to: '/don-hang' },
//         ]
//     },

// ]
// CẤU HÌNH MODULE
const modules = [
    {
        moduleName: "Quản lý nhân sự",
        key: "quanlynhansu",
        role: 1,
        navigation: [
            {
                key: "nhansu",
                label: "Nhân sự",
                icon: PersonIcon,
                to: "/quanlynhansu/nhansu",
            },
        ],
    },
    {
        moduleName: "Quản lý bán hàng",
        key: "quanlybanhang",
        role: 4,
        navigation: [
            {
                key: "khachhang",
                label: "Khách hàng",
                icon: PeopleAltIcon,
                to: "/quanlybanhang/khachhang",
            },
            {
                key: "baogia",
                label: "Báo giá",
                icon: RequestQuoteIcon,
                to: "/quanlybanhang/baogia"
            }
            ,
            {
                key: "donhang",
                label: "Đơn hàng",
                icon: ShoppingCartIcon,
                to: "/quanlybanhang/donhang",
            },
            {
                key: "hoadonban",
                label: "Hóa đơn bán",
                icon: ReceiptLongIcon,
                to: "/quanlybanhang/hoadonban"
            }
        ],
    },
    {
        moduleName: "Quản lý mua hàng",
        key: "quanlymuahang",
        role: 6,
        navigation: [
            {
                key: "nhacungcap",
                label: "Nhà cung cấp",
                icon: ApartmentIcon,
                to: "/quanlymuahang/nhacungcap",
            },
            {
                key: "donnhap",
                label: "Đơn nhập",
                labelShort: "Đơn nhập",
                icon: DescriptionIcon,
                to: "/quanlymuahang/donnhap",
            },
        ],
    },
    {
        moduleName: "Quản lý sản xuất",
        key: "quanlysanxuat",
        role: 10,
        navigation: [
            {
                key: "lenhsanxuat",
                label: "Lệnh sản xuất",
                icon: HandymanIcon,
                to: "/quanlysanxuat/lenhsanxuat",
            },
            // {
            //     key: "congthuc",
            //     label: "Công thức",
            //     icon: CalculateIcon,
            //     to: "/quanlymuahang/muahang",
            // },
        ],
    },
    {
        moduleName: "Quản lý kho",
        key: "quanlykho",
        role: 8,
        navigation: [
            {
                key: "kho",
                label: "Kho",
                icon: WarehouseIcon,
                to: "/quanlykho/kho",
            },
            {
                key: "sanpham",
                label: "Sản phẩm",
                icon: InventoryIcon,
                to: "/quanlykho/sanpham",
            },
            {
                key: "vattu",
                label: "Vật tư",
                icon: HomeRepairServiceIcon,
                to: "/quanlykho/vattu",
            },
            {
                key: "phieunhap",
                label: "Phiếu nhập",
                icon: MoveToInboxIcon,
                to: "/quanlykho/phieunhap",
            },
            {
                key: "phieuxuat",
                label: "Phiếu xuất",
                icon: OutboxIcon,
                to: "/quanlykho/phieuxuat",
            },
        ],
    },
];

const Sidebar = (props) => {
    const [openMenus, setOpenMenus] = useState(new Set(["hopdong", "nghiphep"]));
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const location = useLocation();

    // Lấy account từ localStorage, chống lỗi null
    const account = useMemo(() => {
        try {
            return JSON.parse(localStorage.getItem("Account")) || {};
        } catch {
            return {};
        }
    }, []);

    // Tính chiều rộng sidebar
    const sidebarWidth = useMemo(
        () => (isSidebarCollapsed ? "w-16" : "w-56"),
        [isSidebarCollapsed]
    );

    // Danh sách module được phép theo role
    const allowedModules = useMemo(() => {
        // phongBan === 0 => admin, thấy tất cả
        if (!account || account.phongBan === 0 || account.phongBan == null) {
            return modules;
        }
        return modules.filter((mod) => mod.role === account.phongBan);
    }, [account]);

    const toggleMenu = (key) => {
        setOpenMenus((prev) => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    };

    // Tự mở menu cha nếu có child trùng path hiện tại
    useEffect(() => {
        const currentPath = location.pathname;
        modules.forEach((mod) => {
            mod.navigation.forEach((item) => {
                if (item.children) {
                    const hasActiveChild = item.children.some(
                        (child) => child.to === currentPath
                    );
                    if (hasActiveChild) {
                        setOpenMenus((prev) => {
                            const next = new Set(prev);
                            next.add(item.key);
                            return next;
                        });
                    }
                }
            });
        });
    }, [location.pathname]);

    return (
        <aside
            className={`${sidebarWidth} fixed inset-y-0 left-0 z-40 flex flex-col bg-sidebar text-slate-200 transition-all duration-300`}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
                <div className="flex items-center space-x-3">
                    {!isSidebarCollapsed && (
                        <>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-white">
                                <HiMiniSquares2X2 className="text-xl" />
                            </div>
                            <div>
                                <p className="text-sm uppercase tracking-widest text-slate-400">
                                    DoAnERP
                                </p>
                                <p className="text-base font-semibold">
                                    Quản trị
                                </p>
                            </div>
                        </>
                    )}
                </div>
                <button
                    className="rounded-lg bg-slate-800 p-2 text-slate-100 hover:bg-slate-700"
                    onClick={() => {
                        props.onToggleCollapse?.((prev) => !prev);
                        setSidebarCollapsed((prev) => !prev);
                    }}
                >
                    <HiMiniBars3 className="text-xl" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 pr-2 custom-scrollbar">
                {allowedModules.map((mod) => (
                    <div key={mod.key} className="mb-4">
                        {/* Tên module */}
                        <div className="overflow-hidden">
                            <span
                                className={`block px-3 pt-5 pb-1 text-xs font-semibold uppercase tracking-widest text-slate-500 transition-all duration-500 ease-out origin-left ${isSidebarCollapsed
                                    ? "opacity-60"
                                    : "opacity-100"
                                    }`}
                            >
                                <span
                                    className={
                                        isSidebarCollapsed
                                            ? "inline-block max-w-12 overflow-hidden text-ellipsis whitespace-nowrap"
                                            : ""
                                    }
                                >
                                    {mod.moduleName}
                                </span>
                            </span>
                        </div>

                        {/* Items */}
                        <div className="mt-5 space-y-1.5">
                            {mod.navigation.map((item) => {
                                const { key, label, icon: Icon, to, children } = item;
                                const isOpen = openMenus.has(key);

                                // Active nếu trùng path hoặc có child active
                                const isActive =
                                    location.pathname === to ||
                                    children?.some(
                                        (c) => c.to === location.pathname
                                    );

                                return (
                                    <div key={key} className="group">
                                        {/* Item cha */}
                                        <NavLink
                                            to={to || "#"}
                                            className={({
                                                isActive: navActive,
                                            }) =>
                                                `flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium
                        transition-all duration-300 ease-out group-hover:translate-x-1
                        ${isActive || navActive
                                                    ? "bg-gradient-to-r from-brand/30 to-brand/10 text-white shadow-lg shadow-brand/20 border border-brand/20"
                                                    : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                                                }`
                                            }
                                            onClick={(e) => {
                                                if (children) {
                                                    e.preventDefault();
                                                    toggleMenu(key);
                                                }
                                            }}
                                            end
                                        >
                                            <span className="flex items-center space-x-3">
                                                {Icon && (
                                                    <Icon
                                                        className={`text-lg shrink-0 transition-all duration-300
                              ${isActive
                                                                ? "text-brand drop-shadow-glow"
                                                                : ""
                                                            }
                              group-hover:scale-110
                            `}
                                                    />
                                                )}
                                                <span
                                                    className={`
                            transition-all duration-500 ease-out origin-left
                            ${isSidebarCollapsed
                                                            ? "w-0 opacity-0 scale-0"
                                                            : "w-auto opacity-100 scale-100"
                                                        }
                          `}
                                                >
                                                    {label}
                                                </span>
                                            </span>

                                            {!isSidebarCollapsed && children && (
                                                <HiMiniChevronDown
                                                    className={`
                            text-sm transition-transform duration-300 ease-out
                            ${isOpen
                                                            ? "rotate-180 text-brand"
                                                            : "text-slate-400"
                                                        }
                          `}
                                                />
                                            )}
                                        </NavLink>

                                        {/* Submenu */}
                                        {children && (
                                            <div
                                                className={`
                          overflow-hidden transition-all duration-400 ease-out
                          ${isOpen && !isSidebarCollapsed
                                                        ? "max-h-96 opacity-100 mt-2"
                                                        : "max-h-0 opacity-0 mt-0"
                                                    }
                        `}
                                            >
                                                <div className="space-y-1 pl-9 border-l-2 border-slate-700">
                                                    {children.map((child) => (
                                                        <NavLink
                                                            key={child.key}
                                                            to={child.to}
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                `block w-full rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 hover:translate-x-1
                                ${isActive
                                                                    ? "bg-slate-800/90 text-white font-medium shadow-sm backdrop-blur-sm"
                                                                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                                                                }`
                                                            }
                                                            end
                                                        >
                                                            {child.label}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
