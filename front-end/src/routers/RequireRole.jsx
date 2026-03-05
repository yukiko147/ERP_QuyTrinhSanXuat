// RequireRole.jsx
import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const RequireRole = ({ allowedDepartments }) => {
    const location = useLocation();

    const accountStr = localStorage.getItem("Account");
    const token = Cookies.get("AccesToken");

    // Chưa đăng nhập -> đá về login
    if (!accountStr || !token) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    let account;
    try {
        account = JSON.parse(accountStr);
    } catch (e) {
        return <Navigate to="/login" replace />;
    }

    const phongBanCode = account?.phongBan; // ví dụ: 1, 4, 10, 0

    // Nếu không có phongBanCode -> coi như lỗi, cho về login
    if (phongBanCode === undefined || phongBanCode === null) {
        return <Navigate to="/login" replace />;
    }

    const isAdmin = phongBanCode === 0;
    const isCorrectDept = phongBanCode === allowedDepartments;

    // Nếu không phải đúng phòng ban và cũng không phải admin -> 404
    if (!isCorrectDept && !isAdmin) {
        return <Navigate to="/error" replace />;

    }



    // OK -> render tiếp các route con
    return <Outlet />;
};

export default RequireRole;
