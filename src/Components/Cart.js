// src/components/Cart.js
import React from 'react';
import './Cart.css'; // Create this CSS file for Cart component styles

const Cart = () => {
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <p>Your cart is currently empty.</p>
      {/* Add logic here to display cart items and handle checkout */}
    </div>
  );
};

export default Cart;
