export interface CartItem {
    id: number;
    amount: number;
    product: {
        id: number;
        name: string;
        price: number;
        imageUrl: string;
        discount?: string;
        rating: number;
        reviewCount: number;
    };
}
