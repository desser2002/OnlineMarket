import React, { useState } from 'react';

import TextButton from "@/components/Buttons/textButton";
import { CartItem } from "@/types/CartItem";
import Counter from "@/components/counter/Counter";

interface CartProductCardProps {
    cartItem: CartItem;
    onRemove: () => void; // Функция для удаления товара
}

const CartProductCard: React.FC<CartProductCardProps> = ({ cartItem, onRemove }) => {
    const [count, setCount] = useState(cartItem.count);

    const handleIncrement = () => {
        setCount(prevCount => (prevCount < 10 ? prevCount + 1 : prevCount)); // Лимит на 10 единиц
    };

    const handleDecrement = () => {
        setCount(prevCount => (prevCount > 1 ? prevCount - 1 : prevCount)); // Минимум 1 единица
    };

    return (
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1">
                            <img className="h-20 w-20 dark:hidden" src={cartItem.imageUrl} alt="product image" />
                            <img className="hidden h-20 w-20 dark:block" src={cartItem.imageUrl} alt="product image" />
                        </a>

                        <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <Counter
                                count={count}
                                onIncrement={handleIncrement}
                                onDecrement={handleDecrement}
                                min={1}
                                max={10}
                            />
                            <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-gray-900 dark:text-white">{cartItem.price}$</p>
                            </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                                {cartItem.text}
                            </a>
                            <div className="flex items-center gap-4">
                                <TextButton
                                    text="Remove"
                                    textColor="text-red-600"
                                    leftIcon={
                                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                        </svg>
                                    }
                                    onClick={onRemove} // Вызываем функцию удаления при клике
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProductCard;
