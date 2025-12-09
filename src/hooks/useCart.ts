import { CartContext, CartProvider } from '@/contexts';
import { use } from 'react';

const useCart = () => {
  const context = use(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
