import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProductsProvider } from "./context/ProductsContext";
import { UserProvider } from "./context/UserContext";
import PersistentDrawerLeft from "./components/PersistentDrawerLeft";
import Login from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import EditUserPage from "./pages/EditUserPage";
import BalancePage from "./pages/BalancePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") !== null;
  });

  return (
    <UserProvider>
      <ProductsProvider>
        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/register"
            element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="*"
            element={
              isAuthenticated ? (
                <PersistentDrawerLeft
                  setIsAuthenticated={setIsAuthenticated}
                >
                  <Routes>
                    <Route index path="/" element={<Home />} />
                    <Route index path="/edit-user" element={<EditUserPage />} />
                    <Route path="/balance" element={<BalancePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                  </Routes>
                </PersistentDrawerLeft>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </ProductsProvider>
    </UserProvider>
  );
}

export default App;
