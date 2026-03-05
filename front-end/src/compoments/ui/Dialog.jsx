// FullScreenDialog.jsx
import * as React from "react";
import Button from "@mui/material/Button";
import MuiDialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
    setOpen,
    open,
    title,
    onCreate,
    main,
}) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <MuiDialog
                fullScreen
                open={open}
                onClose={handleClose}
                slots={{
                    transition: Transition,
                }}
                PaperProps={{
                    sx: {
                        bgcolor: "#020617",      // nền tổng thể rất tối (slate-950)
                        color: "#E5E7EB",       // chữ sáng
                    },
                }}
            >
                <AppBar
                    sx={{
                        position: "relative",
                        bgcolor: "#020617",      // header tối
                        borderBottom: "1px solid #1F2937",
                        boxShadow: "0 10px 40px rgba(15,23,42,0.9)",
                    }}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>

                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            {title}
                        </Typography>

                        {onCreate ? (
                            <Button
                                autoFocus
                                color="inherit"
                                onClick={onCreate}
                                sx={{
                                    textTransform: "none",
                                    fontSize: 14,
                                }}
                            >
                                Thêm
                            </Button>
                        ) : null}
                    </Toolbar>
                </AppBar>

                {/* Nội dung chính, nền tối + padding nhẹ */}
                <Box
                    sx={{
                        flex: 1,
                        bgcolor: "#020617",
                        p: 2,
                    }}
                >
                    <List
                        sx={{
                            bgcolor: "transparent",
                            color: "#E5E7EB",
                        }}
                    >
                        {main}
                    </List>
                </Box>
            </MuiDialog>
        </React.Fragment>
    );
}
