import React from 'react';
import { OrderSummaryData } from "@/types/OrderSummaryData";


interface OrderSummaryProps {
    summary: OrderSummaryData;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ summary }) => {
    return (
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">${summary.originalPrice.toFixed(2)}</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">${summary.storePickup.toFixed(2)}</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">${summary.tax.toFixed(2)}</dd>
                        </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-white">${summary.totalPrice.toFixed(2)}</dd>
                    </dl>
                </div>

            </div>

    );
};

export default OrderSummary;
