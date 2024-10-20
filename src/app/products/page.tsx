'use client';

import React, { useState } from 'react';
import Dropdown from "@/components/DropDowns/SortDropDown";
import {Product} from "@/types/Product";
import ProductCardList from "@/components/ProductCard/ProductCardList";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Buttons/Button";
import FilterIcon from "@/icons/FilterIcon";
import ChevronDownIcon from "@/icons/ChevronDownIcon";
import SortIcon from "@/icons/SortIcon";


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
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const breadcrumbPaths = ['Home', 'Products', 'Electronics'];
    return (
        <div>
            <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">

                    <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                        <Breadcrumb paths={breadcrumbPaths}/>


                        <div className="flex items-center space-x-4">
                            <Button
                                className={"filterButton"}
                                text="Filters"
                                leftIcon={<FilterIcon/>}
                                rightIcon={<ChevronDownIcon/>}
                            />

                            <Button text={"Sort"} rightIcon={<ChevronDownIcon/>} leftIcon={<SortIcon/>}
                                    onClick={toggleDropdown}/>
                            <Dropdown isVisible={isDropdownVisible}/>

                        </div>
                    </div>

                    <div>
                        <ProductCardList products={products}/>
                    </div>
                    <div className="flex justify-center mt-2.5"> {/* Центрирование и отступ */}
                        <Button text="Show more"/>
                    </div>
                </div>

            </section>
        </div>
    );
}
