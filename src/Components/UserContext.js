// src/components/UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for using the UserContext
 export const useUser = () => {
    return useContext(UserContext);
};

export default UserContext; // Make sure UserContext is exported
