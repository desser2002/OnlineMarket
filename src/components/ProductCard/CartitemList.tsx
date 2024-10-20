import React from 'react';
import CartProductCard from "@/components/ProductCard/CartProductCard";
import { CartItem } from "@/types/CartItem";

interface CartItemListProps {
    cartItems: CartItem[];
    onRemoveItem: (id: number) => void; // Функция для удаления товара из корзины
}

const CartItemList: React.FC<CartItemListProps> = ({ cartItems, onRemoveItem }) => {
    return (
        <div className="space-y-6">
            {cartItems.map((cartItem) => (
                <CartProductCard
                    key={cartItem.id}
                    cartItem={cartItem}
                    onRemove={() => onRemoveItem(cartItem.id)} // Передаем функцию удаления
                />
            ))}
        </div>
    );
};

export default CartItemList;
