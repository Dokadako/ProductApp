"use client"
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { createProduct, NewProduct } from '../services/productsService';

const ProductCreation = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const imageUrls: string[] = [];
            for (const image of images) {
                const formData = new FormData();
                formData.append('file', image);
                const imageUploadResponse = await axios.post('https://api.escuelajs.co/api/v1/files/upload', formData);
                imageUrls.push(imageUploadResponse.data.url);
            }

            const newProduct: NewProduct = {
                title,
                description,
                price: parseFloat(price),
                images: imageUrls,
            };

            await createProduct(newProduct);
            queryClient.invalidateQueries({ queryKey: ['products'] });

            // Reset form after successful submission
            setTitle('');
            setDescription('');
            setPrice('');
            setImages([]);
        } catch (err) {
            setError('An error occurred while creating the product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const createProduct = async (product: NewProduct) => {
        await axios.post('https://api.escuelajs.co/api/v1/products', product);
    };


    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create a Product</h2>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Price (USD)</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Images</label>
                <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files || []))} className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Create Product</button>
        </form>
    );
};

export default ProductCreation;
