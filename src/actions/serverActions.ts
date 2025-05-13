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
    if (!image || !(image instanceof File) || image.size === 0) {
      return {
        success: false,
        message: "Please select an image",
      };
    }
    const imageUrl = await uploadImageToCloudinary(image);
    if (!imageUrl) {
      return {
        success: false,
        message: "Failed to upload image",
      };
    }

    const response = await axiosInstance.post(
      "/api/auth/register",
      JSON.stringify({ name, email, password, imageUrl })
    );

    if (response.data.status === "success") {
      return {
        success: true,
        message: response.data.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Registration failed",
      };
    }
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "An error occurred during registration",
    };
  }
}
