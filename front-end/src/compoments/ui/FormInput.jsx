import { useEffect, useState } from "react";
import { Edit as EditIcon, AddAPhoto } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteIcon from "@mui/icons-material/Delete";
import { uploadImgCloudinary } from "../../queries/common/Upload";

export function Form({
    setForm,
    labelInput,
    title,
    subTitle,
    onCreate,
    onEdit,
    onDelete,
    onBack,
    showAvatar,
    element,
    setPrevImg,
    prevImg
}) {
    const [avatar, setAvatar] = useState(null);

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            const urlUpload = await uploadImgCloudinary(file)
            setAvatar(previewUrl);
            setForm((prev) => ({ ...prev, hinhAnh: urlUpload }));
            setPrevImg(file)
            console.log(previewUrl)
        }
    };


    useEffect(() => {
        if (!prevImg) return;

        // prevImg có thể là string (url) hoặc File/Blob
        if (typeof prevImg === "string") {
            setAvatar(prevImg);
            return;
        }

        // File/Blob -> tạo url preview
        const objectUrl = URL.createObjectURL(prevImg);
        setAvatar(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [prevImg]);

    return (
        <div className="min-h-screen bg-[#05060a] text-gray-100 px-4 py-8">
            <div className="mx-auto max-w-6xl space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3" />
                    <div className="flex flex-wrap items-center gap-3">
                        {onBack && (
                            <button
                                className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-700"
                                onClick={onBack}
                            >
                                <ArrowBackIosIcon fontSize="small" />
                                Quay lại
                            </button>
                        )}

                        {onDelete && (
                            <button
                                className="inline-flex items-center gap-2 rounded-md border border-red-700 bg-red-700/90 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                                onClick={onDelete}
                            >
                                <DeleteIcon fontSize="small" />
                                Delete
                            </button>
                        )}

                        {onEdit && (
                            <button
                                className="inline-flex items-center gap-2 rounded-md border border-indigo-700 bg-indigo-700/90 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-600"
                                onClick={onEdit}
                            >
                                <EditIcon fontSize="small" />
                                Edit
                            </button>
                        )}

                        {onCreate && (
                            <button
                                className="inline-flex items-center gap-2 rounded-md border border-emerald-700 bg-emerald-700/90 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600"
                                onClick={onCreate}
                            >
                                <AddIcon fontSize="small" />
                                Create
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Card */}
                <div className="rounded-2xl border border-slate-800 bg-[#16181d] p-6 shadow-xl shadow-black/40">
                    {/* Title + subtitle */}
                    <div className="mb-6 border-b border-slate-800 pb-4">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {title}
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">{subTitle}</p>
                    </div>

                    {/* Form + Avatar */}
                    <div className="mb-4 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                        {/* Khối input */}
                        <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                {labelInput.map((item, idx) => (
                                    <InputField
                                        key={idx}
                                        type={item.type}
                                        label={item.label}
                                        placeholder={item.placeholder}
                                        value={item.value}
                                        options={item.options}
                                        onChange={(e) => {
                                            setForm((prev) => ({
                                                ...prev,
                                                [item.field]: e.target.value,
                                            }))

                                            if (typeof item.onfuncion === "function") {
                                                item.onfuncion(e)
                                            }
                                        }


                                        }
                                        onClick={item.onClick}
                                        btnText={item.btnText}
                                        disabled={item.disabled}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Avatar */}
                        {showAvatar && (
                            <div className="flex justify-center lg:justify-end">
                                <div className="flex flex-col items-center gap-3">

                                    <label className="w-40 h-40 rounded-xl border border-slate-700 bg-[#1d1f24] flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-[#20232b] transition overflow-hidden">
                                        {avatar ? (
                                            <img
                                                src={avatar || prevImg}
                                                alt="Preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <>
                                                <AddAPhoto
                                                    className="mb-2 text-slate-400"
                                                    fontSize="large"
                                                />
                                                <p className="text-xs text-slate-400">
                                                    Nhấn để chọn ảnh
                                                </p>
                                            </>
                                        )}

                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAvatarChange}
                                        />
                                    </label>
                                </div>
                            </div>
                        )}


                    </div>

                    {element && (
                        <>
                            {element}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

/* Input Field Component */
function InputField({ label, type, value, onChange, placeholder, options, onClick, btnText, disabled }) {
    if (type === "select") {
        return (
            <div className="space-y-1 text-sm">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300">
                    {label}
                </label>

                <select
                    className="h-10 w-full rounded-md border border-slate-700 bg-[#0f1013] px-3 text-sm text-gray-200 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                >
                    <option value="" disabled>
                        -- Chọn {label?.toLowerCase?.() || "giá trị"} --
                    </option>
                    {options?.map((opt, i) => (
                        <option key={i} value={opt.value ?? opt}>
                            {opt.label ?? opt}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    if (type === "button") {
        return (
            <div className="space-y-1 text-sm">
                <button
                    type="button"
                    onClick={onClick}
                    disabled={disabled}
                    className="
                    inline-flex items-center justify-center
                    rounded-md px-3 h-10 text-xs font-semibold
                    bg-indigo-600 text-white
                    border border-indigo-500
                    shadow-sm
                    hover:bg-indigo-500 hover:border-indigo-400
                    active:scale-[0.98]
                    disabled:opacity-60 disabled:cursor-not-allowed
                    transition
                "
                >
                    {btnText}

                </button>
            </div>
        );
    }

    return (
        <div className="space-y-1 text-sm">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-300">
                {label}
            </label>

            <input
                className="h-10 w-full rounded-md border border-slate-700 bg-[#0f1013] px-3 text-sm text-gray-200 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
}
