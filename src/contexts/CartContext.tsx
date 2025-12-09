import type { Product } from '@/types';
import type { CartItem } from '@/types/cartItem';
import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface CartContextType {
  test: () => void;
  addToCart: (product: Product) => void;
  cartBadge: () => number;
  cart: CartItem[];
}

const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const test = () => {
    console.log('test');
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const addToCart = (product: Product) => {
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

  return (
    <CartContext.Provider value={{ test, cart, addToCart, cartBadge }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
