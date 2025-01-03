import React from "react";
import { PaymentSuccessProps } from "@/types/PaymentSuccessProps";

const PaymentSuccessCard: React.FC<PaymentSuccessProps & { onClose: () => void }> = ({
                                                                                         refNumber,
                                                                                         paymentTime,
                                                                                         paymentMethod,
                                                                                         senderName,
                                                                                         amount,
                                                                                         adminFee,
                                                                                         onClose,
                                                                                     }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                    &times;
                </button>
                <div className="flex justify-center mb-4">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="green"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>
                <h3 className="text-center text-lg font-semibold text-gray-900 dark:text-white">
                    Payment Success!
                </h3>
                <p className="text-center text-2xl font-bold text-gray-800 dark:text-gray-100 mt-2">
                    {amount}
                </p>

                <div className="mt-4 border-t pt-4 space-y-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Ref Number:</strong> {refNumber}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Payment Time:</strong> {paymentTime}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Payment Method:</strong> {paymentMethod}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Sender Name:</strong> {senderName}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Admin Fee:</strong> {adminFee}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessCard;
