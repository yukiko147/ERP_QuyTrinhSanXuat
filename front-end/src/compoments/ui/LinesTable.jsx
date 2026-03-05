// LinesTable.jsx
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import SummaryTotals from "./SummaryTotals";

// ========= DARK THEME COLOR =========
const DARK_BG = "#0B1220"; // nền chính (card)
const DARK_SURFACE = "#0F172A"; // surface/table container
const DARK_HEAD = "#111C33"; // header table
const DARK_HOVER = "#0B1A33"; // hover row
const DARK_SELECTED = "#142046"; // selected row
const DARK_BORDER = "#22304A"; // border
const DARK_TEXT = "#E5E7EB"; // text chính
const DARK_SUBTEXT = "#94A3B8"; // text phụ

// accent
const ACCENT = "#60A5FA"; // xanh nhạt
const ACCENT_DARK = "#3B82F6"; // xanh đậm
const DANGER = "#F87171";
const DANGER_DARK = "#EF4444";

// ========== STYLE ==========

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: DARK_HEAD,
        color: DARK_TEXT,
        fontWeight: 700,
        borderBottom: `1px solid ${DARK_BORDER}`,
        whiteSpace: "nowrap",
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        paddingTop: 8,
        paddingBottom: 8,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
        color: DARK_TEXT,
        borderBottom: `1px solid ${DARK_BORDER}`,
        whiteSpace: "nowrap",
        padding: "6px 10px",
        verticalAlign: "middle",
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    backgroundColor: DARK_BG,
    "&:hover": {
        backgroundColor: DARK_HOVER,
    },
    "&.Mui-selected, &.Mui-selected:hover": {
        backgroundColor: DARK_SELECTED,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

// ========== HELPER ==========
const formatVND = (value) =>
    (Number(value) || 0).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });

const generateRowId = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
};

function createEmptyRow(id = generateRowId(), bodyTable = []) {
    const row = { id };

    bodyTable.forEach((col) => {
        if (!col.field) return;

        switch (col.type) {
            case "number":
                row[col.field] = col.defaultValue ?? 0;
                break;
            case "select":
                if (col.defaultValue !== undefined) {
                    row[col.field] = col.defaultValue;
                } else if (Array.isArray(col.options) && col.options.length > 0) {
                    row[col.field] = col.options[0].value;
                } else {
                    row[col.field] = "";
                }
                break;
            default:
                row[col.field] = col.defaultValue ?? "";
                break;
        }
    });

    return row;
}

// ========== COMPONENT ==========

export default function LinesTable({
    headTable = [],
    bodyTable = [],
    initialRows = [],
    title = "Bảng món ăn & dinh dưỡng",
    subtitle = "Quản lý danh sách món ăn, calories và trạng thái nhanh chóng.",
    onRowsChange,
    taxt,
    isShowSumary,
    noShowButonAddLine,
}) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (Array.isArray(initialRows)) {
            setRows(initialRows);
        }
    }, [initialRows]);

    const [activeRowId, setActiveRowId] = useState(null);

    const totalSoLuong = rows.reduce((sum, r) => sum + Number(r.soLuongHang || 0), 0);
    const totalThanhTien = rows.reduce((sum, r) => sum + Number(r.thanhTien || 0), 0);

    const handleFieldChange = (id, field, value, col) => {
        setRows((prev) => {
            const next = prev.map((row) => {
                if (row.id !== id) return row;

                let updatedRow = { ...row, [field]: value };

                if (col && typeof col.onChangeRow === "function") {
                    updatedRow = col.onChangeRow(updatedRow, value, prev);
                }

                return updatedRow;
            });

            if (onRowsChange) onRowsChange(next);
            return next;
        });
    };

    const handleAddRow = () => {
        setRows((prev) => {
            const newRow = createEmptyRow(undefined, bodyTable);
            const next = [...prev, newRow];
            if (onRowsChange) onRowsChange(next);
            return next;
        });
    };

    const handleDeleteRow = (id) => {
        setRows((prev) => {
            const next = prev.filter((row) => row.id !== id);
            if (onRowsChange) onRowsChange(next);
            return next;
        });
        if (activeRowId === id) setActiveRowId(null);
    };

    return (
        <Box
            sx={{
                width: "100%",
                borderRadius: 2,
                p: 2,
                backgroundColor: DARK_BG,
                border: `1px solid ${DARK_BORDER}`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
            }}
        >
            {/* Thanh action phía trên */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1.5,
                    gap: 1.5,
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}>
                    <Typography
                        sx={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: DARK_TEXT,
                        }}
                    >
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography
                            sx={{
                                fontSize: 12,
                                color: DARK_SUBTEXT,
                            }}
                        >
                            {subtitle}
                        </Typography>
                    )}
                </Box>

                {!noShowButonAddLine && (
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleAddRow}
                        sx={{
                            textTransform: "none",
                            fontSize: 13,
                            borderColor: ACCENT,
                            color: ACCENT,
                            backgroundColor: "transparent",
                            borderRadius: 999,
                            px: 2,
                            py: 0.4,
                            "&:hover": {
                                borderColor: ACCENT_DARK,
                                backgroundColor: "rgba(96,165,250,0.10)",
                            },
                        }}
                    >
                        + Thêm dòng
                    </Button>
                )}
            </Box>

            <TableContainer
                component={Paper}
                sx={{
                    width: "100%",
                    backgroundColor: DARK_SURFACE,
                    borderRadius: 1.5,
                    border: `1px solid ${DARK_BORDER}`,
                    boxShadow: "none",
                    overflowX: "auto",

                    scrollbarWidth: "thin",
                    scrollbarColor: "#334155 #0B1220",
                    "&::-webkit-scrollbar": {
                        height: 8,
                        width: 8,
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#0B1220",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#334155",
                        borderRadius: 999,
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#475569",
                    },
                }}
            >
                <Table
                    size="small"
                    sx={{
                        width: "100%",
                        minWidth: "100%",
                        tableLayout: "fixed",
                    }}
                    aria-label="customized table"
                >
                    <TableHead>
                        <TableRow>
                            {headTable?.map((item) => (
                                <HeadCell
                                    key={item.field || item.label}
                                    label={item.label}
                                    width={item.width}
                                    align={item.align}
                                />
                            ))}
                            <HeadCell key="_actions" label="Actions" width={80} align="center" />
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.length === 0 ? (
                            <StyledTableRow>
                                <StyledTableCell colSpan={headTable.length + 1} align="center">
                                    <Typography
                                        sx={{
                                            fontSize: 13,
                                            color: DARK_SUBTEXT,
                                            py: 1.8,
                                        }}
                                    >
                                        Không có dữ liệu. Nhấn{" "}
                                        <Typography
                                            component="span"
                                            sx={{
                                                color: ACCENT,
                                                fontWeight: 700,
                                            }}
                                        >
                                            “Thêm dòng”
                                        </Typography>{" "}
                                        để tạo mới.
                                    </Typography>
                                </StyledTableCell>
                            </StyledTableRow>
                        ) : (
                            rows.map((row) => (
                                <StyledTableRow key={row.id} selected={row.id === activeRowId}>
                                    {bodyTable?.map((col) => (
                                        <BodyCell
                                            key={col.field}
                                            type={col.type}
                                            value={row[col.field]}
                                            width={col.width}
                                            align={col.align}
                                            options={col.options}
                                            text={col.text}
                                            error={col.error}
                                            disabled={col.disabled}
                                            defaultValue={col.defaultValue}
                                            onChange={(e) => {
                                                if (col.type === "button" && typeof col.onClick === "function") {
                                                    col.onClick(row);
                                                } else {
                                                    const value = e?.target?.value ?? e;
                                                    handleFieldChange(row.id, col.field, value, col);
                                                }
                                            }}
                                        />
                                    ))}

                                    <StyledTableCell align="center" sx={{ paddingRight: 8 }}>
                                        <Button
                                            variant="text"
                                            size="small"
                                            sx={{
                                                minWidth: 0,
                                                textTransform: "none",
                                                fontSize: 12,
                                                color: DANGER,
                                                borderRadius: 999,
                                                p: 0.3,
                                                "&:hover": {
                                                    backgroundColor: "rgba(248,113,113,0.12)",
                                                    color: DANGER_DARK,
                                                },
                                            }}
                                            onClick={() => handleDeleteRow(row.id)}
                                            aria-label="Xóa dòng"
                                        >
                                            <DeleteOutlineRoundedIcon sx={{ fontSize: 18 }} />
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* ===== SUMMARY TOTAL ===== */}
            {rows.length > 0 && (
                <Box sx={{ mt: 1.5, display: "flex", justifyContent: "flex-end" }}>
                    <SummaryTotals
                        lines={rows}
                        currency="đ"
                        title="Tóm tắt đơn hàng"
                        taxt={taxt}
                        isShowSumary={isShowSumary}
                    />
                </Box>
            )}
        </Box>
    );
}

// ========== SUB COMPONENTS ==========

const HeadCell = ({ width, label, align }) => {
    return (
        <StyledTableCell align={align || "left"} sx={width ? { width } : undefined}>
            {label}
        </StyledTableCell>
    );
};

const BodyCell = ({
    type,
    value,
    onChange,
    width,
    align,
    options = [],
    text,
    error,
    disabled,
    defaultValue,
}) => {
    switch (type) {
        case "text":
            return (
                <StyledTableCell component="th" scope="row" align={align || "left"}>
                    <TextField
                        variant="outlined"
                        size="small"
                        value={value ?? ""}
                        onChange={onChange}
                        sx={{
                            width: width || "100%",
                            "& .MuiInputBase-root": {
                                fontSize: 13,
                                backgroundColor: "#0B1220",
                                color: DARK_TEXT,
                            },

                            // ✅ FIX: disabled vẫn giữ màu chữ (không bị xám/mờ)
                            "& .MuiInputBase-root.Mui-disabled": {
                                opacity: 1,
                                color: DARK_TEXT,
                            },
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: DARK_TEXT,
                            },

                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: DARK_BORDER,
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#334155",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: ACCENT_DARK,
                            },
                        }}
                        InputProps={{
                            sx: { color: DARK_TEXT },
                        }}
                        disabled={disabled}
                    />
                </StyledTableCell>
            );

        case "number":
            return (
                <StyledTableCell align={align || "right"}>
                    <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        value={value ?? 0}
                        onChange={onChange}
                        disabled={disabled}
                        defaultValue={defaultValue}
                        sx={{
                            width: width || 120,
                            "& .MuiInputBase-root": {
                                fontSize: 13,
                                backgroundColor: "#0B1220",
                                color: DARK_TEXT,
                            },

                            // ✅ FIX: disabled vẫn giữ màu chữ (không bị xám/mờ)
                            "& .MuiInputBase-root.Mui-disabled": {
                                opacity: 1,
                                color: DARK_TEXT,
                            },
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: DARK_TEXT,
                            },

                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: DARK_BORDER,
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#334155",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: ACCENT_DARK,
                            },
                        }}
                        InputProps={{
                            sx: {
                                color: DARK_TEXT,
                                textAlign: "right",
                            },
                        }}
                    />
                </StyledTableCell>
            );

        case "select":
            return (
                <StyledTableCell align={align || "left"}>
                    <Select
                        size="small"
                        value={value ?? ""}
                        onChange={onChange}
                        disabled={disabled}
                        sx={{
                            width: width || 150,
                            fontSize: 13,
                            backgroundColor: "#0B1220",
                            color: DARK_TEXT,

                            // ✅ FIX: disabled Select vẫn giữ màu chữ (không bị xám/mờ)
                            "&.Mui-disabled": {
                                opacity: 1,
                                color: DARK_TEXT,
                            },
                            "& .MuiSelect-select.Mui-disabled": {
                                WebkitTextFillColor: DARK_TEXT,
                            },
                            "&.Mui-disabled .MuiSvgIcon-root": {
                                color: DARK_SUBTEXT,
                                opacity: 1,
                            },

                            "& fieldset": {
                                borderColor: DARK_BORDER,
                            },
                            "&:hover fieldset": {
                                borderColor: "#334155",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: ACCENT_DARK,
                            },
                            "& .MuiSvgIcon-root": {
                                color: DARK_SUBTEXT,
                            },
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    backgroundColor: "#0B1220",
                                    border: `1px solid ${DARK_BORDER}`,
                                    color: DARK_TEXT,
                                },
                            },
                        }}
                    >
                        {options.map((item) => (
                            <MenuItem
                                value={item.value}
                                key={item.value}
                                sx={{
                                    fontSize: 13,
                                    "&.Mui-selected": {
                                        backgroundColor: "rgba(96,165,250,0.14) !important",
                                    },
                                    "&:hover": {
                                        backgroundColor: "rgba(96,165,250,0.10)",
                                    },
                                }}
                            >
                                {item.opt}
                            </MenuItem>
                        ))}
                    </Select>
                </StyledTableCell>
            );

        case "textBox":
            return (
                <StyledTableCell align={align || "left"}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: 12,
                            color: DARK_SUBTEXT,
                            maxWidth: width || 150,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {value ?? text ?? ""}
                    </Typography>
                </StyledTableCell>
            );

        case "badge":
            return (
                <StyledTableCell align={align || "left"}>
                    <Badge badgeContent={text} color={error ? "error" : "success"} />
                </StyledTableCell>
            );

        case "button":
            return (
                <StyledTableCell align={align || "left"}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={onChange}
                        disabled={disabled}
                        sx={{
                            textTransform: "none",
                            fontSize: 12,
                            px: 1.5,
                            backgroundColor: ACCENT_DARK,
                            "&:hover": {
                                backgroundColor: "#2563EB",
                            },
                        }}
                    >
                        {text}
                    </Button>
                </StyledTableCell>
            );

        default:
            return <StyledTableCell />;
    }
};
