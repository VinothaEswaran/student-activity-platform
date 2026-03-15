import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Activities from './pages/Activities';
import StudentDetail from './pages/StudentDetail';

const PrivateRoute = ({ children }) => {
  return localStorage.getItem('token')
    ? children
    : <Navigate to="/login" replace />;
};

const Layout = ({ children }) => (
  <div className="app-shell">
    <Sidebar />
    <Navbar />
    <main className="page-wrap">
      {children}
    </main>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>
        } />
        <Route path="/students" element={
          <PrivateRoute><Layout><Students /></Layout></PrivateRoute>
        } />
        <Route path="/students/:id" element={
          <PrivateRoute><Layout><StudentDetail /></Layout></PrivateRoute>
        } />
        <Route path="/activities" element={
          <PrivateRoute><Layout><Activities /></Layout></PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;