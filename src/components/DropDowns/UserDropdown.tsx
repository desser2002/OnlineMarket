import React, { useState } from 'react';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';

interface UserDropdownMenuProps {
    email: string; // Пропс email должен быть строкой
    userid: string | null;
}

export default function UserDropdownMenu({ email,userid }: UserDropdownMenuProps) {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                id="avatarButton"
                className="flex items-center text-sm text-gray-800 dark:text-white focus:outline-none"
            >
                <img
                    className="w-8 h-8 rounded-full"
                    src="https://via.placeholder.com/150"
                    alt="User avatar"
                />
                <ChevronDownIcon />
            </button>

            {isDropdownVisible && (
                <div
                    id="userDropdown"
                    className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div className="font-medium truncate">{userid || 'Guest'}</div>
                        <div className="font-medium truncate">{email || 'Guest'}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Settings
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Earnings
                            </a>
                        </li>
                    </ul>
                    <div className="py-1">
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                            Sign out
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
