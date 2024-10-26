'use client';
import React, { useState } from 'react';
import OrderTypeFilterSelect from "@/app/order-overview/components/OrderTypeDropDownFilter";
import DurationDropDownFilter from "@/app/order-overview/components/DurationDropDownFilter";

import { Order } from "@/types/Order";
import OrderList from "@/components/LIsts/OrderList";

const orders: Order[] = [
    { id: '1', date: '2024-10-01', price: '99.99', status: 'Pre-order' },
    { id: '2', date: '2024-10-21', price: '149.99', status: 'In transit' },
    { id: '3', date: '2024-10-22', price: '199.99', status: 'Confirmed' },
    { id: '4', date: '2024-10-23', price: '249.99', status: 'Cancelled' },
];

export default function Page() {
    const [selectedOrderType, setSelectedOrderType] = useState<string>('All orders');
    const [selectedDuration, setSelectedDuration] = useState<string>('this week');

    const handleOrderTypeChange = (type: string) => setSelectedOrderType(type);
    const handleDurationChange = (duration: string) => setSelectedDuration(duration);

    const getStartDateForDuration = (duration: string): Date => {
        const today = new Date();
        switch (duration) {
            case 'this month':
                return new Date(today.getFullYear(), today.getMonth(), 1);
            case 'last 3 months':
                return new Date(today.getFullYear(), today.getMonth() - 3, 1);
            case 'last 6 months':
                return new Date(today.getFullYear(), today.getMonth() - 6, 1);
            case 'this year':
                return new Date(today.getFullYear(), 0, 1);
            default:
                return new Date(today.setDate(today.getDate() - 7)); // this week
        }
    };

    const startDate = getStartDateForDuration(selectedDuration);

    // Filter orders based on type and duration
    const filteredOrders = orders.filter((order) => {
        const matchesType = selectedOrderType === 'All orders' || order.status === selectedOrderType;
        const orderDate = new Date(order.date);
        const matchesDuration = orderDate >= startDate;
        return matchesType && matchesDuration;
    });

    return (
        <section className="bg-white min-h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-5xl">
                    <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My orders</h2>
                        <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                            <div>
                                <OrderTypeFilterSelect onChange={handleOrderTypeChange} />
                            </div>
                            <span className="inline-block text-gray-500 dark:text-gray-400"> from </span>
                            <div>
                                <DurationDropDownFilter onChange={handleDurationChange} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flow-root sm:mt-8">
                        <OrderList orders={filteredOrders} />
                    </div>
                </div>
            </div>
        </section>
    );
}
