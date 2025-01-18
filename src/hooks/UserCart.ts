// hooks/cart.ts
import { CartItem } from "@/types/CartItem";

export async function fetchUserCart(userId: number, token: string): Promise<CartItem[]> {
    const response = await fetch(`http://localhost:8080/api/cart/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,   
        },
    });
    console.log(response)

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch cart items.");
    }
console.log(response)
    return await response.json();
}
