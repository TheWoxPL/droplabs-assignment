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

  const handleSortChange = (sortOption: string) => {
    switch (sortOption) {
      case 'ASC_TITLE':
        setProducts(
          [...products].sort((a, b) => a.title.localeCompare(b.title))
        );
        break;
      case 'DESC_TITLE':
        setProducts(
          [...products].sort((a, b) => b.title.localeCompare(a.title))
        );
        break;
      case 'ASC_PRICE':
        setProducts([...products].sort((a, b) => a.price - b.price));
        break;
      case 'DESC_PRICE':
        setProducts([...products].sort((a, b) => b.price - a.price));
        break;
      case 'DEFAULT':
        setProducts([...products].sort(() => Math.random() - 0.5));
        break;
      default:
        break;
    }
  };

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
        <div>
          <label htmlFor="sort-select">
            Sort by: &nbsp;
            <select
              id="sort-select"
              onChange={(e) => {
                handleSortChange(e.target.value);
              }}
              defaultValue={'DEFAULT'}
            >
              <option value="DEFAULT">Default</option>
              <option value="ASC_TITLE">Title (A-Z)</option>
              <option value="DESC_TITLE">Title (Z-A)</option>
              <option value="ASC_PRICE">Price (Low to High)</option>
              <option value="DESC_PRICE">Price (High to Low)</option>
            </select>
          </label>
        </div>
        <div className={styles.productsContainer}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
};
