import { Navbar, ProductCard } from '@/components/';
import type { Product } from '@/types';
import { useEffect, useState } from 'react';
import { CallApi } from '@/utils';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sampleProduct, setSampleProduct] = useState<Product>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products: Product[] = await CallApi.get<Product[]>('/products');
        setSampleProduct(products[Math.floor(Math.random() * products.length)]);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <h1>Home Page</h1>
        {isLoading && <p>Loading...</p>}
        {!isLoading && sampleProduct && <ProductCard product={sampleProduct} />}
      </div>
    </div>
  );
};
