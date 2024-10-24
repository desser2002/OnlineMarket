import React from 'react';
import { OrderSummaryData } from "@/types/OrderSummaryData";
import TextButton from "@/components/Buttons/textButton";
import ArrowIcon from "@/components/icons/ArrowIcon";

interface OrderSummaryProps {
    summary: OrderSummaryData;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ summary }) => {
    return (
        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
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

                <a href="#"
                   className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Proceed to Checkout
                </a>

                <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">or</span>
                    <TextButton
                        text="Continue Shopping"
                        textColor="text-primary-700"
                        url="/products"
                        rightIcon={<ArrowIcon/>}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
