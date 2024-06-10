"use client"
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, Product } from '../services/productsService';

const Products = () => {
    const { data, error, isLoading } = useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    if (isLoading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">Error: {error.message}</div>;

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            {data && data.map((product: Product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <img className="max-h-[300px] mx-auto mb-2" src={product.image} alt="image item" />
                    <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                    <p className="text-gray-700 mb-2">{product.description}</p>
                    <p className="text-blue-500 font-bold">${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default Products;
