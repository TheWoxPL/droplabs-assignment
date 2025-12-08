import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import CartIcon from '@/assets/svgs/cart-shopping.svg';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
      </ul>
      <div>
        <img src={CartIcon} alt="Cart" className={styles.cartIcon} />
      </div>
    </nav>
  );
};
