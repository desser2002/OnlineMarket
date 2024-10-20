import React from 'react';

interface TextButtonProps {
    text?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClick?: () => void;
    className?: string;

    textColor?: string; // Цвет текста кнопки
}

const TextButton: React.FC<TextButtonProps> = ({
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
            className={`inline-flex items-center text-sm font-medium ${textColor} hover:underline ${className}`}
            onClick={onClick}
        >
            {/* Условно рендерим иконку слева, если она есть */}
            {leftIcon && <span className="mr-1.5 h-5 w-5">{leftIcon}</span>}

            {/* Текст кнопки */}
            {text}

            {/* Условно рендерим иконку справа, если она есть */}
            {rightIcon && <span className="ml-2 h-5 w-5">{rightIcon}</span>}
        </button>
    );
};

export default TextButton;
