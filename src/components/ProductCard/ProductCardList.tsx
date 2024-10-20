
import React from 'react';

import ProductCard from './ProductCard';
import {Product} from "@/types/Product";

interface ProductCardListProps {
    products: Product[];
}

const ProductCardList: React.FC<ProductCardListProps> = ({ products }) => {
    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductCardList;
