import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CustomizedSnackbars({
    open,
    setOpen,
    content,
    severity = "success",      // có thể truyền "success" | "error" | "warning" | "info"
}) {
    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }} // 👈 đặt vị trí ở đây
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: "100%" }}
            >
                {content}
            </Alert>
        </Snackbar>
    );
}
