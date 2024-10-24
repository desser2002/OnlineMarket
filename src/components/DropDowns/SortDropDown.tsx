import React from 'react';

interface DropdownProps {
    isVisible: boolean;  // Флаг видимости выпадающего списка
}

const SortDropdown: React.FC<DropdownProps> = ({ isVisible }) => {
    return (
        <div
            id="dropdownSort1"
            className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-2 z-50 ${isVisible ? '' : 'hidden'} w-40 divide-y divide-gray-900 rounded-lg bg-white shadow dark:bg-gray-900`}
        >
            <ul
                className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                aria-labelledby="sortDropdownButton"
            >
                <li>
                    <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        The most popular
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Newest
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Increasing price
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Decreasing price
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        No. reviews
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Discount %
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default SortDropdown;
