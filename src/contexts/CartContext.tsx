import type { Product } from '@/types';
import type { CartItem } from '@/types/cartItem';
import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface CartContextType {
  addToCart: (product: Product) => void;
  cartBadge: () => number;
  increaseQuantity: (cartItem: CartItem) => void;
  decreaseQuantity: (cartItem: CartItem) => void;
  removeItem: (cartItem: CartItem) => void;
  cart: CartItem[];
}

const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product): void => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const cartBadge = (): number => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const increaseQuantity = (cartItem: CartItem): void => {
    setCart(
      cart.map((item) =>
        item.id === cartItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (cartItem: CartItem): void => {
    setCart(
      cart
        .map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (cartItem: CartItem): void => {
    setCart(cart.filter((item) => item.id !== cartItem.id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        cartBadge,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
