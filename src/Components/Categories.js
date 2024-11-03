// src/components/Categories.js
import React, { useState, useEffect } from 'react';
import './Categories.css';

// Importing images
import casualShoe from './casual_shoe.jpeg';
import boot from './boot.jpeg';
import sneakers from './sneakers.jpeg';
import running from './running.jpeg';
import axios from 'axios';

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      name: "Footwear",
      image: casualShoe,
    },
    {
      name: "Sneakers",
      image: sneakers,
    },
    {
      name: "Running Shoes",
      image: running,
    },
    {
      name: "Boots",
      image: boot,
    },
  ];

  const fetchProductsByCategory = async (categoryName) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/categories/${categoryName}/products`);
      setProducts(response.data);
      setSelectedCategory(categoryName);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="categories-container">
      <h2>Categories</h2>
      <div className="categories-list">
        {categories.map((category, index) => (
          <div className="category-item" key={index} onClick={() => fetchProductsByCategory(category.name)}>
            <h3>{category.name}</h3>
            <img src={category.image} alt={category.name} />
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div className="products-list">
          <h2>Products in {selectedCategory}</h2>
          <ul>
            {products.map(product => (
              <li key={product.productId}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p>Brand Name:{product.brand_name}</p>
                <p>Stock Quantity: {product.stockQuantity}</p>
                <p>Size: {product.size}</p>
                <p>Color: {product.color}</p>
                {product.category && <p>Category: {product.category.name}</p>} {/* Assuming category has a 'name' field */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Categories;
