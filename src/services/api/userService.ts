import { apiClient } from "@/lib/axios";

export const addToCart = async (data: any) => {
    const response = await apiClient.post("/cart", data);
    return response.data;
}