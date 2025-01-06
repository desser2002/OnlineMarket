'use client';
import React, { useState } from 'react';

export default function Page() {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [editingField, setEditingField] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const saveProduct = () => {
        console.log({ productName, description, price, image });
        alert('Product saved successfully!');
    };

    const cancelEdit = () => {
        setEditingField(null);
    };

    return (
        <div className="h-screen bg-gray-100 flex flex-col items-center justify-between">
            <div className="h-[85%] w-[90%] bg-white p-6 rounded-lg shadow-md flex flex-col">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Product Constructor</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow relative">
                    {/* Image Upload Section */}
                    <div className="bg-white rounded-lg flex items-center justify-center border-dashed border-2 border-gray-300 relative group">
                        {image ? (
                            <div className="relative flex items-center justify-center w-[300px] h-[300px]">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Product Preview"
                                    className="h-full w-full object-contain rounded-lg"
                                />
                                <label
                                    htmlFor="image"
                                    className="absolute inset-0 m-auto bg-gray-500 bg-opacity-50 text-white flex items-center justify-center rounded-full w-10 h-10 cursor-pointer hidden group-hover:flex"
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
                                className="cursor-pointer text-gray-600 hover:text-gray-800 flex flex-col items-center justify-center h-[300px] w-[300px]"
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

                    {/* Product Details Section */}
                    <div className="flex flex-col justify-between h-full">
                        <div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                {editingField === 'productName' ? (
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={productName}
                                            onChange={(e) => setProductName(e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-2xl font-bold pr-12"
                                        />
                                        <button
                                            onClick={() => setEditingField(null)}
                                            className="absolute inset-y-0 right-0 px-3 py-2 bg-indigo-600 text-white text-sm rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            ✓
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold">{productName || 'No name provided'}</span>
                                        <button
                                            onClick={() => setEditingField('productName')}
                                            className="text-gray-500 hover:text-gray-800"
                                        >
                                            ✏️
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                                {editingField === 'price' ? (
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xl text-gray-800 font-semibold pr-12"
                                        />
                                        <button
                                            onClick={() => setEditingField(null)}
                                            className="absolute inset-y-0 right-0 px-3 py-2 bg-indigo-600 text-white text-sm rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            ✓
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl text-gray-800 font-semibold">{price || 'No price provided'}</span>
                                        <button
                                            onClick={() => setEditingField('price')}
                                            className="text-gray-500 hover:text-gray-800"
                                        >
                                            ✏️
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                {editingField === 'description' ? (
                                    <div className="relative">
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-700 pr-12"
                                            rows={4}
                                        ></textarea>
                                        <button
                                            onClick={() => setEditingField(null)}
                                            className="absolute top-1/2 transform -translate-y-1/2 right-0 px-3 py-2 bg-indigo-600 text-white text-sm rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            ✓
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-700">{description || 'No description provided'}</span>
                                        <button
                                            onClick={() => setEditingField('description')}
                                            className="text-gray-500 hover:text-gray-800"
                                        >
                                            ✏️
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 w-[90%] flex justify-end gap-4">
                <button
                    onClick={saveProduct}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Save Product
                </button>
                <button
                    onClick={cancelEdit}
                    className="bg-red-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
