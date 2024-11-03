// src/Components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ user, onLogout }) => {
    const [profileData, setProfileData] = useState({ name: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');

    // Fetch user profile data
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/${user.id}`); // Replace with your API endpoint
                setProfileData(response.data);
            } catch (err) {
                setError('Error fetching profile data');
            }
        };

        fetchProfileData();
    }, [user.id]);
          
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/users/${user.id}`, profileData); // Replace with your API endpoint
            setIsEditing(false);
        } catch (err) {
            setError('Error updating profile');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${user.id}`); // Replace with your API endpoint
            onLogout(); // Call the logout function passed from App
        } catch (err) {
            setError('Error deleting profile');
        }
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Name:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{profileData.name}</span>
                    )}
                </div>
                <div>
                    <label>Email:</label>
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{profileData.email}</span>
                    )}
                </div>
                <button type="button" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
                {isEditing && <button type="submit">Update</button>}
                <button type="button" onClick={handleDelete} style={{ marginLeft: '10px' }}>
                    Delete Account
                </button>
            </form>
        </div>
    );
};

export default Profile;
