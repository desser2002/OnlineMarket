import React, { useState } from 'react';
import Button from "@/components/Buttons/Button";

interface FilterModalProps {
    isVisible: boolean;
    onClose: () => void;
    brands: string[];
}

const FilterModal: React.FC<FilterModalProps> = ({ isVisible, onClose, brands }) => {
    // Состояние для выбранных брендов
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    // Функция для переключения состояния чекбокса
    const handleCheckboxChange = (brand: string) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter((b) => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    // Функция для сброса фильтров (чекбоксов)
    const resetFilters = () => {
        setSelectedBrands([]);
    };

    const [activeTab, setActiveTab] = useState<string>('brand'); // Состояние для текущей активной вкладки

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center ${isVisible ? 'block' : 'hidden'}`}
            aria-hidden={!isVisible}
        >
            {/* Затемненный фон */}
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>

            {/* Модальное окно */}
            <form
                action="#"
                method="get"
                className="relative z-10 w-full max-w-xl p-4 md:h-auto rounded-lg bg-white shadow dark:bg-gray-800"
            >
                {/* Заголовок модального окна */}
                <div className="flex items-start justify-between rounded-t p-4 md:p-5">
                    <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">Filters</h3>
                    <button
                        type="button"
                        className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onClose}
                    >
                        <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18 17.94 6M18 18 6.06 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                {/* Тело модального окна */}
                <div className="px-4 md:px-5">
                    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                        <ul className="-mb-px flex flex-wrap text-center text-sm font-medium" id="myTab" role="tablist">
                            <li className="mr-1" role="presentation">
                                <button
                                    className={`inline-block pb-2 pr-1 ${
                                        activeTab === 'brand'
                                            ? 'text-black dark:text-white'
                                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                    }`}
                                    id="brand-tab"
                                    type="button"
                                    role="tab"
                                    aria-selected={activeTab === 'brand'}
                                    onClick={() => setActiveTab('brand')}
                                >
                                    Brand
                                </button>
                            </li>
                            <li className="mr-1" role="presentation">
                                <button
                                    className={`inline-block px-2 pb-2 ${
                                        activeTab === 'advanced'
                                            ? 'text-black dark:text-white'
                                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                    }`}
                                    id="advanced-filters-tab"
                                    type="button"
                                    role="tab"
                                    aria-selected={activeTab === 'advanced'}
                                    onClick={() => setActiveTab('advanced')}
                                >
                                    Advanced Filters
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        {/* Отображаем список брендов, если активна вкладка 'brand' */}
                        {activeTab === 'brand' && (
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3" id="brand" role="tabpanel">
                                {brands.map((brand, index) => (
                                    <div className="flex items-center space-y-2" key={index}>
                                        <input
                                            id={`brand-${brand}`}
                                            type="checkbox"
                                            value={brand}
                                            checked={selectedBrands.includes(brand)} // Отмечаем, если бренд выбран
                                            onChange={() => handleCheckboxChange(brand)} // Изменение состояния при клике
                                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                        />
                                        <label
                                            htmlFor={`brand-${brand}`}
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            {brand}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* Здесь можно добавить контент для вкладки "Advanced Filters" */}
                        {activeTab === 'advanced' && <div>Advanced Filters Content</div>}
                    </div>
                </div>

                {/* Кнопка Reset с функциональностью сброса */}
                <Button
                    text="Reset"
                    className="mt-4 ml-4"
                    backgroundColor="bg-primary-700"
                    textColor="text-gray-50"
                    onClick={resetFilters} // Сбрасываем фильтры при клике
                />
            </form>
        </div>
    );
};

export default FilterModal;
