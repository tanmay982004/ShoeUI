// src/Components/Product.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Product.css';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products'); // Replace with your API URL
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="product-container">
      {products.map(product => (
        <div key={product.productId} className="product-card">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-stock">Stock: {product.stockQuantity}</p>
          <p className="product-color">Color: {product.color}</p>
          <p className="product-size">Size: {product.size}</p>
        </div>
      ))}
    </div>
  );
};

export default Product;
