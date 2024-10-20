'use client';


import { CartItem } from "@/types/CartItem";
import CartItemList from "@/components/ProductCard/CartitemList";
import {useState} from "react";
import OrderSummary from "@/components/OrderSummary/OrderSummary";

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
    // Добавьте больше товаров в корзине
];

export default function Page() {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    const handleRemoveItem = (id: number) => {

        setCartItems(cartItems.filter(item => item.id !== id)); // Удаляем товар из списка
    };
    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-h-screen-xl max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <CartItemList cartItems={cartItems} onRemoveItem={handleRemoveItem}/>
                    </div>

                    <OrderSummary />
                </div>
            </div>
        </section>
    );
}
