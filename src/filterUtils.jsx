export const getFilters = (filter, colorFilter, minPrice, maxPrice, categoryFilter) => {
  const filtersArray = [];


  if (filter) {
    filtersArray.push(
      (product) =>
        product.name.toLowerCase().includes(filter.toLowerCase()) ||
        product.description.toLowerCase().includes(filter.toLowerCase()) 
    );
  }


  if (colorFilter.length > 0) {
    filtersArray.push((product) => colorFilter.includes(product.color));
  }


  if (minPrice || maxPrice) {
    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    filtersArray.push((product) => product.price >= min && product.price <= max);
  }


  if (categoryFilter.length > 0) {
    filtersArray.push((product) => categoryFilter.includes(product.category));
  }

  return filtersArray;
};


export const applyFilters = (filters, product) => {
  return filters.every((filterFunc) => filterFunc(product));
};


export const sortProducts = (products, sort) => {
  return products.sort((a, b) => {
    if (sort === 'priceAsc') return a.price - b.price;
    if (sort === 'priceDesc') return b.price - a.price;
    if (sort === 'ratingDesc') return b.rating - a.rating;
    return 0;
  });
};
