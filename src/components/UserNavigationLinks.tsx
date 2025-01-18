'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Импортируем useRouter

export default function UserNavigationLinks() {
    const router = useRouter(); // Инициализируем useRouter

    const handleCategorys = () => {
        router.push('/main'); // Переход на страницу /order-overview
    };

    const handleCartClick = () => {
        router.push('/cart'); // Переход на страницу /add-product
    };

    return (
        <div className="flex items-center justify-center space-x-8 mt-4 sm:mt-0">
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
