import React from 'react';

interface ButtonProps {
    text: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, leftIcon, rightIcon, onClick, className = '' }) => {
    return (
        <button
            type="button"
            className={`flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto ${className}`}
            onClick={onClick}
        >
            {/* Условно рендерим иконку слева, если она есть */}
            {leftIcon && <span className="-ml-0.5 mr-2 h-4 w-4">{leftIcon}</span>}

            {/* Текст всегда по центру */}
            <span className="text-center">{text}</span>

            {/* Условно рендерим иконку справа, если она есть */}
            {rightIcon && <span className="ml-2 h-4 w-4">{rightIcon}</span>}
        </button>
    );
};

export default Button;
