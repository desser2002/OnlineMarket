import { Order } from "@/types/Order";

export async function fetchOrdersForSeller(sellerId: string | null): Promise<Order[]> {
    if (!sellerId) {
        throw new Error("Seller ID is missing.");
    }

    // Извлекаем токен из cookies
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

    if (!token) {
        throw new Error("Authorization token is missing.");
    }

    const response = await fetch(`http://localhost:8080/api/orders/seller/${sellerId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Добавляем Bearer токен
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
    }

    const data = await response.json();

    // Выполняем маппинг непосредственно в этой функции
    return data.map((order: any) => ({
        id: String(order.id), // Преобразуем ID в строку
        date: new Date(order.data).toISOString().split('T')[0], // Преобразуем дату в строку формата YYYY-MM-DD
        price: order.price.toFixed(2), // Преобразуем цену в строку с 2 знаками после запятой
        status: order.status as 'Pre-order' | 'In transit' | 'Confirmed' | 'Cancelled', // Указываем тип
    }));
}
