import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../api/products';

export default function ProductDetailPage() {
  const { id } = useParams();

  const { data: product, isPending, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  if (isPending) return <div style={{ padding: '20px' }}>Загрузка информации о товаре...</div>;
  if (isError) return <div style={{ padding: '20px' }}>Ошибка: {error.message}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link 
        to="/" 
        style={{ 
          display: 'inline-block', 
          marginBottom: '20px', 
          textDecoration: 'none', 
          color: '#3498db',
          fontWeight: 'bold'
        }}
      >
        ← Назад к списку
      </Link>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <div style={{ flex: '1', minWidth: '250px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src={product.image} 
            alt={product.title} 
            style={{ maxHeight: '350px', maxWidth: '100%', objectFit: 'contain' }} 
          />
        </div>
        <div style={{ flex: '2', minWidth: '280px' }}>
          <span style={{ background: '#eee', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', textTransform: 'uppercase' }}>
            {product.category}
          </span>
          <h2 style={{ margin: '15px 0' }}>{product.title}</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60', margin: '10px 0' }}>
            ${product.price}
          </p>
          <p style={{ margin: '10px 0' }}>
            <strong>Рейтинг:</strong> ⭐ {product.rating?.rate} / 5 ({product.rating?.count} отзывов)
          </p>
          <p style={{ lineHeight: '1.5', color: '#555', margin: '15px 0' }}>
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}