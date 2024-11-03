import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin }) => {
    const [userEmail, setUserEmail] = useState(''); // User email state
    const [password, setPassword] = useState(''); // User password state
    const [errorMessage, setErrorMessage] = useState(''); // Error message state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset error message

        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                userEmail, // Send userEmail
                userPassword: password, // Send userPassword
            });

            if (response.data) {
                // Assuming response.data contains user details (like id and email)
                const userData = {
                    email: response.data.userEmail,
                    // You can include more user data here if needed, like user ID, role, etc.
                };
                onLogin(userData); // Pass user data to the parent component
            }
        } catch (error) {
            setErrorMessage('Invalid email or password. Please try again.'); // Show error message on failure
            console.error('Login error:', error); // Log error for debugging
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
