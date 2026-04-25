import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ConsultantDashboard from "./pages/ConsultantDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    setToken(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container-fluid">
        <Routes>
          <Route
            path="/login"
            element={<Login setUser={setUser} setToken={setToken} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin/*"
            element={
              user?.id ? (
                <AdminDashboard token={token} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/student/*"
            element={
              user?.id ? (
                <StudentDashboard token={token} user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/consultant/*"
            element={
              user?.id ? (
                <ConsultantDashboard token={token} user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
