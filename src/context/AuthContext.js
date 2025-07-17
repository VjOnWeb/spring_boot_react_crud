// src/context/AuthContext.js
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    localStorage.setItem("jwtToken", token);
    const decoded = jwtDecode(token);
	setUser({
	  email: decoded.sub,
	  role: decoded.role,
	  username: decoded.username,
	  token,
	});

  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
  };

  const updateUserInContext = (updatedUser) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
		setUser({
		  email: decoded.sub,
		  role: decoded.role,
		  username: decoded.username,
		  token,
		});

      } catch (err) {
        console.error("Invalid token:", err);
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserInContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
