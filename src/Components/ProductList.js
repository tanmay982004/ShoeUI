import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './ProductList.css';
import UserContext from './UserContext'; // Import the UserContext

const ProductList = ({ onBuyNow }) => {
    const { user } = useContext(UserContext); // Get user from context
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                setProducts(response.data);
            } catch (err) {
                setError('Failed to fetch products');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleBuyNow = async (product) => {
        if (!user) {
            alert("Please log in to place an order.");
            return;
        }

        try {
            const orderData = {
                userId: user.userId, // Use user ID from context
                productName: product.name,
                totalAmount: product.price,
                status: 'PENDING',
                paymentMethod: 'Credit Card', // Make this dynamic if needed
                deliveryOption: 'Standard', // Make this dynamic if needed
            };

            const response = await axios.post('http://localhost:8080/api/orders', orderData);
            console.log('Order created:', response.data);
            alert('Order placed successfully!'); // Inform user about order placement
            onBuyNow(); // Call the onBuyNow prop to navigate to orders
        } catch (error) {
            console.error('Failed to create order:', error);
            alert('Failed to place order. Please try again.'); // Inform user about the error
        }
    };

    const handleAddToCart = (product) => {
        alert(`${product.name} has been added to your cart!`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="product-list">
            <h2>Product List</h2>
            <ul>
                {products.map(product => (
                    <li key={product.productId}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <p>Stock Quantity: {product.stockQuantity}</p>
                        <p>Brand Name: {product.brand_name}</p>
                        <p>Size: {product.size}</p>
                        <p>Color: {product.color}</p>
                        {product.category && <p>Category: {product.category.name}</p>}

                        <button onClick={() => handleBuyNow(product)}>Buy Now</button>
                        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
