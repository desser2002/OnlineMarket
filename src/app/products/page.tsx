'use client';

import React, { useEffect, useState } from 'react';

import ProductCardList from "@/components/ProductCard/ProductCardList";
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Button from '@/components/Buttons/Button';
import FilterIcon from '@/components/icons/FilterIcon';
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import SortIcon from "@/components/icons/SortIcon";
import SortDropdown from '@/components/DropDowns/SortDropDown';
import FilterModal from "@/components/Modal/FilterModal";
import CartIcon from '@/components/icons/CartIcon';


import { fetchProducts } from "@/hooks/products";
import UserDropdownMenu from "@/components/DropDowns/UserDropdown";
import {Product} from "@/types/Product";


const brands = ['Apple', 'Asus', 'Acer', 'Allview', 'Atari', 'AMD', 'Aruba', 'Beats'];

export default function Page() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isSortDropdownVisible, setSortDropdownVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('Guest'); // Установлено значение по умолчанию
    const [userid, setUserId] = useState<string | null>(null); // Для хранения userid

    const toggleSortDropdown = () => {
        setSortDropdownVisible(!isSortDropdownVisible);
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const navigateToCart = () => {
        window.location.href = '/cart';
    };

    const breadcrumbPaths = ['Home', 'Products', 'Electronics'];

    // Fetch email, userid, и token из cookies
    useEffect(() => {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

        const userEmail = document.cookie
            .split('; ')
            .find(row => row.startsWith('email='))
            ?.split('=')[1];

        const userIdFromCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('userid='))
            ?.split('=')[1];

        if (!token) {
            setError('Authorization token is missing');
            return;
        }

        setEmail(userEmail || 'Guest'); // Если email отсутствует, используем 'Guest'
        setUserId(userIdFromCookie || null); // Устанавливаем userid, если он есть в cookies

        fetchProducts(token)
            .then(fetchedProducts => setProducts(fetchedProducts))
            .catch(err => setError(err.message));
    }, []);

    return (
        <div>
            <header className="flex justify-between items-center px-4 py-2 bg-white shadow dark:bg-gray-900">
                <h1 className="text-lg font-bold text-gray-800 dark:text-white">WebMarket</h1>

                {/* Передаём email и userid в UserDropdownMenu */}
                <UserDropdownMenu email={email} userid={userid} />
            </header>

            <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12 min-h-screen">
                <div className="min-h-screen mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                        <Breadcrumb paths={breadcrumbPaths} />

                        <div className="flex items-center space-x-4">
                            <Button
                                className="filterButton"
                                text="Filters"
                                leftIcon={<FilterIcon />}
                                rightIcon={<ChevronDownIcon />}
                                onClick={toggleModal}
                            />

                            <FilterModal isVisible={isModalVisible} onClose={toggleModal} brands={brands} />

                            <div className="relative inline-block">
                                <Button
                                    className="sortButton"
                                    text="Sort"
                                    rightIcon={<ChevronDownIcon />}
                                    leftIcon={<SortIcon />}
                                    onClick={toggleSortDropdown}
                                />
                                <SortDropdown isVisible={isSortDropdownVisible} />
                            </div>
                            <Button
                                text="Cart"
                                leftIcon={<CartIcon />}
                                onClick={navigateToCart}
                                className="cartButton"
                            />
                        </div>
                    </div>

                    <div>
                        {error ? (
                            <p className="text-red-500 text-center">{error}</p>
                        ) : (
                            <ProductCardList products={products} />
                        )}
                    </div>
                    <div className="flex justify-center mt-2.5">
                        <Button text="Show more" />
                    </div>
                </div>
            </section>
        </div>
    );
}
