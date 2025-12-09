import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import CartIcon from '@/assets/svgs/cart-shopping.svg';
import { useCart } from '@/hooks/useCart';
import { Cart } from '..';
import { useState } from 'react';

export const Navbar = () => {
  const { cartBadge } = useCart();
  const cartCount = cartBadge();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const onCartClose = () => {
    setIsCartOpen(false);
  };

  const onCartOpen = () => {
    setIsCartOpen(true);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
        <div onClick={onCartOpen}>
          <img src={CartIcon} alt="Cart" className={styles.cartIcon} />
          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </div>
      </nav>
      {isCartOpen && <Cart onClose={onCartClose} />}
    </>
  );
};
