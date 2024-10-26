import React from 'react';

interface OrderTypeFilterSelectProps {
    onChange: (type: string) => void;
}

const OrderTypeFilterSelect: React.FC<OrderTypeFilterSelectProps> = ({ onChange }) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    return (
        <div>
            <label htmlFor="order-type" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Select order type
            </label>
            <select
                id="order-type"
                className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                onChange={handleSelectChange}
            >
                <option>All orders</option>
                <option value="Pre-order">Pre-order</option>
                <option value="In transit">In transit</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
            </select>
        </div>
    );
};

export default OrderTypeFilterSelect;
