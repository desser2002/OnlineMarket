'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Импортируем useRouter

interface BreadcrumbProps {
    currentCategory: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentCategory }) => {
    const router = useRouter(); // Инициализируем useRouter

    const handleCategoryClick = () => {
        // Переход на страницу с категориями
        router.push('/main');
    };

    return (
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <div>
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        {/* Статичная ссылка на Categorys */}
                        <li className="inline-flex items-center">
                            <a
                                href="#"
                                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
                                onClick={handleCategoryClick}
                            >
                                Categorys
                            </a>
                            <svg
                                className="h-5 w-5 text-gray-400 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m9 5 7 7-7 7"
                                />
                            </svg>
                        </li>

                        {/* Текущая категория (не кликабельная) */}
                        <li className="inline-flex items-center">
                            <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">
                                {currentCategory}
                            </span>
                        </li>
                    </ol>
                </nav>

                <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    {currentCategory}
                </h2>
            </div>
        </div>
    );
};

export default Breadcrumb;
