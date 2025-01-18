'use client';
import React, { useState, useEffect } from "react";

type ToastType = "success" | "error" | "warning";

interface Toast {
    id: number;
    type: ToastType;
    message: string;
}

interface ToastProps {
    id: number;
    type: ToastType;
    message: string;
    onClose: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, message, onClose }) => {
    const iconConfig = {
        success: {
            color: "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200",
            svg: (
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            ),
        },
        error: {
            color: "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200",
            svg: (
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            ),
        },
        warning: {
            color: "text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200",
            svg: (
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
            ),
        },
    };

    const { color, svg } = iconConfig[type];

    useEffect(() => {
        const timer = setTimeout(() => onClose(id), 5000); // Auto-close after 5 seconds
        return () => clearTimeout(timer); // Cleanup timer
    }, [id, onClose]);

    return (
        <div
            className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`}
            role="alert"
        >
            <div className={`inline-flex items-center justify-center w-8 h-8 ${color} rounded-lg`}>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    {svg}
                </svg>
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <button
                type="button"
                className="ml-auto bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                onClick={() => onClose(id)}
                aria-label="Close"
            >
                <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1l6 6m0 0l6 6M7 7L1 13m6-6L13 1"
                    />
                </svg>
            </button>
        </div>
    );
};

const ToastContainer: React.FC = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (type: ToastType, message: string) => {
        const id = Date.now(); // Unique ID for each toast
        setToasts((prev) => [...prev, { id, type, message }]);
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    useEffect(() => {
        (window as any).toast = addToast; // Expose the toast function globally
    }, []);

    return (
        <div
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
        >

            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} onClose={removeToast}/>
            ))}
        </div>
    );
};

export default ToastContainer;
