import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { products as productData } from './data';
import { getFilters, applyFilters, sortProducts } from './filterUtils';
import ProductGrid from './ProductGrid'; 
//КАРТИНКИ МОГУТ ПОЯВИТЬСя НЕ СРАЗУ
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const ProductList = () => {
  const [filter, setFilter] = useState('');
  const [colorFilter, setColorFilter] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('priceAsc');
  const [categoryFilter, setCategoryFilter] = useState([]); 


  const debouncedSetFilter = debounce((value) => setFilter(value), 500);
  const debouncedSetColorFilter = debounce((value) => setColorFilter(value), 500);
  const debouncedSetMinPrice = debounce((value) => setMinPrice(value), 500);
  const debouncedSetMaxPrice = debounce((value) => setMaxPrice(value), 500);

  const filters = getFilters(filter, colorFilter, minPrice, maxPrice, categoryFilter);


  const filteredProducts = sortProducts(
    productData.filter((product) => applyFilters(filters, product)),
    sort
  );

  
  const [availableColors, setAvailableColors] = useState([]);
  const [availableMinPrice, setAvailableMinPrice] = useState('');
  const [availableMaxPrice, setAvailableMaxPrice] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]); 

  useEffect(() => {
    
    const colors = Array.from(new Set(filteredProducts.map((product) => product.color)));
    setAvailableColors(colors);

    const prices = filteredProducts.map((product) => product.price);
    setAvailableMinPrice(Math.min(...prices));
    setAvailableMaxPrice(Math.max(...prices));

    
    const categories = Array.from(new Set(filteredProducts.map((product) => product.category)));
    setAvailableCategories(categories);
  }, [filteredProducts]);

  const handleColorChange = (color) => {
    const updatedColors = colorFilter.includes(color)
      ? colorFilter.filter((c) => c !== color)
      : [...colorFilter, color];
    debouncedSetColorFilter(updatedColors);
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = categoryFilter.includes(category)
      ? categoryFilter.filter((c) => c !== category)
      : [...categoryFilter, category];
    setCategoryFilter(updatedCategories); 
  };

  return (
    <div className="product-list-container">
      <div className="sidebar">
        <input
          type="text"
          placeholder="Поиск по имени или описанию"
          onChange={(e) => debouncedSetFilter(e.target.value)} 
        />

        <div className="filter-colors">
          <h4>Фильтр по цвету</h4>
          <div className="color-options">
            {availableColors.map((color) => (
              <div
                key={color}
                className={`color-box ${colorFilter.includes(color) ? 'selected' : ''}`}
                style={{
                  backgroundColor: color,
                  border: colorFilter.includes(color) ? '2px solid black' : '2px solid transparent',
                  width: '30px',
                  height: '30px',
                  display: 'inline-block',
                  margin: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>
        </div>

        <div className="filter-price">
          <h4>Фильтр по цене</h4>
          <input
            type="number"
            placeholder={`Мин`}
            onChange={(e) =>
              debouncedSetMinPrice(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))
            }
          />
          <input
            type="number"
            placeholder={`Макс`}
            onChange={(e) =>
              debouncedSetMaxPrice(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))
            }
          />
        </div>
        <div className="sort-buttons">
          <button
            className={sort === 'priceAsc' ? 'active' : ''}
            onClick={() => setSort('priceAsc')}
          >
            Сначала дешевые
          </button>
          <button
            className={sort === 'priceDesc' ? 'active' : ''}
            onClick={() => setSort('priceDesc')}
          >
            Сначала дорогие
          </button>
          <button
            className={sort === 'ratingDesc' ? 'active' : ''}
            onClick={() => setSort('ratingDesc')}
          >
            Сначала популярные
          </button>
        </div>

        <div className="filter-categories">
          <h4>Фильтр по категории</h4>
          <div className="category-options">
            {availableCategories.map((category) => (
              <div
                key={category}
                className={`category-box ${categoryFilter.includes(category) ? 'selected' : ''}`}
                onClick={() => handleCategoryChange(category)}
                style={{ cursor: 'pointer', padding: '5px', border: categoryFilter.includes(category) ? '2px solid black' : '2px solid transparent' }}
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        
      </div>

     
      <ProductGrid filteredProducts={filteredProducts} />
    </div>
  );
};

export default ProductList;
