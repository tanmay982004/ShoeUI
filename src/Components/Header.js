// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = ({ user, onHomeClick, onProductsClick, onCategoriesClick, onOrdersClick, onProfileClick, onCartClick }) => {
  return (
    <header className="header">
      <div className="logo">Shoe Shop</div>
      <nav className="nav-links">
        <a href="#" onClick={onHomeClick}>Home</a>
        <a href="#" onClick={onProductsClick}>Products</a>
        <a href="#" onClick={onCategoriesClick}>Categories</a>
        <a href="#" onClick={onOrdersClick}>Orders</a>
        <a href="#" onClick={onProfileClick}>Profile</a>
        {user && <a href="#" onClick={onCartClick}>Cart</a>} {/* Show cart link when user is logged in */}
      </nav>
    </header>
  );
};

export default Header;
