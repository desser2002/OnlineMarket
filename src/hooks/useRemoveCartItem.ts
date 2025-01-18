export async function removeCartItem(
    userId: number,
    productId: number,
    token: string
): Promise<void> {
    const response = await fetch(`http://localhost:8080/api/cart/remove?userId=${userId}&productId=${productId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to remove cart item");
    }
}
