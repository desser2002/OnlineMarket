import { Order } from "@/types/Order";
import React from "react";

interface OrderListProps {
    orders: Order[];
    onCloseOrderClick: (orderId: string) => void; // Function to handle order cancellation
}

// Helper function to determine status style based on order status
function getStatusStyle(status: Order['status']): string {
    switch (status) {
        case 'Pre-order':
            return 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300';
        case 'In transit':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case 'Confirmed':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'Cancelled':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        default:
            return '';
    }
}

const OrderList: React.FC<OrderListProps> = ({ orders, onCloseOrderClick }) => {
    return (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((order) => (
                <div key={order.id} className="flex flex-wrap items-center gap-y-4 py-6">
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            <a href="#" className="hover:underline">#{order.id}</a>
                        </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{order.date}</dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">${order.price}</dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                        <dd className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${getStatusStyle(order.status)}`}>
                            <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"/>
                            </svg>
                            {order.status}
                        </dd>
                    </dl>

                    <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                        <button
                            type="button"
                            className={`w-full rounded-lg border px-3 py-2 text-center text-sm font-medium focus:outline-none focus:ring-4 lg:w-auto ${
                                order.status === 'Cancelled'
                                    ? 'border-gray-400 text-gray-400 cursor-not-allowed dark:border-gray-600 dark:text-gray-600'
                                    : 'border-red-700 text-red-700 hover:bg-red-700 hover:text-white focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900'
                            }`}
                            onClick={() => onCloseOrderClick(order.id)}
                            disabled={order.status === 'Cancelled'}
                        >
                            {order.status === 'Cancelled' ? 'Order Closed' : 'Cancel order'}
                        </button>
                        <a href="#"
                           className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">
                            View details
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderList;
