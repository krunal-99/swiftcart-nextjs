import axiosInstance from "./instance";

export const getFeaturedProducts = async () => {
  const response = await axiosInstance.get("/products/featured");
  return response.data.data;
};
