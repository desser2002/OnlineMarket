// OrderType.ts
export type Order = {
    id: string;
    date: string;
    price: string;
    status: 'Pre-order' | 'In transit' | 'Confirmed' | 'Cancelled';
};

export type OrderActionProps = {
    onCancel: () => void;
    onViewDetails: () => void;
};
