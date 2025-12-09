import { CartItem } from '../CartItem/CartItem';
import styles from './Cart.module.scss';
import { useCart } from '@/hooks/useCart';

interface CartProps {
  onClose: () => void;
}

export const Cart = ({ onClose }: CartProps) => {
  const { cart } = useCart();

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <aside className={styles.cart}>
        <button onClick={onClose} className={styles.closeButton}>
          ✕
        </button>
        <h3>Your Cart</h3>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </aside>
    </>
  );
};
