'use client';

import React, { useState } from "react";
import PaymentForm from "@/app/payment/components/PaymentForm";
import { OrderSummaryData } from "@/types/OrderSummaryData";
import OrderSummary from "@/components/OrderSummary/OrderSummary";
import PaymentSuccessCard from "@/components/Payments/PaymentSuccessCard";

const orderSummary: OrderSummaryData = {
    originalPrice: 300,
    storePickup: 10,
    tax: 5,
    totalPrice: 315,
};

export default function Page() {
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handlePayment = () => {
        setPaymentSuccess(true); // Показать карточку успешного платежа
    };

    const closePaymentSuccessCard = () => {
        setPaymentSuccess(false); // Скрыть карточку
    };

    return (
        <div>
            <section className="bg-white py-8 min-h-screen antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>

                        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                            <PaymentForm onSubmit={handlePayment} />
                            <div className="mt-6 grow sm:mt-8 lg:mt-0">
                                <OrderSummary summary={orderSummary} />
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
                    amount="IDR 1,000,000"
                    adminFee="IDR 193.00"
                    onClose={closePaymentSuccessCard} // Закрытие модального окна
                />
            )}
        </div>
    );
}
