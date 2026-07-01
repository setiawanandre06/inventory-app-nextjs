"use client";

import React, { useState, useEffect } from "react";
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

interface AltLoginCardProps {
    email: string;
    password: string;
    error: string;
    loading: boolean;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Background images shown in the left panel (served from /public/images/)
const bgImages = [
    "/images/login_bg_tianya1223.jpg",
];

const SLIDE_INTERVAL_MS = 20_000; // 20 seconds

export default function AltLoginCard({
    email,
    password,
    error,
    loading,
    onSubmit,
    onEmailChange,
    onPasswordChange,
}: AltLoginCardProps) {
    const [currentBgImageIndex, setCurrentBgImageIndex] = useState(0);

    // Advance to the next image every 20 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBgImageIndex((prev) => (prev + 1) % bgImages.length);
        }, SLIDE_INTERVAL_MS);

        // Clean up the interval when the component unmounts
        return () => clearInterval(timer);
    }, []); // empty deps — set up once on mount

    return (
        // This Box is used as a container for left and right panel
        <Box sx={{ display: "flex", minHeight: "100vh", width: "100%" }}>

            {/* ── Left Panel ── */}
            <Box
                sx={{
                    display: { xs: "none", md: "flex" },
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                    p: 6,
                }}
            >
                {/* Crossfading background image layers — one per image */}
                {bgImages.map((src, index) => (
                    <Box
                        key={src}
                        sx={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: `url(${src})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            // Only the active image is visible; others fade out
                            opacity: index === currentBgImageIndex ? 1 : 0,
                            transition: "opacity 1.2s ease-in-out",
                        }}
                    />
                ))}

                {/* Dark overlay so text stays readable over any image */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(135deg, rgba(10,10,30,0.72) 0%, rgba(15,30,70,0.65) 100%)",
                    }}
                />

                {/* Content sits above the background layers (zIndex) */}
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
                            border: "1px solid rgba(255,255,255,0.15)",
                            mb: 4,
                        }}
                    >
                        <InventoryIcon sx={{ fontSize: 56, color: "#63b3ed" }} />
                    </Box>

                    {/* App Title */}
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            color: "#ffffff",
                            letterSpacing: "-0.5px",
                            mb: 1.5,
                            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                        }}
                    >
                        InvenTrack
                    </Typography>

                    {/* App Description */}
                    <Typography
                        variant="body1"
                        sx={{
                            color: "rgba(255,255,255,0.75)",
                            maxWidth: 450,
                            lineHeight: 1.7,
                            fontSize: "1rem",
                            textShadow: "0 1px 6px rgba(0,0,0,0.35)",
                        }}
                    >
                        Your all-in-one inventory management solution. Track,
                        manage, and optimise your stock effortlessly.
                    </Typography>

                    {/* Feature pills */}
                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{
                            mt: 5,
                            gap: 1,
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        {["Real-time tracking", "Smart analytics", "Team collaboration"].map(
                            (feat) => (
                                <Box
                                    key={feat}
                                    sx={{
                                        px: 2,
                                        py: 0.75,
                                        borderRadius: 99,
                                        background: "rgba(255,255,255,0.12)",
                                        border: "1px solid rgba(255,255,255,0.2)",
                                        backdropFilter: "blur(8px)",
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: "rgba(255,255,255,0.85)",
                                            fontWeight: 500,
                                            fontSize: "0.75rem",
                                        }}
                                    >
                                        {feat}
                                    </Typography>
                                </Box>
                            )
                        )}
                    </Stack>

                    {/* Image indicator dots */}
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ mt: 5, justifyContent: "center" }}
                    >
                        {bgImages.map((_, index) => (
                            <Box
                                key={index}
                                onClick={() => setCurrentBgImageIndex(index)}
                                sx={{
                                    width: index === currentBgImageIndex ? 24 : 8,
                                    height: 8,
                                    borderRadius: 99,
                                    bgcolor:
                                        index === currentBgImageIndex
                                            ? "#63b3ed"
                                            : "rgba(255,255,255,0.35)",
                                    transition: "all 0.4s ease",
                                    cursor: "pointer",
                                    "&:hover": {
                                        bgcolor: "rgba(255,255,255,0.7)",
                                    },
                                }}
                            />
                        ))}
                    </Stack>
                </Box>
            </Box>

            {/* ── Right Panel ── */}
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
                            {/* Email field */}
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

                            {/* Password field */}
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
                                        "& .MuiAlert-icon": { color: "#fca5a5" },
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
                                    boxShadow: "0 4px 24px rgba(59,130,246,0.35)",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        background:
                                            "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
                                        boxShadow: "0 6px 32px rgba(59,130,246,0.5)",
                                        transform: "translateY(-1px)",
                                    },
                                    "&:active": { transform: "translateY(0)" },
                                    "&.Mui-disabled": {
                                        background: "rgba(59,130,246,0.3)",
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
        "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
        "&:hover fieldset": { borderColor: "rgba(255,255,255,0.25)" },
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