const navigateRouter = (phongBan, navigate) => {
    switch (phongBan) {
        case 0:
            navigate("/")
        case 1:
            navigate("/quanlynhansu")
            break;
        case 2:
            navigate("/quanlyketoan")
            break;
        case 4:
            navigate("/quanlybanhang")
            break;
        case 6:
            navigate("/quanlymuahang")
            break;
        case 8:
            navigate("/quanlykho")
            break;
        case 10:
            navigate("/quanlysanxuat")
            break;
        default:
            navigate("/error")
    }
}

export default navigateRouter