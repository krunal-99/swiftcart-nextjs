import { toast } from "react-toastify";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const handleError = (msg: string | string[]) => {
  const errors = Array.isArray(msg)
    ? msg
    : msg.split(",").map((err) => err.trim());

  errors.forEach((error) => {
    toast.error(error);
  });
};
