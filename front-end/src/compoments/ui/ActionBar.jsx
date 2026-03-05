// ActionBar.jsx
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";

const ActionBar = ({
    title,
    subtitle,
    totalLabel = "128 đơn",
    buttons,
    onCreate,
    color
}) => {




    return (
        <div className="w-full mb-3">
            <div className="relative overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/80 shadow-xl backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0 opacity-70">
                    <div className="absolute -left-10 -top-24 h-40 w-40 rounded-full bg-indigo-500/30 blur-3xl" />
                    <div className="absolute -right-10 -bottom-24 h-40 w-40 rounded-full bg-cyan-500/30 blur-3xl" />
                </div>
                <div className="relative z-10 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 lg:p-6">

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <h1 className="text-lg font-semibold text-slate-50 sm:text-xl">
                                {title}
                            </h1>

                            {totalLabel && (
                                <Label label={totalLabel} color={color} />
                            )}
                        </div>

                        {subtitle && (
                            <p className="max-w-xl text-xs text-slate-400 sm:text-sm">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Right: search + actions */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">

                        <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                            {buttons?.map(item => {
                                return (
                                    <>
                                        <Button
                                            variant="outlined"
                                            startIcon={item.icon}
                                            onClick={item.onClick}
                                            size="small"
                                            sx={{
                                                borderRadius: 2.5,                              // gần rounded-xl
                                                px: 1.5,
                                                py: 0.5,
                                                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                                fontWeight: 600,
                                                textTransform: "none",
                                                minWidth: 0,
                                                color: "rgba(226,232,240,1)",                   // text-slate-200
                                                borderColor: "rgba(148,163,184,1)",             // slate-400
                                                backgroundColor: "transparent",                 // nền theo giao diện
                                                boxShadow: "none",
                                                "&:hover": {
                                                    borderColor: "rgba(129,140,248,1)",         // indigo-400
                                                    backgroundColor: "rgba(129,140,248,0.08)",  // nhẹ cho cảm giác hover
                                                    boxShadow: "none",
                                                },
                                                "&:active": {
                                                    transform: "scale(0.97)",
                                                },
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    </>
                                )
                            })}

                            {onCreate ? <Button
                                onClick={onCreate}
                                variant="contained"
                                startIcon={<AddIcon fontSize="small" />}
                                size="small"
                                sx={{
                                    borderRadius: 2.5,                    // gần giống rounded-xl
                                    px: 1.5,                               // tương đương px-3.5
                                    py: 0.5,                               // tương đương py-1.5
                                    fontSize: { xs: "0.75rem", sm: "0.875rem" }, // text-xs -> sm
                                    fontWeight: 600,
                                    textTransform: "none",
                                    backgroundColor: "rgb(99,102,241)",    // indigo-500
                                    boxShadow: "0 8px 20px rgba(99,102,241,0.4)",
                                    "&:hover": {
                                        backgroundColor: "rgb(129,140,248)",      // indigo-400
                                        boxShadow: "0 8px 24px rgba(129,140,248,0.5)",
                                    },
                                    "&:active": {
                                        transform: "scale(0.97)",
                                    },
                                }}
                            >
                                Tạo
                            </Button> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Label = ({ color, label }) => {
    switch (color) {
        case "red":
            return (
                <>
                    <span className="inline-flex items-center rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-medium text-rose-300 ring-1 ring-rose-500/40">
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
                        {label}
                    </span>

                </>
            )
        case "blue":
            return (
                <>
                    <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-300 ring-1 ring-blue-500/40">
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
                        {label}
                    </span>
                </>
            )
        case "puple":
            return (
                <>
                    <span className="inline-flex items-center rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-300 ring-1 ring-purple-500/40">
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
                        {label}
                    </span>

                </>
            )
        case "gray":
            return (
                <>
                    <span className="inline-flex items-center rounded-full bg-slate-500/10 px-2.5 py-0.5 text-xs font-medium text-slate-300 ring-1 ring-slate-500/40">
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" />
                        {label}
                    </span>

                </>
            )
        case "primary":
            return (
                <>
                    <span className="inline-flex items-center rounded-full bg-sky-500/10 px-2.5 py-0.5 text-xs font-medium text-sky-300 ring-1 ring-sky-500/40">
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
                        {label}
                    </span>
                </>
            )
        case "success":
            return (
                <>
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/40">
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        {label}
                    </span>
                </>
            )
        case "warring":
            return (
                <>
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/40">
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        {label}
                    </span>
                </>
            )
        case "error":
            return (
                <>
                    <span className="inline-flex items-center rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-medium text-rose-300 ring-1 ring-rose-500/40">
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
                        {label}
                    </span>
                </>
            )
        default:
            return (
                <>
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/40">
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        {label}
                    </span>
                </>
            )
    }
}
export default ActionBar;
