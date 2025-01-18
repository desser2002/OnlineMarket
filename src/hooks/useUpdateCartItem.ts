export async function updateCartItem(
    userId: number,
    productId: number,
    amount: number,
    token: string
): Promise<void> {
    const response = await fetch(`http://localhost:8080/api/cart/update?userId=${userId}&productId=${productId}&amount=${amount}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to update cart item");
    }
}
