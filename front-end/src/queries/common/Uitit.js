export const PhongBanRender = (phongBanCode) => {
    switch (phongBanCode) {
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
            return "Sản xuất "
    }
}


export const generateRowId = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
};

export function ddMMyyyyToIso(d) {
    const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(d);
    if (!m) return null;
    const [, dd, mm, yyyy] = m;
    return `${yyyy}-${mm}-${dd}T00:00:00+07:00`;
}
