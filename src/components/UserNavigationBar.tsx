'use client';

import React from 'react';
import Logo from './Logo';
import UserNavigationLinks from "@/components/UserNavigationLinks"; // Импортируем компонент Logo


export default function UserNavigationbar() {
    return (
        <nav className="bg-gray-200 border-black dark:bg-gray-900">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto p-4">
                {/* Логотип слева */}
                <div className="flex-shrink-0">
                    <Logo />
                </div>

                {/* Плашки для переходов по центру */}
                <div className="flex-grow flex justify-center relative" style={{left: '-150px'}}>
                    <UserNavigationLinks/>
                </div>
            </div>
        </nav>
    );
}
