import type { Product } from '@/types';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} />
      </div>
      <div className={styles.details}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.category}>{product.category}</p>
        <div className={styles.rating}>
          <span className={styles.rate}>Rate: {product.rating.rate} </span>
          <span className={styles.count}>({product.rating.count} reviews)</span>
        </div>
        <p className={styles.price}>{product.price.toFixed(2)} PLN</p>
      </div>
    </article>
  );
};
