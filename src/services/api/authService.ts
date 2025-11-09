import { apiClient } from "@/lib/axios";

export const login = async (identifier: string, password: string) => {
    const response = await apiClient.post("/auth/login", {
        identifier,
        password,
    });
    return response.data;
};
export const register = async (
    username: string,
    email: string,
    phone: string,
    password: string
) => {
    const response = await apiClient.post("/auth/register", {
        username,
        email,
        phone,
        password,
    });
    return response.data;
};