import axiosInstance from "./instance";

export const getFeaturedProducts = async () => {
  const response = await axiosInstance.get("/products/featured");
  return response.data.data;
};

export const getCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data.data;
};
