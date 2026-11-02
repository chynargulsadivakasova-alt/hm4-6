import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/products';

export default function ProductsPage() {
  const { data: products, isPending, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isPending) {
    return <div>Загрузка товаров...</div>;
  }

  if (isError) {
    return <div>Ошибка: {error.message}</div>;
  }

  return (
    <div>
      <h1>Список товаров</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img 
                src={product.image} 
                alt={product.title} 
                width="100" 
              />
              <h3>{product.title}</h3>
              <p>Цена: ${product.price}</p>
            </Link>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}