import React from 'react';

interface TextButtonProps {
    text?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    textColor?: string; // Цвет текста кнопки
    url?: string; // URL для перенаправления
}

const TextButton: React.FC<TextButtonProps> = ({
                                                   text,
                                                   leftIcon,
                                                   rightIcon,
                                                   onClick,
                                                   className = '',
                                                   textColor = 'text-gray-900', // Цвет текста по умолчанию
                                                   url, // URL для перенаправления
                                               }) => {
    const handleClick = () => {
        if (onClick) {
            onClick(); // Вызов функции onClick при наличии
        }
        if (url) {
            window.location.href = `http://localhost:3000${url}`; // Перенаправление на указанный локальный URL
        }
    };

    return (
        <button
            type="button"
            className={`flex items-center justify-center text-sm font-medium ${textColor} hover:underline ${className}`}
            onClick={handleClick}
        >
            {leftIcon && <span className="mr-1.5 h-5 w-5">{leftIcon}</span>}
            <span className="text-center">{text}</span>
            {rightIcon && <span className="ml-2 h-5 w-5">{rightIcon}</span>}
        </button>
    );
};

export default TextButton;
