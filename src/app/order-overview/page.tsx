'use client';

import React, { useState, useEffect } from 'react';
// Импортируйте навигационную панель
import OrderTypeFilterSelect from "@/app/order-overview/components/OrderTypeDropDownFilter";
import DurationDropDownFilter from "@/app/order-overview/components/DurationDropDownFilter";

import { Order } from "@/types/Order";
import { fetchOrdersForSeller } from "@/hooks/getSellerOrders";
import { updateOrderStatus } from "@/hooks/useUpdateOrderStatus";
import OrderList from "@/components/LIsts/OrderList";
import ConfirmationModal from "@/components/windows/ConfirmationModal";
import NavigationBar from "@/components/Navigationbar";

export default function Page() {
    const [selectedOrderType, setSelectedOrderType] = useState<string>('All orders');
    const [selectedDuration, setSelectedDuration] = useState<string>('this week');
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);

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

    useEffect(() => {
        const sellerId = document.cookie
            .split('; ')
            .find(row => row.startsWith('userid='))
            ?.split('=')[1];

        if (!sellerId) {
            setError("Seller ID is missing.");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        fetchOrdersForSeller(sellerId)
            .then(fetchedOrders => {
                setOrders(fetchedOrders);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    const filteredOrders = orders.filter((order) => {
        const matchesType = selectedOrderType === 'All orders' || order.status === selectedOrderType;
        const orderDate = new Date(order.date);
        const matchesDuration = orderDate >= startDate;
        return matchesType && matchesDuration;
    });

    const openModal = (orderId: string) => {
        setCurrentOrderId(orderId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentOrderId(null);
    };

    const closeOrder = async () => {
        if (!currentOrderId) return;

        try {
            await updateOrderStatus(currentOrderId, 'Cancelled');
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === currentOrderId ? { ...order, status: 'Cancelled' } : order
                )
            );
            closeModal();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred.');
            }
            closeModal();
        }
    };

    if (isLoading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <>
            <NavigationBar /> {/* Добавлена навигационная панель */}
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
                            <OrderList
                                orders={filteredOrders}
                                onCloseOrderClick={(orderId: string) => openModal(orderId)}
                            />
                        </div>
                    </div>
                </div>
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onConfirm={closeOrder}
                    onCancel={closeModal}
                />
            </section>
        </>
    );
}
