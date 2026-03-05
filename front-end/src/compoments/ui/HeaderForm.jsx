// HeaderForm.jsx
import React, { useEffect, useState } from "react";

const HeaderForm = ({ formInput = [], form = {}, setForm, isShowAvatar, prev }) => {
    const [imgPrev, setPrev] = useState(prev ?? "")
    console.log(prev)


    // Tailwind cần class cố định => tách ra thành biến
    const gridColsClass = isShowAvatar ? "md:grid-cols-2" : "md:grid-cols-3";
    return (
        <div className="w-full mb-4 space-y-4">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 shadow-md shadow-black/40 backdrop-blur">
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    {/* Cột avatar bên trái (nếu bật) */}
                    {isShowAvatar && (
                        <div className="flex justify-center md:justify-start md:pt-1">
                            <div className="relative h-40 w-40 md:h-44 md:w-44 overflow-hidden rounded-2xl border border-dashed border-slate-600 bg-slate-800/80">
                                {imgPrev || prev ? (
                                    <img
                                        src={imgPrev || prev || ""}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full flex-col items-center justify-center px-3 text-center">
                                        <span className="mb-1 text-[11px] font-semibold tracking-wide text-slate-200">
                                            Khung hình ảnh
                                        </span>
                                        <span className="text-[11px] leading-snug text-slate-400">
                                            Avatar / logo / sản phẩm
                                            <br />
                                            (tỷ lệ vuông hiển thị đẹp nhất)
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Cột form bên phải */}
                    <div
                        className={`flex-1 grid grid-cols-1 ${gridColsClass} gap-x-3 gap-y-4`}
                    >
                        {formInput?.map((item) => {
                            const rawValue = form[item.field];

                            // Chuẩn hóa value cho select: 0/null/undefined => ""
                            const value =
                                item.type === "select"
                                    ? rawValue === 0 ||
                                        rawValue === "0" ||
                                        rawValue === null ||
                                        rawValue === undefined
                                        ? ""
                                        : rawValue
                                    : rawValue ?? "";

                            return (
                                <Input
                                    key={item.field}
                                    type={item.type}
                                    label={item.label}
                                    placeholder={item.placeholder}
                                    value={value}
                                    onChange={(e) => {
                                        setForm((prev) => ({
                                            ...prev,
                                            [item.field]: e.target.value,

                                        }))
                                        console.log(item.options)
                                        if (item.options) {
                                            const found = item.options.find(x => String(x.value) === String(e.target.value));
                                            if (found.hinhAnh) {
                                                setPrev(found.hinhAnh)

                                            }
                                        }

                                        if (typeof item.onChangeRows === "function") {
                                            item.onChangeRows(e); // hoặc item.onChangeRows()
                                        }
                                    }
                                    }
                                    disabled={item.disabled}
                                    options={item.options}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Input = ({
    type,
    label,
    value,
    placeholder,
    onChange,
    options,
    disabled,
}) => {
    const wrapperClass = "space-y-1.5 w-full";

    switch (type) {
        case "select": {
            // Chuẩn hóa value cho select: 0/null/undefined => ""
            const normalizedValue =
                value === 0 ||
                    value === "0" ||
                    value === null ||
                    value === undefined
                    ? ""
                    : value;

            return (
                <div className={wrapperClass}>
                    <label className="text-xs font-medium text-slate-300">
                        {label}
                    </label>
                    <select
                        disabled={disabled}
                        value={normalizedValue}
                        onChange={onChange}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none transition focus:bg-slate-900 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40 hover:border-slate-500"
                    >
                        <option
                            value=""
                            disabled
                            hidden
                            className="bg-slate-800 text-slate-500"
                        >
                            {placeholder || "— Chọn giá trị —"}
                        </option>
                        {options?.map((item, index) => (
                            <option
                                className="bg-slate-800"
                                key={index}
                                value={item.value}
                            >
                                {item.opt}
                            </option>
                        ))}
                    </select>
                </div>
            );
        }

        case "text":
            return (
                <div className={wrapperClass}>
                    <label className="text-xs font-medium text-slate-300">
                        {label}
                    </label>
                    <input
                        disabled={disabled}
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:bg-slate-900 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40 hover:border-slate-500"
                    />
                </div>
            );

        case "date":
            return (
                <div className={wrapperClass}>
                    <label className="text-xs font-medium text-slate-300">
                        {label}
                    </label>
                    <input
                        disabled={disabled}
                        type="date"
                        value={value ? value.slice(0, 10) : ""}
                        onChange={onChange}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none transition focus:bg-slate-900 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40 hover:border-slate-500"
                    />
                </div>
            );

        case "number":
            return (
                <div className={wrapperClass}>
                    <label className="text-xs font-medium text-slate-300">
                        {label}
                    </label>
                    <input
                        disabled={disabled}
                        type="number"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        onWheel={(e) => e.currentTarget.blur()} // chặn scroll đổi số
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-right text-slate-100 outline-none transition placeholder:text-slate-500 focus:bg-slate-900 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40 hover:border-slate-500"
                    />
                </div>
            );

        default:
            return <div className={wrapperClass} />;
    }
};

export default HeaderForm;
