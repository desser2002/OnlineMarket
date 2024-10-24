'use client';

import { CartItem } from "@/types/CartItem";
import CartProductCard from "@/components/ProductCard/CartProductCard";
import { useState } from "react";
import OrderSummary from "@/components/OrderSummary/OrderSummary";
import { OrderSummaryData } from "@/types/OrderSummaryData";

const initialCartItems: CartItem[] = [
    {
        product_id: 1,
        id: 1,
        text: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
        price: 1699,
        imageUrl: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg',
        count: 1,
    },
    {
        product_id: 2,
        id: 2,
        text: 'Apple MacBook Pro 16", M2 Pro, 512GB SSD',
        price: 2399,
        imageUrl: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro.svg',
        count: 1,
    },
];

const calculateOrderSummary = (cartItems: CartItem[]): OrderSummaryData => {
    const originalPrice = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
    const storePickup = cartItems.length * 10;
    const tax = originalPrice * 0.1; // Допустим, налог 10%
    const totalPrice = originalPrice + storePickup + tax;

    return {
        originalPrice,
        storePickup,
        tax,
        totalPrice,
    };
};

export default function Page() {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    const handleRemoveItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id)); // Удаляем товар из списка
    };

    const handleUpdateItemCount = (id: number, newCount: number) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, count: newCount } : item
        )); // Обновляем количество товара
    };

    const orderSummaryData = calculateOrderSummary(cartItems);

    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 min-h-screen">
            <div className="mx-auto max-h-screen-xl max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8 gap-2.5">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        {cartItems.map((item) => (
                            <CartProductCard
                                key={item.id}
                                cartItem={item}
                                onRemove={() => handleRemoveItem(item.id)}
                                onUpdateCount={(newCount) => handleUpdateItemCount(item.id, newCount)}
                            />
                        ))}
                    </div>

                    <OrderSummary summary={orderSummaryData} />
                </div>
            </div>
        </section>
    );
}
