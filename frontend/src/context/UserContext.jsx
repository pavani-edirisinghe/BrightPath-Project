import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user data:", e);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  const updateLocalUser = (newData) => {
    setUser(prev => {
      if (!prev) return prev;
      const updatedUser = { ...prev, ...newData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

 const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const updateUser = async (updatedData) => {
    if (!user?.id) return;
    
    const originalUser = user;
    
    try {
      // Optimistic update
      updateLocalUser(updatedData);
      
      // API call
      await axios.put(
        `${BACKEND_URL}/api/users/${user.id}`,
        updatedData
      );
    } catch (error) {
      // Revert on error
      updateLocalUser(originalUser);
      console.error("Update failed", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateUser,
      updateLocalUser
    }}>
      {children}
    </UserContext.Provider>
  );
};