'use client';

import React, { useEffect, useState } from "react";
import CartProductCard from "@/components/ProductCard/CartProductCard";
import OrderSummary from "@/components/OrderSummary/OrderSummary";
import TextButton from "@/components/Buttons/textButton";
import ArrowIcon from "@/components/icons/ArrowIcon";
import { CartItem } from "@/types/CartItem";
import { OrderSummaryData } from "@/types/OrderSummaryData";
import { fetchUserCart } from "@/hooks/UserCart";
import {removeCartItem} from "@/hooks/useRemoveCartItem";
import {updateCartItem} from "@/hooks/useUpdateCartItem";
import SellerNavigationbar from "@/components/SellerNavigationbar";
import UserNavigationbar from "@/components/UserNavigationBar";
 // Импорт хуков для API

const calculateOrderSummary = (cartItems: CartItem[]): OrderSummaryData => {
    const originalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.amount, 0);
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
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [role, setRole] = useState<string | null>(null);
    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        const userId = document.cookie
            .split("; ")
            .find((row) => row.startsWith("userid="))
            ?.split("=")[1];
        const userRole = document.cookie.split('; ').find(row => row.startsWith('role='))?.split('=')[1] || null;

        if (!token || !userId) {
            setError("Authorization token or user ID is missing.");
            setLoading(false);
            return;
        }
        setRole(userRole);
        fetchUserCart(Number(userId), token)
            .then((data) => {
                setCartItems(data);
                setError(null);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const handleRemoveItem = async (productId: number) => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        const userId = document.cookie
            .split("; ")
            .find((row) => row.startsWith("userid="))
            ?.split("=")[1];

        if (!token || !userId) {
            setError("Authorization token or user ID is missing.");
            return;
        }

        try {
            await removeCartItem(Number(userId), productId, token);
            setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleUpdateItemCount = async (productId: number, newCount: number) => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        const userId = document.cookie
            .split("; ")
            .find((row) => row.startsWith("userid="))
            ?.split("=")[1];

        if (!token || !userId) {
            setError("Authorization token or user ID is missing.");
            return;
        }

        try {
            await updateCartItem(Number(userId), productId, newCount, token);
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.product.id === productId ? { ...item, amount: newCount } : item
                )
            );

        } catch (err: any) {
            setError(err.message);


        }
    };

    const orderSummaryData = calculateOrderSummary(cartItems);


    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div>
        {role === 'SELLER' ? <SellerNavigationbar /> : <UserNavigationbar />}
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 min-h-screen">

            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 min-h-screen">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8 gap-2.5">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        {cartItems.map((item) => (
                            <CartProductCard
                                key={item.id}
                                cartItem={item}
                                onRemove={() => handleRemoveItem(item.product.id)}
                                onUpdateCount={(newCount) => handleUpdateItemCount(item.product.id, newCount)}
                            />
                        ))}
                    </div>
                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <OrderSummary summary={orderSummaryData} />

                        <a
                            href="/payment"
                            className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Proceed to Checkout
                        </a>

                        <div className="flex items-center justify-center gap-2">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">or</span>
                            <TextButton
                                text="Continue Shopping"
                                textColor="text-primary-700"
                                url="/products"
                                rightIcon={<ArrowIcon />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
}
