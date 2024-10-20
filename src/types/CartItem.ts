
export interface CartItem {
    id: number;
    product_id: number;
    price: number;
    imageUrl?: string;
    text: string;
    discount?: number;
    count: number;
}

