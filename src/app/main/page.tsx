'use client';

import React, { useEffect, useState } from 'react';
import SellerNavigationbar from '@/components/SellerNavigationbar';
import { fetchCategories } from "@/hooks/fetchCategories";
import { Category } from "@/types/Category";
import UserNavigationbar from "@/components/UserNavigationBar";

export default function CategoryPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const tokenFromCookies = document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))?.split('=')[1] || null;

        const usernameFromCookies = document.cookie
            .split('; ')
            .find((row) => row.startsWith('email='))?.split('=')[1] || null;
        const userRole = document.cookie.split('; ').find(row => row.startsWith('role='))?.split('=')[1] || null;
        setRole(userRole);
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

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* Навигационная панель */}
            {role === 'SELLER' ? <SellerNavigationbar /> : <UserNavigationbar />}

            {/* Секция с категориями */}
            <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-16 flex-grow overflow-auto">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Categories</h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {categories.map((category) => (
                            <a
                                key={category.id}
                                href={`/products/${category.name.toLowerCase().replace(/ /g, '-')}`} // Путь с категорией в URL
                                className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                {/* Используем <img> для загрузки иконки из папки public */}
                                <img
                                    src={`/icons/icon-${category.name.toLowerCase().replace(/ /g, '-')}.svg`} // Путь к иконке
                                    alt={category.name}
                                    className="me-2 h-6 w-6 shrink-0 text-gray-900 dark:text-white"
                                />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</span>
                            </a>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
}
