import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authslice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is logged in
    authService
      .getCurrentUser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login(userdata));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  // Wait until auth check is done
  if (loading) {
    return (
      <div className="loading-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="layout-container">
      <Header />
      <main className="layout-content">
        <Outlet /> {/* This is where route content renders */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
