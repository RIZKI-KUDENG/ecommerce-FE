export interface Products {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    discount?: number;
    status: string;
}