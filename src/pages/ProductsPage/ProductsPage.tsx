import { Navbar } from '@/components';
import { ProductCard } from '@/components/';
import type { Product } from '@/types';
import { CallApi } from '@/utils';
import { useEffect, useState } from 'react';
import styles from './ProductsPage.module.scss';

export const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products: Product[] = await CallApi.get<Product[]>('/products');
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <h1>Our Products</h1>
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
};
