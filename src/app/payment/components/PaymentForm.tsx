import React, { useState } from 'react';

type PaymentFormProps = {
    onSubmit: (formData: { fullName: string; cardNumber: string; expiration: string; cvv: string }) => void;
};

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        cardNumber: '',
        expiration: '',
        cvv: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы
        onSubmit(formData); // Передаём данные формы через onSubmit
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
        >
            <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                    <label
                        htmlFor="fullName"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Full name (as displayed on card)*
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="Bonnie Green"
                        required
                    />
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label
                        htmlFor="cardNumber"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Card number*
                    </label>
                    <input
                        type="text"
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="expiration"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Card expiration*
                    </label>
                    <input
                        type="text"
                        id="expiration"
                        value={formData.expiration}
                        onChange={handleChange}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="MM/YY"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="cvv"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        CVV*
                    </label>
                    <input
                        type="text"
                        id="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="•••"
                        required
                    />
                </div>
            </div>

            <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                Pay now
            </button>
        </form>
    );
};

export default PaymentForm;
