import { Navbar, ProductCard } from '@/components/';
import type { Product } from '@/types';
import { useEffect, useState } from 'react';
import { CallApi, getErrorMessage } from '@/utils';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sampleProduct, setSampleProduct] = useState<Product>();
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products: Product[] = await CallApi.get<Product[]>('/products');
        setSampleProduct(products[Math.floor(Math.random() * products.length)]);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        console.error('Error fetching products:', errorMessage);
        setFetchError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (fetchError) {
    return (
      <>
        <Navbar />
        <p>Error: {fetchError}</p>
      </>
    );
  }

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
