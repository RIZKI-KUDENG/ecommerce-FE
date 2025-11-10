import { apiClient } from "@/lib/axios";

export const getProducts = async (params?: {
    category?: string;
    page?: number;
    sortBy?: string;
    search?: string;
}) => {
    const response = await apiClient.get("/products", { params });
    return response.data;
}

export const getProductById = async (id: string) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
}

export const createProduct = async (data: any) => {
    const response = await apiClient.post("/products", data);
    return response.data;
}

export const updateProduct = async (id: string, data: any) => {
    const response = await apiClient.put(`/products/${id}`, data);
    return response.data;
}

export const deleteProduct = async (id: string) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
}