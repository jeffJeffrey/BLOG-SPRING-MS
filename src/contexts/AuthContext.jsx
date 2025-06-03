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
    if (token) {
      axios
        .get("/USER-SERVICE/api/v1/profile", {
          baseURL: API_URL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          logout();
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  

  const login = async (email, password) => {
    const res = await axios.post(
      "/USER-SERVICE/login",
      { email, password },
      {
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const token = res.data.token;
    Cookies.set("token", token);

    const userRes = await axios.get("/USER-SERVICE/api/v1/profile", {
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(userRes.data);
  };

  const register = async (data) => {
    await axios.post("/USER-SERVICE/api/v1/signup", data, {
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    await login(data.email, data.password);
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
