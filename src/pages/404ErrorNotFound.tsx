// src/pages/NotFound.jsx or src/components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found" style={{ 
      textAlign: 'center', 
      padding: '80px 20px',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ fontSize: '120px', color: '#4caf50', marginBottom: '20px' }}>
        <i className="fas fa-exclamation-triangle"></i>
      </div>
      <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#1b5e20' }}>
        404
      </h1>
      <h2 style={{ marginBottom: '20px', fontSize: '28px' }}>Page Not Found</h2>
      <p style={{ marginBottom: '30px', maxWidth: '600px', fontSize: '18px' }}>
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{
          padding: '12px 24px',
          backgroundColor: '#2e7d32',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <i className="fas fa-home"></i> Go to Homepage
        </Link>
        <Link to="/products" style={{
          padding: '12px 24px',
          backgroundColor: 'transparent',
          color: '#2e7d32',
          textDecoration: 'none',
          borderRadius: '8px',
          border: '2px solid #2e7d32',
          fontWeight: '600',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <i className="fas fa-store"></i> Browse Products
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

