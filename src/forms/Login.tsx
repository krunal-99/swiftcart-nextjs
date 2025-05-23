"use client";
import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { handleError, handleSuccess } from "../utils/utils";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { HomePath, RegisterPath } from "../constants/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { handleLogin } from "@/actions/serverActions";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Box
      component="form"
      ref={formRef}
      noValidate
      action={async (formData: FormData) => {
        setIsLoading(true);
        try {
          const result = await handleLogin(formData);
          if (result?.success) {
            handleSuccess(result.message || "Login successful!");
            dispatch(login({ user: result.user, token: result.token }));
            router.push(HomePath);
            formRef.current?.reset();
          } else {
            handleError(result?.message || "Login failed");
          }
        } catch (error) {
          handleError("An error occurred during login");
          console.error("Login error:", error);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 2 }}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        id="password"
        autoComplete="current-password"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 2 }}
      />

      <Button
        disabled={isLoading}
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 1,
          mb: 3,
          py: 1.5,
          background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
          "&:hover": {
            background: "linear-gradient(90deg, #5a6fd5 0%, #6a4292 100%)",
          },
        }}
      >
        {isLoading ? (
          <CircularProgress sx={{ color: "white" }} size="30px" />
        ) : (
          "Sign In"
        )}
      </Button>

      <Divider sx={{ my: 2 }}>
        <Typography variant="body2" color="text.secondary">
          OR
        </Typography>
      </Divider>

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography variant="body2">
          Don't have an account?{" "}
          <Link href={RegisterPath} style={{ textDecoration: "none" }}>
            Sign up now
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
