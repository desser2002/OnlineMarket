// hooks/cart.ts
import { CartItem } from "@/types/CartItem";

interface AddToCartRequest {
    userId: number;
    productId: number;
    amount: number;
}

export async function addToCart(request: AddToCartRequest, token: string): Promise<CartItem> {
    const response = await fetch(`http://localhost:8080/api/cart/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add item to cart.");
    }

    return await response.json();
}
