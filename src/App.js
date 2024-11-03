// src/App.js
import React, { useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ProductList from './Components/ProductList';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Categories from './Components/Categories'; 
import Cart from './Components/Cart';
import Orders from './Components/Orders'; 
import Profile from './Components/Profile';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);
    const [currentView, setCurrentView] = useState('home');
    const [showCart, setShowCart] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleLogin = (userData) => {
        console.log("Logging in user:", userData); // Debug log
        setUser(userData); // Set user state
        setCurrentView('home'); // Reset view to home
        setShowLogin(false); // Close login form
    };
    
    // Inside renderMainContent function:
    if (user) {
        // Check if user is logged in and display content accordingly
        if (currentView === 'orders') {
            return <Orders />; // Navigate to Orders when selected
        }
        // Handle other views...
    }
    

    const handleLogout = () => {
        setUser(null);
        setCurrentView('home');
    };

    const toggleCart = () => {
        setShowCart(!showCart);
    };

    const handleHomeClick = () => {
        setCurrentView('home');
        setShowCart(false);
    };

    const handleProductsClick = () => {
        setCurrentView('products');
        setShowCart(false);
    };

    const handleCategoriesClick = () => {
        setCurrentView('categories');
        setShowCart(false);
    };

    const handleOrdersClick = () => {
        setCurrentView('orders'); // This sets the view to orders
        setShowCart(false);
    };

    const handleProfileClick = () => {
        setCurrentView('profile');
        setShowCart(false);
    };

    const renderMainContent = () => {
        if (user) {
            if (showCart) {
                return <Cart />;
            } else {
                switch (currentView) {
                    case 'home':
                        return <Home />;
                    case 'products':
                        // Pass user data to ProductList
                        return <ProductList onBuyNow={handleOrdersClick} />; // Ensure onBuyNow is passed
                    case 'categories':
                        return <Categories />;
                    case 'orders':
                        return <Orders />; // Ensure you have an Orders component to display orders
                    case 'profile':
                        return <Profile user={user} onLogout={handleLogout} />;
                    default:
                        return null;
                }
            }
        } else {
            return showLogin ? <Register onLogin={handleLogin} /> : <Login onLogin={handleLogin} />;
        }
    };

    return (
        <div className="app-container">
            <Header 
                onCartClick={toggleCart} 
                onHomeClick={handleHomeClick}
                onProductsClick={handleProductsClick}
                onCategoriesClick={handleCategoriesClick}
                onOrdersClick={handleOrdersClick}
                onProfileClick={handleProfileClick}
            />
            <main>
                {renderMainContent()}
                {!user && (
                    <div className="toggle-form">
                        <p onClick={() => setShowLogin(!showLogin)} style={{ cursor: 'pointer', color: 'blue' }}>
                            {showLogin ? 'Already have an account? Login here' : "Don't have an account? Register here"}
                        </p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default App;
