export async function updateOrderStatus(orderId: string, newStatus: string): Promise<void> {
    // Извлекаем токен из куки
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

    if (!token) {
        throw new Error('Authorization token is missing');
    }

    const response = await fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Добавляем токен в заголовок
        },
        body: JSON.stringify({ newStatus }),
    });

    if (!response.ok) {
        throw new Error(`Failed to update order status: ${response.statusText}`);
    }
}
