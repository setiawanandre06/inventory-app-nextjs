"use client";

import React from "react";
import {
    Box,
    Button,
    TextField,
    Stack,
    Typography,
    InputAdornment,
    CircularProgress,
    Alert,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";

interface LoginCardProps {
    email: string;
    password: string;
    error: string;
    loading: boolean;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LoginCard({
    email,
    password,
    error,
    loading,
    onSubmit,
    onEmailChange,
    onPasswordChange,
}: LoginCardProps) {
    return (
        // This box is used as a container for left and right panel
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                width: "100%",
            }}
        >
            {/* ── Left Branding Panel ── */}
            <Box
                sx={{
                    display: { xs: "none", md: "flex" },
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background:
                        "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
                    position: "relative",
                    overflow: "hidden",
                    p: 6,
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        width: 400,
                        height: 400,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(99,179,237,0.15) 0%, transparent 70%)",
                        top: "-100px",
                        left: "-100px",
                    },
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        width: 300,
                        height: 300,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(129,230,217,0.12) 0%, transparent 70%)",
                        bottom: "-80px",
                        right: "-80px",
                    },
                }}
            >
                {/* Floating decorative circles */}
                {[
                    { size: 80, top: "20%", left: "15%", opacity: 0.08 },
                    { size: 50, top: "60%", left: "70%", opacity: 0.06 },
                    { size: 120, top: "75%", left: "10%", opacity: 0.05 },
                ].map((circle, i) => (
                    <Box
                        key={i}
                        sx={{
                            position: "absolute",
                            width: circle.size,
                            height: circle.size,
                            borderRadius: "50%",
                            border: "2px solid rgba(255,255,255,0.15)",
                            top: circle.top,
                            left: circle.left,
                            opacity: circle.opacity * 10,
                        }}
                    />
                ))}

                {/* Title and Description of the app */}
                <Box sx={{ zIndex: 1, textAlign: "center" }}>
                    {/* App Logo */}
                    <Box
                        sx={{
                            display: "inline-flex",
                            p: 2.5,
                            borderRadius: 4,
                            background:
                                "linear-gradient(135deg, rgba(99,179,237,0.2), rgba(129,230,217,0.2))",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            mb: 4,
                        }}
                    >
                        <InventoryIcon
                            sx={{ fontSize: 56, color: "#63b3ed" }}
                        />
                    </Box>

                    {/* App Title */}
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            color: "#ffffff",
                            letterSpacing: "-0.5px",
                            mb: 1.5,
                        }}
                    >
                        InvenTrack
                    </Typography>

                    {/* App Description */}
                    <Typography
                        variant="body1"
                        sx={{
                            color: "rgba(255,255,255,0.6)",
                            maxWidth: 450,
                            lineHeight: 1.7,
                            fontSize: "1rem",
                        }}
                    >
                        Your all-in-one inventory management solution. Track,
                        manage, and optimise your stock effortlessly.
                    </Typography>

                    {/* Feature pills */}
                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ mt: 5, gap: 1, justifyContent: "center", flexWrap: "wrap" }}
                    >
                        {[
                            "Real-time tracking",
                            "Smart analytics",
                            "Team collaboration",
                        ].map((feat) => (
                            <Box
                                key={feat}
                                sx={{
                                    px: 2,
                                    py: 0.75,
                                    borderRadius: 99,
                                    background:
                                        "rgba(255,255,255,0.08)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    backdropFilter: "blur(8px)",
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: "rgba(255,255,255,0.75)",
                                        fontWeight: 500,
                                        fontSize: "0.75rem",
                                    }}
                                >
                                    {feat}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Box>

            {/* ── Right Form Panel ── */}
            <Box
                sx={{
                    flex: { xs: 1, md: "0 0 480px" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#0d1117",
                    p: { xs: 3, sm: 6 },
                }}
            >
                <Box sx={{ width: "100%", maxWidth: 380 }}>
                    {/* Mobile logo */}
                    <Box
                        sx={{
                            display: { xs: "flex", md: "none" },
                            alignItems: "center",
                            gap: 1.5,
                            mb: 4,
                        }}
                    >
                        <InventoryIcon sx={{ fontSize: 32, color: "#63b3ed" }} />
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: "#ffffff" }}
                        >
                            InvenTrack
                        </Typography>
                    </Box>

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            color: "#ffffff",
                            mb: 0.75,
                            letterSpacing: "-0.3px",
                        }}
                    >
                        Welcome back
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "rgba(255,255,255,0.45)", mb: 4 }}
                    >
                        Sign in to your account to continue
                    </Typography>

                    <form onSubmit={onSubmit} noValidate>
                        <Stack spacing={2.5}>
                            <Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: "rgba(255,255,255,0.55)",
                                        fontWeight: 500,
                                        display: "block",
                                        mb: 0.75,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                        fontSize: "0.7rem",
                                    }}
                                >
                                    Email address
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    type="email"
                                    value={email}
                                    onChange={onEmailChange}
                                    fullWidth
                                    required
                                    placeholder="you@example.com"
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailOutlinedIcon
                                                        sx={{
                                                            color: "rgba(255,255,255,0.3)",
                                                            fontSize: 20,
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    sx={fieldSx}
                                />
                            </Box>

                            <Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: "rgba(255,255,255,0.55)",
                                        fontWeight: 500,
                                        display: "block",
                                        mb: 0.75,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                        fontSize: "0.7rem",
                                    }}
                                >
                                    Password
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    type="password"
                                    value={password}
                                    onChange={onPasswordChange}
                                    fullWidth
                                    required
                                    placeholder="••••••••"
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlinedIcon
                                                        sx={{
                                                            color: "rgba(255,255,255,0.3)",
                                                            fontSize: 20,
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    sx={fieldSx}
                                />
                            </Box>

                            {error && (
                                <Alert
                                    severity="error"
                                    sx={{
                                        bgcolor: "rgba(239,68,68,0.12)",
                                        color: "#fca5a5",
                                        border: "1px solid rgba(239,68,68,0.25)",
                                        "& .MuiAlert-icon": {
                                            color: "#fca5a5",
                                        },
                                    }}
                                >
                                    {error}
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                fullWidth
                                sx={{
                                    mt: 0.5,
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    fontSize: "0.95rem",
                                    textTransform: "none",
                                    background:
                                        "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                                    boxShadow:
                                        "0 4px 24px rgba(59,130,246,0.35)",
                                    transition:
                                        "all 0.2s ease",
                                    "&:hover": {
                                        background:
                                            "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
                                        boxShadow:
                                            "0 6px 32px rgba(59,130,246,0.5)",
                                        transform: "translateY(-1px)",
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    },
                                    "&.Mui-disabled": {
                                        background:
                                            "rgba(59,130,246,0.3)",
                                        color: "rgba(255,255,255,0.4)",
                                    },
                                }}
                            >
                                {loading ? (
                                    <CircularProgress
                                        size={22}
                                        thickness={4}
                                        sx={{ color: "rgba(255,255,255,0.6)" }}
                                    />
                                ) : (
                                    "Sign in"
                                )}
                            </Button>
                        </Stack>
                    </form>

                    <Typography
                        variant="caption"
                        sx={{
                            display: "block",
                            textAlign: "center",
                            mt: 4,
                            color: "rgba(255,255,255,0.2)",
                        }}
                    >
                        © {new Date().getFullYear()} InvenTrack. All rights reserved.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

// Shared dark-themed text field styles
const fieldSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        bgcolor: "rgba(255,255,255,0.04)",
        color: "#ffffff",
        "& fieldset": {
            borderColor: "rgba(255,255,255,0.1)",
        },
        "&:hover fieldset": {
            borderColor: "rgba(255,255,255,0.25)",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#3b82f6",
            borderWidth: 1.5,
        },
    },
    "& .MuiInputBase-input::placeholder": {
        color: "rgba(255,255,255,0.2)",
        opacity: 1,
    },
};