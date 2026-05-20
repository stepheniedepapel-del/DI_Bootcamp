import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./ErrorBoundary";

// Functional Components
const HomeScreen = () => <h1 className="p-3">Home</h1>;
const ProfileScreen = () => <h1 className="p-3">Profile</h1>;
const ShopScreen = () => {
  throw new Error("Shop component crashed!");
  return <h1 className="p-3">Shop</h1>; // Will not render due to error
};

function App() {
  return (
    <BrowserRouter>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
        <div className="navbar-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active font-weight-bold" : ""}`}>
            Home
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? "active font-weight-bold" : ""}`}>
            Profile
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? "active font-weight-bold" : ""}`}>
            Shop
          </NavLink>
        </div>
      </nav>

      {/* Routes wrapped individually with ErrorBoundary */}
      <Routes>
        <Route path="/" element={<ErrorBoundary><HomeScreen /></ErrorBoundary>} />
        <Route path="/profile" element={<ErrorBoundary><ProfileScreen /></ErrorBoundary>} />
        <Route path="/shop" element={<ErrorBoundary><ShopScreen /></ErrorBoundary>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
