import React from 'react';

interface TextButtonProps {
    text?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClick?: () => void;
    className?: string;

    textColor?: string; // Цвет текста кнопки
}

const Button: React.FC<TextButtonProps> = ({
                                           text,
                                           leftIcon,
                                           rightIcon,
                                           onClick,
                                           className = '',
                                           textColor = 'text-gray-900', // Цвет текста по умолчанию
                                       }) => {
    return (
        <button
            type="button"
            className="inline-flex items-center text-sm font-medium ${textColor} hover:underline dark:text-red-500"  onClick={onClick}
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
