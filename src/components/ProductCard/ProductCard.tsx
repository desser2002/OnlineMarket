'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from "@/types/Product";
import { addToCart } from "@/hooks/addtoCart";
import { fetchProductReviews } from "@/hooks/fetchProductDetails";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const router = useRouter();
    const [averageRating, setAverageRating] = useState<number>(0);
    const [reviewCount, setReviewCount] = useState<number>(0);

    useEffect(() => {
        async function fetchAndCalculateRating() {
            try {
                const reviews = await fetchProductReviews(product.id.toString());
                if (reviews.length > 0) {
                    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
                    setAverageRating(totalRating / reviews.length);
                    setReviewCount(reviews.length);
                } else {
                    setAverageRating(0);
                    setReviewCount(0);
                }
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
                setAverageRating(0);
                setReviewCount(0);
            }
        }

        fetchAndCalculateRating();
    }, [product.id]);

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

        try {
            await addToCart(
                {
                    userId: Number(userId),
                    productId: product.id,
                    amount: 1,
                },
                token
            );
            window.toast("success", "Successfuly added to cart")
        } catch (error: any) {
            window.toast("success", "Successfuly added to cart")

        }
    };

    const navigateToProduct = () => {
        router.push(`/product-detail/${product.id}`);
    };

    return (
        <div
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            onClick={navigateToProduct}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && navigateToProduct()}
        >
            <div className="h-56 w-full">
                <img
                    className="mx-auto h-full w-full dark:hidden cursor-pointer"
                    src={product.imageUrl}
                    alt={product.name}
                />
                <img
                    className="mx-auto hidden h-full w-full dark:block cursor-pointer"
                    src={product.imageUrl}
                    alt={product.name}
                />
            </div>
            <div className="pt-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                    {product.discount && (
                        <span className="mr-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                            {product.discount}
                        </span>
                    )}
                </div>
                <a
                    onClick={(e) => {
                        e.stopPropagation();
                        navigateToProduct();
                    }}
                    className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white cursor-pointer"
                >
                    {product.name}
                </a>
                <div className="mt-2 flex items-center gap-2">
                    {reviewCount > 0 ? (
                        <>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        className={`h-4 w-4 ${
                                            index < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{averageRating.toFixed(1)}</p>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">({reviewCount})</p>
                        </>
                    ) : (
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">0 reviews</p>
                    )}
                </div>
                <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">${product.price}</p>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart();
                        }}
                        className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
