import { toast } from "react-toastify";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const handleSuccess = (msg: string) => {
  toast.success(msg);
};

export const handleError = (msg: string | string[]) => {
  const errors = Array.isArray(msg)
    ? msg
    : msg.split(",").map((err) => err.trim());

  errors.forEach((error) => {
    toast.error(error);
  });
};

export const uploadImageToCloudinary = async (file: File) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "swiftcart");
  data.append("cloud_name", "dq0x26dcc");
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dq0x26dcc/image/upload",
    {
      method: "POST",
      body: data,
    }
  );
  const result = await res.json();
  return result.url;
};
