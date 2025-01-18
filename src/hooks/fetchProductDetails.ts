import { Product } from "@/types/Product";
import { Review } from "@/types/Review";

function getTokenFromCookies(): string | null {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1] || null;
}

export async function fetchProductDetails(productId: string): Promise<Product> {
    const token = getTokenFromCookies();
    const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch product details.');
    }
    return response.json();
}


export async function fetchProductReviews(productId: string): Promise<Review[]> {
    const token = getTokenFromCookies();
    const response = await fetch(`http://localhost:8080/api/reviews/${productId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch reviews.');
    }
    const reviews = await response.json();
    return reviews.map((review: any) => Review.fromJSON(review));
}

export async function postReview(
    productId: string,
    userId: string,
    rating: number,
    comment: string
): Promise<void> {
    const token = getTokenFromCookies();
    const response = await fetch('http://localhost:8080/api/reviews/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, userId, rating, comment }),
    });
    if (!response.ok) {
        alert("you already post revierw for this product");
    }
}
