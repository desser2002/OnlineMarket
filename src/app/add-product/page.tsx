'use client';

import React, { useEffect, useState } from "react";
import { useProduct } from "@/hooks/sendfile";
import SellerNavigationbar from "@/components/SellerNavigationbar";
import { fetchCategories } from "@/hooks/fetchCategories";
import {Category} from "@/types/Category";


export default function Page() {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const tokenFromCookies = document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))
            ?.split('=')[1] || null; // If token is not found, assign null

        const usernameFromCookies = document.cookie
            .split('; ')
            .find((row) => row.startsWith('email='))
            ?.split('=')[1] || null; // Similarly for username

        setToken(tokenFromCookies);
        setUsername(usernameFromCookies);

        if (!tokenFromCookies || !usernameFromCookies) {
            alert('Authorization token or username is missing.');
        }

        // Fetch categories from the backend
        if (tokenFromCookies) {
            fetchCategories(tokenFromCookies)
                .then((data: Category[]) => setCategories(data))
                .catch((err) => console.error("Failed to fetch categories:", err));
        }
    }, []);

    const { saveProductWithImage, isLoading } = useProduct(token || '', username || '');

    const saveProduct = async () => {
        const missingFields: string[] = [];

        if (!image) missingFields.push('Image');
        if (!productName) missingFields.push('Product Name');
        if (!price) missingFields.push('Price');
        if (!categoryId) missingFields.push('Category');
        if (!token) missingFields.push('Authorization Token');
        if (!username) missingFields.push('Username');

        if (missingFields.length > 0) {
            alert(`Please fill in all required fields:\n- ${missingFields.join('\n- ')}`);
            return;
        }

        const product = {
            name: productName,
            price: parseFloat(price),
            description: description || "",
            categoryId: parseInt(categoryId, 10),
        };

        try {
            await saveProductWithImage(image, product);
            alert("Product saved successfully!");
        } catch (err) {
            console.error("Failed to save product:", err);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <SellerNavigationbar />
            <div className="flex-grow bg-gray-100 flex flex-col items-center overflow-hidden">
                {isLoading && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <p className="text-white text-lg">Processing...</p>
                    </div>
                )}
                <div className="h-[calc(100%-80px)] w-[95%] bg-white p-4 rounded-lg shadow-md flex flex-col">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4">Product Constructor</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow">
                        <div
                            className="bg-white rounded-lg flex items-center justify-center border-dashed border-2 border-gray-300 relative group">
                            {image ? (
                                <div className="relative flex items-center justify-center w-[200px] h-[200px]">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Product Preview"
                                        className="h-full w-full object-contain rounded-lg"
                                    />
                                    <label
                                        htmlFor="image"
                                        className="absolute inset-0 m-auto bg-gray-500 bg-opacity-50 text-white flex items-center justify-center rounded-full w-8 h-8 cursor-pointer hidden group-hover:flex"
                                    >
                                        ✕
                                        <input
                                            type="file"
                                            id="image"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </label>
                                </div>
                            ) : (
                                <label
                                    htmlFor="image"
                                    className="cursor-pointer text-gray-600 hover:text-gray-800 flex flex-col items-center justify-center h-[200px] w-[200px] text-sm"
                                >
                                    Click to upload product image
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </label>
                            )}
                        </div>

                        <div className="flex flex-col justify-between h-full">
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                <input
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg font-bold text-gray-800"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg text-gray-800 font-semibold"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                >
                                    <option value="" disabled>Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-grow">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-700 resize-none"
                                    style={{ height: "calc(100% - 30px)" }}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 w-[95%] flex justify-end gap-2">
                    <button
                        onClick={saveProduct}
                        className="bg-blue-600 text-white py-1 px-3 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Save Product
                    </button>
                </div>
            </div>
        </div>
    );
}
