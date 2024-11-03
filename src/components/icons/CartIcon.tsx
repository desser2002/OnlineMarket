import React from 'react';

const CartIcon: React.FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 6h10m0 0L17 9m0 0H7l-1.4 5.6M5 21h14a2 2 0 002-2H3a2 2 0 002 2z" />
        </svg>
    );
};

export default CartIcon;
