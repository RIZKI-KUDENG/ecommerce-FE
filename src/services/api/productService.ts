import { apiClient } from "@/lib/axios";
export interface ProductQueryParams {
  category?: string | number;
  search?: string;
  sortBy?: string;
  order?: "ASC" | "DESC";
  page?: number;
  limit?: number;
}

export const fetchProducts = async (params: ProductQueryParams = {}) => {
    const response = await apiClient.get("/products", {params: params});
    return response.data;
};
export const createProduct = async (data: any) => {
    const response = await apiClient.post("/products", data);
    return response.data;
}
export const addCategory = async (data: any) => {
    const response = await apiClient.post("/categories", data);
    return response.data;
}
export const createVariant = async (data: any) => {
    const response = await apiClient.post("/variants", data);
    return response.data;
}
export const fetchVariantById = async (id: any) => {
    const response = await apiClient.get(`/variants/${id}`);
    return response.data;
}
export const createStock = async (data: any) => {
    const response = await apiClient.post("/stocks", data);
    return response.data;
}