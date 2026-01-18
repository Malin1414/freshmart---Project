// src/components/SearchResults.jsx
import React, { useState } from 'react';

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState('organic apples');
  const [selectedCategory, setSelectedCategory] = useState('fruits');
  const [priceRange, setPriceRange] = useState('all');
  
  const products = [
    {
      id: 1,
      name: 'Organic Gala Apples',
      description: 'Fresh, crisp organic Gala apples, perfect for snacking or baking.',
      price: '$4.99 / lb',
      image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'fruits'
    },
    {
      id: 2,
      name: 'Organic Fuji Apples',
      description: 'Sweet and juicy organic Fuji apples, ideal for fresh eating.',
      price: '$5.49 / lb',
      image: 'https://images.unsplash.com/photo-1570913199992-91d07c140e7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'fruits'
    },
    {
      id: 3,
      name: 'Organic Apple Pack',
      description: 'Assorted organic apples including Gala, Fuji, and Honeycrisp.',
      price: '$12.99 / pack',
      image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'fruits'
    },
    {
      id: 4,
      name: 'Organic Carrots',
      description: 'Fresh organic carrots, great for cooking or as a healthy snack.',
      price: '$2.99 / lb',
      image: 'https://images.unsplash.com/photo-1598170845058-78131a90f4bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'vegetables'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleAddToCart = (productId) => {
    console.log('Added product to cart:', productId);
    alert(`Added ${products.find(p => p.id === productId)?.name} to cart!`);
  };

  return (
    <div className="search-results">
      <div className="container">
        <h1 className="page-title">
          <i className="fas fa-search"></i> Search Results
        </h1>
        
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search for groceries, fruits, vegetables, dairy..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <i className="fas fa-search"></i> Search
          </button>
        </form>
        
        <div className="search-info">
          <p>Showing results for "<strong>{searchQuery}</strong>" (24 products found)</p>
        </div>
        
        <div className="filters card">
          <h3>Filter Results</h3>
          <div className="filter-options" style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            <div className="filter-category">
              <h4>Category</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={selectedCategory === 'fruits'}
                    onChange={() => setSelectedCategory('fruits')}
                  /> Fruits
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={selectedCategory === 'vegetables'}
                    onChange={() => setSelectedCategory('vegetables')}
                  /> Vegetables
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={selectedCategory === 'dairy'}
                    onChange={() => setSelectedCategory('dairy')}
                  /> Dairy
                </label>
              </div>
            </div>
            
            <div className="filter-price">
              <h4>Price Range</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label>
                  <input 
                    type="radio" 
                    name="price" 
                    checked={priceRange === 'under5'}
                    onChange={() => setPriceRange('under5')}
                  /> Under $5
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="price" 
                    checked={priceRange === '5-10'}
                    onChange={() => setPriceRange('5-10')}
                  /> $5 - $10
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="price" 
                    checked={priceRange === 'all'}
                    onChange={() => setPriceRange('all')}
                  /> All Prices
                </label>
              </div>
            </div>
            
            <button 
              className="btn btn-primary" 
              style={{ alignSelf: 'flex-end' }}
              onClick={() => console.log('Filters applied')}
            >
              Apply Filters
            </button>
          </div>
        </div>
        
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-price">{product.price}</div>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '10px' }}
                onClick={() => handleAddToCart(product.id)}
              >
                <i className="fas fa-cart-plus"></i> Add to Cart
              </button>
            </div>
          ))}
        </div>
        
        <div className="pagination">
          <button className="btn btn-outline">
            <i className="fas fa-chevron-left"></i> Previous
          </button>
          <span>Page 1 of 3</span>
          <button className="btn btn-outline">
            Next <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
