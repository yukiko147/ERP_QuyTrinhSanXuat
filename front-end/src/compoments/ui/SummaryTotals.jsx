// SummaryTotals.jsx (Tailwind-only UI, giữ 100% logic tính toán)
// Lưu ý: bạn đang dùng formatCurrency từ dự án -> giữ nguyên import như cũ

import React, { useMemo } from "react";
import { formatCurrency } from "../../queries/common/FormatString";

const SummaryTotals = ({
    lines = [],
    currency = "đ",
    title = "Tóm tắt đơn hàng",
    taxt,
    isShowSumary,
}) => {
    const { itemCount, subtotal, totalDiscount, totalTax, grandTotal } = useMemo(() => {
        let subtotal = 0;
        let totalDiscount = 0;
        let totalTax = 0;
        let grandTotal = 0;
        let itemCount = 0;
        lines.forEach((line) => {
            // Hỗ trợ cả soLuongHang và soLuong để khớp với LinesTable
            const qty =
                Number(line.soLuongHang !== undefined ? line.soLuongHang : line.soLuong) || 0;

            const price = Number(line.donGia) || 0;
            const discountRate = Number(line.discount) || 0;
            const taxRate = Number(line.thue) || 0;

            const base = qty * price;
            const discountAmount = base * (discountRate / 100);
            const taxable = base - discountAmount;
            const taxAmount = taxable * (taxRate / 100);


            // Nếu row đã có sẵn thanhTien (LinesTable đã tính), ưu tiên dùng
            const lineTotal =
                line.thanhTien !== undefined && line.thanhTien !== null
                    ? Number(line.thanhTien) || 0
                    : taxable + taxAmount;

            subtotal += base;
            totalDiscount += discountAmount;
            totalTax += taxAmount;
            grandTotal += lineTotal;
            itemCount += qty;

        });

        return { itemCount, subtotal, totalDiscount, totalTax, grandTotal };
    }, [lines]);

    if (!isShowSumary) return null;

    // đảm bảo taxt không bị undefined => không NaN
    const taxPercent = Number(taxt) || 0;
    const totalPayable = grandTotal + (grandTotal * taxPercent) / 100;

    return (
        <div className="w-full max-w-sm rounded-md border border-slate-800 bg-slate-900/80 p-3 shadow-lg shadow-black/40 backdrop-blur md:p-4">
            {/* Header */}
            <div className="mb-2 flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                    <h2 className="text-xs font-semibold text-slate-50 md:text-sm">{title}</h2>
                    {/* <p className="text-[10px] leading-snug text-slate-400 md:text-[11px]">
                        Kiểm tra lại tổng tiền trước khi gửi cho khách hàng.
                    </p> */}
                </div>

                <span className="inline-flex items-center whitespace-nowrap rounded-md border border-sky-500/40 bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium text-sky-300">
                    <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
                    {itemCount} SP
                </span>
            </div>

            {/* Body */}
            <div className="space-y-1.5 text-[11px] text-slate-200 md:text-xs">
                {/* giữ đúng như code bạn: Tạm tính đang dùng grandTotal */}
                {/* <Row label="Tạm tính" value={formatCurrency(grandTotal)} /> */}

                <Row
                    label="Giảm giá"
                    value={totalDiscount > 0 ? "- " + formatCurrency(totalDiscount) : formatCurrency(0)}
                    valueClass="text-amber-300"
                />

                {/* giữ đúng logic bạn: “Tiền trước thuế” đang dùng grandTotal */}
                <Row
                    label="Tiền trước thuế"
                    value={formatCurrency(grandTotal)}
                    valueClass="text-sky-300"
                />
                {/* <Row
                    label="Tiền thuế"
                    value={formatCurrency((grandTotal * taxPercent) / 100)}
                    valueClass="text-sky-300"
                /> */}
                <Row
                    label="Tiền thuế"
                    value={formatCurrency(totalTax)}
                    valueClass="text-sky-300"
                />

                <div className="my-1.5 border-t border-dashed border-slate-700" />

                <Row
                    label="Tổng thanh toán"
                    value={formatCurrency(totalPayable)}
                    labelClass="text-[12px] font-semibold text-slate-100 md:text-[13px]"
                    valueClass="text-[12px] font-semibold text-emerald-300 md:text-sm"
                />
            </div>

            <p className="mt-2 text-[10px] leading-snug text-slate-500 md:text-[11px]">
                * Tổng thanh toán đã bao gồm thuế và chiết khấu trên từng dòng.
            </p>
        </div>
    );
};

const Row = ({ label, value, labelClass = "", valueClass = "" }) => {
    return (
        <div className="flex items-center justify-between gap-2">
            <span className={`flex-1 truncate text-[10px] text-slate-400 md:text-[11px] ${labelClass}`}>
                {label}
            </span>
            <span className={`tabular-nums whitespace-nowrap text-right text-[11px] ${valueClass}`}>
                {value}
            </span>
        </div>
    );
};

export default SummaryTotals;
