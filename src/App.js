import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Activities from './pages/Activities';
import StudentDetail from './pages/StudentDetail';
import Calendar from './pages/Calendar';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log('PrivateRoute token:', token);
  if (!token || token === 'null' || token === 'undefined' || token === '') {
    return <Navigate to="/login" replace />;
  }
  return children;
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
          <PrivateRoute>
            <Layout><Dashboard /></Layout>
          </PrivateRoute>
        } />

        <Route path="/students" element={
          <PrivateRoute>
            <Layout><Students /></Layout>
          </PrivateRoute>
        } />

        <Route path="/students/:id" element={
          <PrivateRoute>
            <Layout><StudentDetail /></Layout>
          </PrivateRoute>
        } />

        <Route path="/activities" element={
          <PrivateRoute>
            <Layout><Activities /></Layout>
          </PrivateRoute>
        } />

        <Route path="/calendar" element={
          <PrivateRoute>
            <Layout><Calendar /></Layout>
          </PrivateRoute>
        } />

        <Route path="/notifications" element={
          <PrivateRoute>
            <Layout><Notifications /></Layout>
          </PrivateRoute>
        } />

        <Route path="/profile" element={
          <PrivateRoute>
            <Layout><Profile /></Layout>
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;