import React from 'react';

interface BreadcrumbProps {
    paths: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
    return (
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <div>
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        {paths.map((path, index) => {
                            const isLast = index === paths.length - 1;
                            return (
                                <li key={index} className="inline-flex items-center">
                                    {!isLast ? (
                                        <a
                                            href={path}
                                            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
                                        >
                                            {index === 0 && (
                                                <svg
                                                    className="mr-2.5 h-3 w-3"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
                                                    />
                                                </svg>
                                            )}
                                            {path}
                                        </a>
                                    ) : (
                                        <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">
                                            {path}
                                        </span>
                                    )}
                                    {!isLast && (
                                        <svg
                                            className="h-5 w-5 text-gray-400 rtl:rotate-180"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m9 5 7 7-7 7"
                                            />
                                        </svg>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
                <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    {paths[paths.length - 1]}
                </h2>
            </div>
        </div>
    );
};

export default Breadcrumb;
