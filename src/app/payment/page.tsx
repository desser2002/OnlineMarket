'use client';

import React, { useEffect, useState } from "react";
import PaymentForm from "@/app/payment/components/PaymentForm";
import { OrderSummaryData } from "@/types/OrderSummaryData";
import OrderSummary from "@/components/OrderSummary/OrderSummary";
import PaymentSuccessCard from "@/components/Payments/PaymentSuccessCard";
import { CartItem } from "@/types/CartItem";
import { fetchUserCart } from "@/hooks/UserCart";
import { processPayment } from "@/hooks/useProcessPayment";

export default function Page() {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        refNumber: "",
        paymentTime: "",
        paymentMethod: "",
        senderName: "",
        adminFee: "IDR 193.00",
    });
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [orderSummary, setOrderSummary] = useState<OrderSummaryData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [processing, setProcessing] = useState<boolean>(false);

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

    const handlePayment = async (formData: { fullName: string; cardNumber: string; expiration: string; cvv: string }) => {
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

        setProcessing(true); // Устанавливаем состояние загрузки
        try {
            await processPayment(Number(userId), token);

            // Устанавливаем данные успешного платежа
            setPaymentDetails({
                refNumber: Math.random().toString().slice(2, 12), // Пример случайного номера транзакции
                paymentTime: new Date().toLocaleString(), // Текущее время
                paymentMethod: "Credit Card", // Используем значение по умолчанию
                senderName: formData.fullName, // Используем имя из формы
                adminFee: "IDR 193.00",
            });
            setPaymentSuccess(true); // Показываем успешный результат
        } catch (err: any) {
            setError(err.message);
        } finally {
            setProcessing(false); // Убираем состояние загрузки
        }
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
                            <PaymentForm
                                onSubmit={(formData) => handlePayment(formData)}
                            />
                            <div className="mt-6 grow sm:mt-8 lg:mt-0">
                                {orderSummary && <OrderSummary summary={orderSummary} />}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {paymentSuccess && (
                <PaymentSuccessCard
                    refNumber={paymentDetails.refNumber}
                    paymentTime={paymentDetails.paymentTime}
                    paymentMethod={paymentDetails.paymentMethod}
                    senderName={paymentDetails.senderName}
                    amount={`$${orderSummary?.totalPrice.toFixed(2)}`} // Отображаем итоговую сумму
                    adminFee={paymentDetails.adminFee}
                    onClose={closePaymentSuccessCard} // Закрытие модального окна
                />
            )}
        </div>
    );
}
