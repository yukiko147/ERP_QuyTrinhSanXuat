import React from "react";

const vnd = (n) =>
    new Intl.NumberFormat("vi-VN").format(Number(n || 0)) + " đ";

export default function OrderSummaryCard({
    itemsCount = 10,
    subtotal = 660000,
    discount = 0,
    taxPercent = 0, // %
}) {
    const taxAmount = (Number(subtotal || 0) * Number(taxPercent || 0)) / 100;
    const total = Number(subtotal || 0) - Number(discount || 0) + taxAmount;

    return (
        <div className="w-full max-w-md rounded-2xl border border-slate-700/60 bg-gradient-to-b from-slate-900/70 to-slate-950/70 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-slate-100">
                        Tóm tắt đơn hàng
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                        Kiểm tra lại tổng tiền trước khi gửi cho khách hàng.
                    </p>
                </div>

                {/* Badge */}
                <div className="flex items-center gap-2 rounded-full border border-sky-500/30 bg-slate-900/60 px-3 py-1 text-xs font-semibold text-slate-100">
                    <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
                    {itemsCount} SP
                </div>
            </div>

            {/* Rows */}
            <div className="mt-5 space-y-3">
                <Row label="Tạm tính" value={vnd(subtotal)} />
                <Row
                    label="Giảm giá"
                    value={vnd(discount)}
                    valueClass="text-amber-400"
                />
                <Row
                    label="Thuế đơn hàng"
                    value={`${Number(taxPercent || 0)}%`}
                    valueClass="text-slate-300"
                />
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-dashed border-slate-700/70" />

            {/* Total */}
            <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-slate-200">
                    Tổng thanh toán
                </span>
                <span className="text-xl font-bold text-emerald-400">
                    {vnd(total)}
                </span>
            </div>

            {/* Note */}
            <p className="mt-3 text-xs text-slate-500">
                * Tổng thanh toán đã bao gồm thuế và chiết khấu trên từng dòng.
            </p>
        </div>
    );
}

function Row({ label, value, valueClass = "text-slate-200" }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">{label}</span>
            <span className={`text-sm font-semibold ${valueClass}`}>{value}</span>
        </div>
    );
}
