'use client';

import React, { useState } from 'react';
import {Product} from "@/types/Product";
import ProductCardList from "@/components/ProductCard/ProductCardList";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Buttons/Button";
import FilterIcon from "@/icons/FilterIcon";
import ChevronDownIcon from "@/icons/ChevronDownIcon";
import SortIcon from "@/icons/SortIcon";
import SortDropdown from "@/components/DropDowns/SortDropDown";
import FilterModal from "@/components/Modal/FilterModal";

const brands = ['Apple', 'Asus', 'Acer', 'Allview', 'Atari', 'AMD', 'Aruba', 'Beats'];

const products: Product[] = [
    {
        id: 1,
        name: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
        price: 1699,
        rating: 5,
        reviewCount: 455,
        imageUrl: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg',
        discount: 'Up to 35% off',
    },
    {
        id: 2,
        name: 'Asus ZenBook 14, 1TB HDD, Retina 5K Display, M3 Max',
        price: 999,
        rating: 4,
        reviewCount: 300,
        discount: 'Up to 35% off',
        imageUrl: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/zenbook.svg',
    },

];

export default function Page() {
    const [isSortDropdownVisible, setSortDropdownVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleSortDropdown = () => {
        setSortDropdownVisible(!isSortDropdownVisible);
    };

    // Функция для открытия/закрытия модального окна
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    const breadcrumbPaths = ['Home', 'Products', 'Electronics'];
    return (
        <div>
            <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">

                    <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                        <Breadcrumb paths={breadcrumbPaths}/>


                        <div className="flex items-center space-x-4">

                            {/* Кнопка для открытия модального окна */}
                            <Button
                                className="filterButton"
                                text="Filters"
                                leftIcon={<FilterIcon/>}
                                rightIcon={<ChevronDownIcon/>}
                                onClick={toggleModal}
                            />

                            {/* Модальное окно для фильтров, передаем список брендов */}
                            <FilterModal isVisible={isModalVisible} onClose={toggleModal} brands={brands}/>

                            <div className="relative inline-block">
                                <Button className={"sortButton"} text={"Sort"} rightIcon={<ChevronDownIcon/>}
                                        leftIcon={<SortIcon/>}
                                        onClick={toggleSortDropdown}/>
                                <SortDropdown isVisible={isSortDropdownVisible}/>

                            </div>
                            </div>
                        </div>

                        <div>
                        <ProductCardList products={products}/>
                    </div>
                    <div className="flex justify-center mt-2.5">
                        <Button text="Show more"/>
                    </div>
                </div>

            </section>
        </div>
    );
}
