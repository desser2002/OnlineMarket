export async function processPayment(userId: number, token: string): Promise<void> {
    const response = await fetch(`http://localhost:8080/api/orders/processPayment?userId=${userId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to process payment");
    }
}
