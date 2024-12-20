

import React from 'react';

const ProductGrid = ({ filteredProducts }) => {
  return (
    <div className="product-content">
      <p>Всего продуктов: {filteredProducts.length}</p>

      {filteredProducts.length === 0 ? (
        <p>По вашему запросу ничего не найдено</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.imageUrl} alt={product.name} />
              <div className="product-info">
                <h2>{product.name}</h2>
                <p>{product.description}</p> 
                <p>Цена: ${product.price}</p>
                <p>Рейтинг: {product.rating}</p>
                <p>Цвет: {product.color}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
