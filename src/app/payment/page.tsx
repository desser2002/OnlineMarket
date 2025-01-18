'use client';

import React, { useEffect, useState } from "react";
import PaymentForm from "@/app/payment/components/PaymentForm";
import { OrderSummaryData } from "@/types/OrderSummaryData";
import OrderSummary from "@/components/OrderSummary/OrderSummary";
import PaymentSuccessCard from "@/components/Payments/PaymentSuccessCard";
import { CartItem } from "@/types/CartItem";
import { fetchUserCart } from "@/hooks/UserCart";

export default function Page() {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [orderSummary, setOrderSummary] = useState<OrderSummaryData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
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
            setLoading(false);
            return;
        }

        fetchUserCart(Number(userId), token)
            .then((data) => {
                setCartItems(data);

                // Рассчитываем OrderSummary на основе корзины
                const originalPrice = data.reduce((sum, item) => sum + item.product.price * item.amount, 0);
                const storePickup = data.length * 10; // Пример фиксированной стоимости
                const tax = originalPrice * 0.1; // Пример налога (10%)
                const totalPrice = originalPrice + storePickup + tax;

                setOrderSummary({ originalPrice, storePickup, tax, totalPrice });
                setError(null);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const handlePayment = () => {
        setPaymentSuccess(true); // Показать карточку успешного платежа
    };

    const closePaymentSuccessCard = () => {
        setPaymentSuccess(false); // Скрыть карточку
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div>
            <section className="bg-white py-8 min-h-screen antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>

                        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                            <PaymentForm onSubmit={handlePayment} />
                            <div className="mt-6 grow sm:mt-8 lg:mt-0">
                                {orderSummary && <OrderSummary summary={orderSummary} />}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {paymentSuccess && (
                <PaymentSuccessCard
                    refNumber="000085752257"
                    paymentTime="25-02-2023, 13:22:16"
                    paymentMethod="Bank Transfer"
                    senderName="Antonio Roberto"
                    amount={`$${orderSummary?.totalPrice.toFixed(2)}`} // Отображаем итоговую сумму
                    adminFee="IDR 193.00"
                    onClose={closePaymentSuccessCard} // Закрытие модального окна
                />
            )}
        </div>
    );
}
