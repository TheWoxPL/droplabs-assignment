import type { CartItem as CartItemType } from '@/types';
import styles from './CartItem.module.scss';
import { useCart } from '@/hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();

  return (
    <div className={styles.cartItem}>
      <div>{item.title}</div>
      <div>
        <button onClick={() => increaseQuantity(item)}>+</button>
        <button onClick={() => decreaseQuantity(item)}>-</button>
        <span>&ensp;{item.quantity} qty</span>
      </div>
      <span>{(item.quantity * item.price).toFixed(2)} PLN</span>
      <button className={styles.remove} onClick={() => removeItem(item)}>
        Remove
      </button>
    </div>
  );
};
