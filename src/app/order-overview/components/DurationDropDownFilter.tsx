import React from 'react';

interface DurationDropDownFilterProps {
    onChange: (duration: string) => void;
}

const DurationDropDownFilter: React.FC<DurationDropDownFilterProps> = ({ onChange }) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    return (
        <div>
            <label htmlFor="duration" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Select duration
            </label>
            <select
                id="duration"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                onChange={handleSelectChange}
            >
                <option value="this week">this week</option>
                <option value="this month">this month</option>
                <option value="last 3 months">the last 3 months</option>
                <option value="last 6 months">the last 6 months</option>
                <option value="this year">this year</option>
            </select>
        </div>
    );
};

export default DurationDropDownFilter;
