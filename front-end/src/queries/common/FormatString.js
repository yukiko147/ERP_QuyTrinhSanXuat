export function formatCurrency(value) {
    return value.toLocaleString("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
}


export const formatDate = (date, type = "input") => {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");

    if (type === "input") return `${yyyy}-${mm}-${dd}`;
    if (type === "vn") return `${dd}/${mm}/${yyyy}`;

    return d.toISOString();
};

export const createTimeId = (prefix = "") => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    let id = `${year}.${month}.${day}-${hours}.${minutes}.${seconds}`;


    if (prefix) {
        id = `${prefix}-${id}`;
    }

    return id;
}



export const toDisplayDMY = (iso) => {
    // iso: "yyyy-mm-dd" or "yyyy-mm-ddTHH:mm:ss..."
    if (!iso) return "";
    const s = iso.slice(0, 10);
    const [y, m, d] = s.split("-");
    if (!y || !m || !d) return "";
    return `${d}/${m}/${y}`;
};

export const toISOYMD = (dmy) => {
    // dmy: "dd/mm/yyyy"
    if (!dmy) return "";
    const [d, m, y] = dmy.split("/");
    if (!d || !m || !y) return "";
    const dd = d.padStart(2, "0");
    const mm = m.padStart(2, "0");
    const yyyy = y;
    return `${yyyy}-${mm}-${dd}`;
};

export const formatDMY = (raw) => {
    // keep digits only, format as dd/mm/yyyy progressively
    const digits = String(raw || "").replace(/\D/g, "").slice(0, 8); // ddmmyyyy
    const d = digits.slice(0, 2);
    const m = digits.slice(2, 4);
    const y = digits.slice(4, 8);
    let out = d;
    if (m) out += `/${m}`;
    if (y) out += `/${y}`;
    return out;
};
