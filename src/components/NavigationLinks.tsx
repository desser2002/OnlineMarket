'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Импортируем useRouter

export default function NavigationLinks() {
    const router = useRouter(); // Инициализируем useRouter

    const handleMyOrdersClick = () => {
        router.push('/order-overview');
    };

    const handleAddNewProductClick = () => {
        router.push('/add-product');
    };


    const handleCategorys = () => {
        router.push('/main');
    };

    const handleCartClick = () => {
        router.push('/cart');
    };
    return (
        <div className="flex items-center justify-center space-x-8 mt-4 sm:mt-0">
            <button
                onClick={handleMyOrdersClick}
                className="text-gray-900 dark:text-white hover:text-blue-600 font-medium rounded-lg text-sm px-4 py-2 dark:hover:text-blue-500"
            >
                My orders
            </button>
            <button
                onClick={handleAddNewProductClick}
                className="text-gray-900 dark:text-white hover:text-blue-600 font-medium rounded-lg text-sm px-4 py-2 dark:hover:text-blue-500"
            >
                Add new product
            </button>

                <button
                    onClick={handleCategorys}
                    className="text-gray-900 dark:text-white hover:text-blue-600 font-medium rounded-lg text-sm px-4 py-2 dark:hover:text-blue-500"
                >
                    Categorys
                </button>
                <button
                    onClick={handleCartClick}
                    className="text-gray-900 dark:text-white hover:text-blue-600 font-medium rounded-lg text-sm px-4 py-2 dark:hover:text-blue-500"
                >
                    My cart
                </button>

        </div>
    );
}
