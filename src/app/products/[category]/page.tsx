'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Используем useParams для получения параметров пути
import ProductCardList from "@/components/ProductCard/ProductCardList";
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';

import SellerNavigationbar from "@/components/SellerNavigationbar";
import UserNavigationbar from "@/components/UserNavigationBar";


 // Хук для получения товаров по категории
import { Product } from "@/types/Product";
import {fetchProductsByCategory} from "@/hooks/products";
import {capitalizeFirstLetter} from "@/hooks/toupercase";

export default function Page() {
    const { category } = useParams(); // Получаем параметр категории из URL

    const [products, setProducts] = useState<Product[]>([]);
    const [isSortDropdownVisible, setSortDropdownVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('Guest');
    const [userid, setUserId] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false); // Для проверки на клиенте


    useEffect(() => {
        // Проверяем только на клиенте
        if (typeof window !== 'undefined') {
            setIsClient(true);
        }

        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        const userEmail = document.cookie.split('; ').find(row => row.startsWith('email='))?.split('=')[1];
        const userIdFromCookie = document.cookie.split('; ').find(row => row.startsWith('userid='))?.split('=')[1];
        const userRole = document.cookie.split('; ').find(row => row.startsWith('role='))?.split('=')[1] || null;

        if (!token) {
            setError('Authorization token is missing');
            return;
        }

        setEmail(userEmail || 'Guest');
        setUserId(userIdFromCookie || null);
        setRole(userRole);

        if (category) {
            // Получаем товары для категории
            fetchProductsByCategory(token, category as string)
                .then(fetchedProducts => setProducts(fetchedProducts))
                .catch(err => setError(err.message));
        }
    }, [category]);

    if (!isClient) {
        return null; // Пока не подтверждено, что мы на клиенте
    }

    return (
        <div>
            {/* Условная навигация в зависимости от роли */}
            {role === 'SELLER' ? <SellerNavigationbar /> : <UserNavigationbar />}

            <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12 min-h-screen">
                <div className="min-h-screen mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                        {/* Используем название категории из URL */}
                        <Breadcrumb currentCategory={capitalizeFirstLetter(category as string)} />
                    </div>

                    <div>
                        {error ? (
                            <p className="text-red-500 text-center">{error}</p>
                        ) : (
                            <ProductCardList products={products} />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
