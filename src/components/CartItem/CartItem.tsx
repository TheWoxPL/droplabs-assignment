import type { CartItem as CartItemType } from '@/types';
import styles from './CartItem.module.scss';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className={styles.cartItem}>
      <div>{item.title}</div>
      <div>
        <button>+</button>
        <button>-</button>
        <span>&ensp;{item.quantity} qty</span>
      </div>
      <span>{(item.quantity * item.price).toFixed(2)} PLN</span>
      <button className={styles.remove}>Remove</button>
    </div>
  );
};
