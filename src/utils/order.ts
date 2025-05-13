import axiosInstance from "./instance";

export const getOrderByUser = async () => {
  const response = await axiosInstance.get("/orders");
  return response.data.data;
};
