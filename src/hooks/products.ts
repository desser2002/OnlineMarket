import { Product } from "@/types/Product";

export async function fetchProductsByCategory(token: string, categoryId: string): Promise<Product[]> {
    const response = await fetch(`http://localhost:8080/api/products/category/${categoryId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        try {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch products by category');
        } catch (err) {
            throw new Error('Failed to fetch products by category');
        }
    }

    const data: Product[] = await response.json();

    if (!data || data.length === 0) {
        throw new Error('No products found for this category');
    }

    // Добавляем полный путь к изображению
    return data.map(product => ({
        ...product,
        imageUrl: `http://localhost:8080/api/products/images/${product.imageUrl}`, // Подставляем URL для изображений
    }));
}
