// src/AuthContext.jsx
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLogin = async () => {
    try {
      const res = await axios.get("/currentUser");
      if (res.data.success) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    navigate("/");
  };

  const logout = async (type) => {

    const response = await axios.get(
      `/logout/${type !== "current" ? type : ""}`
    );
    if(response.data.success && type !== "other"){
      setIsLoggedIn(false)
      navigate("/login")
      console.log(`Logging out: ${type}`);
    }
  };

  return (
    <AuthContext.Provider value={{ checkLogin, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
