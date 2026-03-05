import React, { useState, useMemo } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TextField,
    InputAdornment,
    Button,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Stack,
    Divider,
} from '@mui/material';
import {
    Search as SearchIcon,
    Add as AddIcon,
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export function DataTable({
    rows = [],
    columns = [],
    rowsPerPageOptions = [10, 25, 50],
    searchableFields = [],
    onView,
    onEdit,
    onDelete,
    onCreate,
}) {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const navigate = useNavigate();

    const filteredRows = useMemo(() => {
        if (!searchText) return rows;
        return rows.filter((row) =>
            (searchableFields.length ? searchableFields : Object.keys(row)).some(
                (field) => row[field]?.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }, [rows, searchText, searchableFields]);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const from = page * rowsPerPage + 1;
    const to = Math.min((page + 1) * rowsPerPage, filteredRows.length);

    return (
        <Box>
            <Paper
                elevation={6}
                sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: '#020617',        // nền dark
                    color: '#e5e7eb',          // chữ sáng
                    border: '1px solid #1f2937',
                }}
            >
                {/* Header */}
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 3 }}
                >
                    <TextField
                        size="small"
                        placeholder="Tìm kiếm..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#9ca3af' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            width: { xs: '100%', sm: 300 },
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#020617',
                                borderRadius: 1,
                                '& fieldset': {
                                    borderColor: '#1f2937',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#4b5563',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#6366f1',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: '#e5e7eb',
                            },
                            '& .MuiInputBase-input::placeholder': {
                                color: '#64748b',
                                opacity: 1,
                            },
                        }}
                    />
                    <Stack direction="row" spacing={1} alignItems="center">
                        <FormControl
                            size="small"
                            sx={{
                                minWidth: 100,
                                '& .MuiInputLabel-root': {
                                    color: '#9ca3af',
                                    '&.Mui-focused': {
                                        color: '#6366f1',
                                    },
                                },
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#020617',
                                    '& fieldset': {
                                        borderColor: '#1f2937',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#4b5563',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#6366f1',
                                    },
                                },
                                '& .MuiSelect-select': {
                                    color: '#e5e7eb',
                                },
                            }}
                        >
                            <InputLabel>Hiển thị</InputLabel>
                            <Select
                                value={rowsPerPage}
                                label="Hiển thị"
                                onChange={handleChangeRowsPerPage}
                            >
                                {rowsPerPageOptions.map((opt) => (
                                    <MenuItem key={opt} value={opt}>
                                        {opt}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {onCreate ? (
                            <>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={onCreate}
                                    sx={{
                                        textTransform: 'none',
                                        borderRadius: 2,
                                        bgcolor: '#6366f1',
                                        '&:hover': { bgcolor: '#4f46e5' },
                                    }}
                                >
                                    Tạo mới
                                </Button>
                            </>
                        ) : <></>}
                    </Stack>
                </Stack>

                <Divider sx={{ mb: 2, borderColor: '#1f2937' }} />

                {/* Table */}
                <TableContainer
                    sx={{
                        borderRadius: 2,
                        bgcolor: '#020617',
                        border: '1px solid #1f2937',
                    }}
                >
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#020617' }}>
                                {columns.map((col) => (
                                    <TableCell
                                        key={col.field}
                                        sx={{
                                            fontWeight: 600,
                                            bgcolor: '#020617',
                                            color: '#9ca3af',
                                            borderBottomColor: '#1f2937',
                                        }}
                                    >
                                        {col.headerName}
                                    </TableCell>
                                ))}
                                {(onView || onEdit || onDelete) && (
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: 600,
                                            bgcolor: '#020617',
                                            color: '#9ca3af',
                                            borderBottomColor: '#1f2937',
                                        }}
                                    >
                                        Hành động
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedRows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    hover
                                    sx={{
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            backgroundColor: '#020617',
                                        },
                                    }}
                                >
                                    {columns.map((col) => (
                                        <TableCell
                                            key={col.field}
                                            sx={{
                                                color: '#e5e7eb',
                                                borderBottomColor: '#111827',
                                            }}
                                        >
                                            {col.renderCell ? col.renderCell(row) : row[col.field]}
                                        </TableCell>
                                    ))}
                                    {(onView || onEdit || onDelete) && (
                                        <TableCell
                                            align="center"
                                            sx={{ borderBottomColor: '#111827' }}
                                        >
                                            {onView && (
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onView(navigate(`${onView}/${row.id}`))}
                                                    title="Xem"
                                                    sx={{ color: '#38bdf8' }}
                                                >
                                                    <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                            )}
                                            {onEdit && (
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onEdit(row.id)}
                                                    title="Sửa"
                                                    sx={{ color: '#22c55e' }}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            )}
                                            {onDelete && (
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onDelete(row.id)}
                                                    title="Xóa"
                                                    sx={{ color: '#f97373' }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                            {filteredRows.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length + 1}
                                        align="center"
                                        sx={{ py: 4, color: '#9ca3af', borderBottomColor: '#111827' }}
                                    >
                                        Không có dữ liệu
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Footer */}
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    mt={2}
                    spacing={1}
                >
                    <Typography
                        variant="body2"
                        sx={{ color: '#9ca3af' }}
                    >
                        Hiển thị {filteredRows.length === 0 ? 0 : from} đến {to} của {filteredRows.length} bản ghi
                    </Typography>
                    <TablePagination
                        component="div"
                        count={filteredRows.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[]}
                        labelRowsPerPage=""
                        sx={{
                            '.MuiTablePagination-toolbar': {
                                color: '#e5e7eb',
                            },
                            '.MuiTablePagination-actions button': {
                                color: '#e5e7eb',
                            },
                        }}
                    />
                </Stack>
            </Paper>
        </Box>
    );
}
