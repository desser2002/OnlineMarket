import React from 'react';

interface CounterProps {
    count: number;
    onIncrement: () => void;
    onDecrement: () => void;
    min?: number; // минимальное значение
    max?: number; // максимальное значение
}

const Counter: React.FC<CounterProps> = ({ count, onIncrement, onDecrement, min = 1, max = 100 }) => {
    return (
        <div className="flex items-center">
            <button
                type="button"
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                onClick={onDecrement}
                disabled={count <= min} // Отключаем кнопку, если достигнут минимальный лимит
            >
                <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                </svg>
            </button>

            <input
                type="text"
                value={count}
                readOnly
                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
            />

            <button
                type="button"
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                onClick={onIncrement}
                disabled={count >= max} // Отключаем кнопку, если достигнут максимальный лимит
            >
                <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                </svg>
            </button>
        </div>
    );
};

export default Counter;
