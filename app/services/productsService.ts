import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://fakestoreapi.com',
});

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axiosInstance.get('/products');
    return response.data as Product[];
};

export const createProduct = async (product: NewProduct): Promise<Product> => {
    const response = await axiosInstance.post('/products', product);
    return response.data;
};

export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
};

export type NewProduct = {
    title: string;
    description: string;
    price: number;
    images: string[];
};
