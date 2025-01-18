export class Review {
    id: number; // Unique identifier for the review
    productId: number; // ID of the product being reviewed
    userId: number; // ID of the user who left the review
    rating: number; // Rating (1–5)
    comment: string | null; // Optional comment text

    constructor(id: number, productId: number, userId: number, rating: number, comment: string | null) {
        this.id = id;
        this.productId = productId;
        this.userId = userId;
        this.rating = rating;
        this.comment = comment || null;
    }

    static fromJSON(json: any): Review {
        return new Review(
            json.id,
            json.product?.id || null, // Extract productId from product
            json.user?.id || null, // Extract userId from user
            json.rating,
            json.comment || null
        );
    }
}
