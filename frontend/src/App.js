import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/authContext';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NovaEntrega from './pages/NovaEntrega';
import MinhasEntregas from './pages/MinhasEntregas';
import AdminDashboard from './pages/AdminDashboard';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Register />} />

      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/nova-entrega" element={<PrivateRoute><NovaEntrega /></PrivateRoute>} />
      <Route path="/nova-entrega/:id" element={<PrivateRoute><NovaEntrega /></PrivateRoute>} />
      <Route path="/minhas-entregas" element={<PrivateRoute><MinhasEntregas /></PrivateRoute>} />
      <Route path="/admin" element={<PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>} />

      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
