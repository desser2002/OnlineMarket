'use client';

import React from 'react';
import Logo from './Logo'; // Импортируем компонент Logo
import NavigationLinks from './NavigationLinks'; // Импортируем компонент NavigationLinks

export default function NavigationBar() {
    return (
        <nav className="bg-gray-200 border-black dark:bg-gray-900">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto p-4">
                {/* Логотип слева */}
                <div className="flex-shrink-0">
                    <Logo />
                </div>

                {/* Плашки для переходов по центру */}
                <div className="flex-grow flex justify-center relative" style={{left: '-150px'}}>
                    <NavigationLinks/>
                </div>
            </div>
        </nav>
    );
}
