'use client';

import React, { useState } from 'react';
import SortButton from "@/components/Buttons/SortButton";
import Dropdown from "@/components/DropDowns/SortDropDown";

export default function Page() {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return (
        <div>
            <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">

                    <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                        <div>
                            <nav className="flex" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                    <li className="inline-flex items-center">
                                        <a href="#"
                                           className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white">
                                            <svg className="mr-2.5 h-3 w-3" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                 viewBox="0 0 20 20">
                                                <path
                                                    d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                            </svg>
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                 viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round"
                                                      strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                                            </svg>
                                            <a href="#"
                                               className="ml-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ml-2">Products</a>
                                        </div>
                                    </li>
                                    <li aria-current="page">
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                 viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round"
                                                      strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                                            </svg>
                                            <span
                                                className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">Electronics</span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                            <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Electronics</h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button data-modal-toggle="filterModal" data-modal-target="filterModal" type="button"
                                    className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">
                                <svg className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                                          d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"/>
                                </svg>
                                Filters
                                <svg className="-mr-0.5 ml-2 h-4 w-4" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m19 9-7 7-7-7"/>
                                </svg>
                            </button>
                            <SortButton toggleDropdown={toggleDropdown} />
                            <Dropdown isVisible={isDropdownVisible} />

                        </div>
                    </div>

                    <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                        {/* Пример продукта */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="h-56 w-full">
                                <a href="#">
                                    <img className="mx-auto h-full dark:hidden"
                                         src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                                         alt="Product"/>
                                    <img className="mx-auto hidden h-full dark:block"
                                         src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                         alt="Product"/>
                                </a>
                            </div>
                            <div className="pt-6">
                                <div className="mb-4 flex items-center justify-between gap-4">
                                    <span
                                        className="mr-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                                        Up to 35% off
                                    </span>
                                    <div className="flex items-center justify-end gap-1">
                                        <button type="button" data-tooltip-target="tooltip-quick-look"
                                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <span className="sr-only">Quick look</span>
                                            <svg className="h-5 w-5" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                 viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeWidth="2"
                                                      d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                                                <path stroke="currentColor" strokeWidth="2"
                                                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                            </svg>
                                        </button>

                                        <button type="button" data-tooltip-target="tooltip-add-to-favorites"
                                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <span className="sr-only">Add to Favorites</span>
                                            <svg className="h-5 w-5" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round"
                                                      strokeLinejoin="round" strokeWidth="2"
                                                      d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <a href="#"
                                   className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">Apple
                                    iMac 27", 1TB HDD, Retina 5K Display, M3 Max</a>

                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, index) => (
                                            <svg key={index} className="h-4 w-4 text-yellow-400" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z"/>
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">5.0</p>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">(455)</p>
                                </div>

                                <div className="mt-4 flex items-center justify-between gap-4">
                                    <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">$1,699</p>

                                    <button type="button"
                                            className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        <svg className="-ml-2 mr-2 h-5 w-5" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                             viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"/>
                                        </svg>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="w-full text-center">
                        <button type="button"
                                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                            Show more
                        </button>
                    </div>
                </div>

                <form action="#" method="get" id="filterModal" aria-hidden="true"
                      className="fixed left-0 right-0 top-0 z-50 hidden h-modal w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full">
                    <div className="relative h-full w-full max-w-xl md:h-auto">

                        <div className="relative rounded-lg bg-white shadow dark:bg-gray-800">

                            <div className="flex items-start justify-between rounded-t p-4 md:p-5">
                                <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">Filters</h3>
                                <button type="button"
                                        className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-toggle="filterModal">
                                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                         width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <div className="px-4 md:px-5">
                                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                                    <ul className="-mb-px flex flex-wrap text-center text-sm font-medium" id="myTab"
                                        data-tabs-toggle="#myTabContent" role="tablist">
                                        <li className="mr-1" role="presentation">
                                            <button className="inline-block pb-2 pr-1" id="brand-tab"
                                                    data-tabs-target="#brand" type="button" role="tab"
                                                    aria-controls="profile" aria-selected="false">Brand
                                            </button>
                                        </li>
                                        <li className="mr-1" role="presentation">
                                            <button
                                                className="inline-block px-2 pb-2 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                                                id="advanced-filers-tab" data-tabs-target="#advanced-filters"
                                                type="button" role="tab" aria-controls="advanced-filters"
                                                aria-selected="false">Advanced Filters
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div id="myTabContent">
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3" id="brand" role="tabpanel"
                                         aria-labelledby="brand-tab">
                                        <div className="space-y-2">
                                            <h5 className="text-lg font-medium uppercase text-black dark:text-white">A</h5>

                                            <div className="flex items-center">
                                                <input id="apple" type="checkbox" value=""
                                                       className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"/>

                                                <label htmlFor="apple"
                                                       className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Apple
                                                    (56) </label>
                                            </div>

                                            <div className="flex items-center">
                                                <input id="asus" type="checkbox" value="" checked
                                                       className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"/>

                                                <label htmlFor="asus"
                                                       className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Asus
                                                    (97) </label>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="flex items-center space-x-4 rounded-b p-4 dark:border-gray-600 md:p-5">
                                <button type="submit"
                                        className="rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-700 dark:hover:bg-primary-800 dark:focus:ring-primary-800">Show
                                    50 results
                                </button>
                                <button type="reset"
                                        className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}
