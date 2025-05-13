"use server";
import axiosInstance from "@/utils/instance";
import { uploadImageToCloudinary } from "@/utils/utils";

export async function handleRegister(formData: FormData) {
  try {
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const image = formData.get("image");

    if (!name || !email || !password) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    let imageUrl = null;
    if (image && image instanceof File && image.size > 0) {
      imageUrl = await uploadImageToCloudinary(image);
      if (!imageUrl) {
        return {
          success: false,
          message: "Failed to upload image",
        };
      }
    }

    const response = await axiosInstance.post(
      "/api/auth/register",
      JSON.stringify({ name, email, password, imageUrl })
    );

    const responseData = response?.data || response;

    if (
      (response?.status === 201 || response?.status === 200) &&
      responseData?.status === "success"
    ) {
      return {
        success: true,
        message: responseData.data || "Registration successful",
      };
    } else {
      return {
        success: false,
        message: responseData?.data || "Registration failed",
      };
    }
  } catch (error: any) {
    console.error("Registration error:", error);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "An error occurred during registration",
    };
  }
}

export async function handleLogin(formData: FormData) {
  try {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    const response = await axiosInstance.post(
      "/api/auth/login",
      JSON.stringify({ email, password })
    );

    const responseData = response?.data || response;

    if (responseData?.status === "success") {
      return {
        success: true,
        message: responseData.data || "Login successful",
        user: responseData.user,
        token: responseData.token,
      };
    } else {
      return {
        success: false,
        message: responseData?.data || "Login failed",
      };
    }
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      success: false,
      message:
        error?.response?.data?.message || "An error occurred during login",
    };
  }
}
