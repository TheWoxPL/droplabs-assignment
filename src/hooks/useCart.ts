import { CartContext, CartProvider } from '@/contexts';
import { useContext } from 'react';

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
