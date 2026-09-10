import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { isAdminAuthenticated } from '../../services/configService';

export default function AdminProtectedPortal({ onBackToSite }) {
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminAuthenticated());

  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
  }, []);

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => setIsAuthenticated(true)}
        onBackToSite={onBackToSite}
      />
    );
  }

  return (
    <AdminDashboard
      onLogout={() => setIsAuthenticated(false)}
    />
  );
}
