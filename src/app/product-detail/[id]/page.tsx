'use client';

import React, { useEffect, useState } from 'react';
import { fetchProductDetails, fetchProductReviews, postReview } from '@/hooks/fetchProductDetails';
import { Product } from '@/types/Product';
import { Review } from '@/types/Review';
import { useParams } from 'next/navigation';
import {addToCart} from "@/hooks/addtoCart";

export default function ProductDetailsPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [averageRating, setAverageRating] = useState<number>(0);
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const params = useParams();
    const id = params?.id;

    useEffect(() => {
        if (!id) return;

        fetchProductDetails(id as string)
            .then(setProduct)
            .catch(() => setError('Failed to load product details.'));

        fetchProductReviews(id as string)
            .then((fetchedReviews) => {
                setReviews(fetchedReviews);
                calculateAverageRating(fetchedReviews);
            })
            .catch(() => setError('Failed to load reviews.'));
    }, [id]);

    const calculateAverageRating = (reviews: Review[]) => {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        setAverageRating(totalRating / reviews.length || 0);
    };

    const handleSubmitReview = async () => {
        try {
            if (!rating || !comment) {
                setError('Please provide a rating and a comment.');
                return;
            }

            const userId = document.cookie
                .split('; ')
                .find((row) => row.startsWith('userid='))
                ?.split('=')[1];

            if (!userId) {
                setError('You need to be logged in to leave a review.');
                return;
            }

            await postReview(id as string, userId, rating, comment);
            const updatedReviews = await fetchProductReviews(id as string);
            setReviews(updatedReviews);
            calculateAverageRating(updatedReviews);
            setRating(0);
            setComment('');
            setSuccessMessage('Review submitted successfully!');
            setError(null);
        } catch (err) {
            setError('Failed to submit review.');
        }
    };

    // Example "Add to Cart" function
    const handleAddToCart = async () => {
        const token = document.cookie
            .split("; ")
            .find(row => row.startsWith("token="))
            ?.split("=")[1];

        const userId = document.cookie
            .split("; ")
            .find(row => row.startsWith("userid="))
            ?.split("=")[1];

        if (!token || !userId) {
            alert("User is not authenticated.");
            return;
        }
        if(product) {
            try {
                await addToCart(
                    {
                        userId: Number(userId),
                        productId: product.id,
                        amount: 1,
                    },
                    token
                );

                alert(`${product.name} has been added to your cart.`);
            } catch (error: any) {
                alert(error.message);
            }
        }
    };

    const renderStars = (rating: number, onClick?: (index: number) => void) => {
        return [...Array(5)].map((_, index) => (
            <svg
                key={index}
                onClick={onClick ? () => onClick(index + 1) : undefined}
                className={`w-6 h-6 cursor-pointer ${
                    index < rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
        ));
    };

    if (error) return <p className="text-red-500">{error}</p>;
    if (!product) return <p>Loading...</p>;

    const imageUrl = `http://localhost:8080/api/products/images/${product.imageUrl}`;

    return (
        <section className="min-h-screen py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                    <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                        <img
                            className="w-full dark:hidden"
                            src={imageUrl}
                            alt={product.name}
                        />
                        <img
                            className="w-full hidden dark:block"
                            src={imageUrl}
                            alt={product.name}
                        />
                    </div>

                    <div className="mt-6 sm:mt-8 lg:mt-0">
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                            {product.name}
                        </h1>
                        <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                            <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                                ${product.price}
                            </p>
                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <div className="flex items-center gap-1">
                                    {renderStars(Math.round(averageRating))}
                                </div>
                                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                                    ({averageRating.toFixed(1)})
                                </p>
                                <a
                                    href="#reviews"
                                    className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                                >
                                    {reviews.length} Reviews
                                </a>
                            </div>
                        </div>

                        <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                        <p className="mb-6 text-gray-500 dark:text-gray-400">
                            {product.description}
                        </p>

                        {/* Add to Cart Button */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart();
                            }}
                            className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="max-w-screen-xl px-4 mx-auto mt-8">
                <h2
                    id="reviews"
                    className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white"
                >
                    Leave a Review
                </h2>
                <div className="mt-4">
                    <div className="flex items-center gap-2">
                        {renderStars(rating, setRating)}
                    </div>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full mt-4 border border-gray-700 rounded-lg p-2 text-gray-900 dark:text-white dark:bg-gray-800"
                        placeholder="Write your review here..."
                    />
                    <button
                        onClick={handleSubmitReview}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Submit Review
                    </button>
                    {successMessage && (
                        <p className="mt-2 text-green-500">{successMessage}</p>
                    )}
                </div>

                <h2 className="text-lg font-semibold mt-8 text-gray-900 sm:text-xl dark:text-white">
                    Reviews
                </h2>
                {reviews.length === 0 ? (
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        No reviews yet. Be the first to review this product!
                    </p>
                ) : (
                    reviews.map((review) => (
                        <article key={review.id} className="mt-6">
                            <div className="flex items-center mb-4">
                                 <div className="font-medium text-gray-700 dark:text-gray-300">
                                    <p>User {review.userId}</p>
                                </div>
                            </div>
                            <div className="flex items-center mb-1 space-x-1">
                                {renderStars(review.rating)}
                            </div>
                            <p className="mb-3 text-gray-700 dark:text-gray-300">
                                {review.comment}
                            </p>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
}
