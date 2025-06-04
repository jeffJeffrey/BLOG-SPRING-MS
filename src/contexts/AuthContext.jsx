/* eslint-disable react-refresh/only-export-components */
import  { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { PUBLIC_GATWAY_URL } from "../api"; 
const API_URL = PUBLIC_GATWAY_URL ; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if(token){
      setUser(JSON.parse(Cookies.get("user")));
      setLoading(false);
    }else{
      setUser(null);
      setLoading(false);
    }
      
  }, []);

  

  const login = async (login, password) => {
    const res = await axios.post(
      "/USER-SERVICE/login",
      { login, password },
      {
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const token = res.data.accessToken;
    Cookies.set("token", token, {
      expires: 3, // Expires in 7 days
    });

    Cookies.set("user", JSON.stringify(res.data.user), {
      expires: 3, // Expires in 7 days
    });


    setUser(res.data.user);
  };

  const register = async (data) => {
    await axios.post("/USER-SERVICE/api/v1/signup", data, {
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const getToken = async (req) => {
  const token = req.cookies?.token || Cookies.get("token");
  if (!token) {
    throw new Error("No token found");
  }
  return token;
};
