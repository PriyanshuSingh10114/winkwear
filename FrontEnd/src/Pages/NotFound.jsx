import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../Components/SEO/SEO';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '2rem',
      textAlign: 'center',
      color: '#ffffff',
      background: '#0d0d0d'
    }}>
      <SEO
        title="404 Page Not Found | Wink & Wear"
        description="The page you are looking for does not exist."
        robots="noindex, nofollow"
      />
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#d4a045' }}>404</h1>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: '#aaa', maxWidth: '500px', marginBottom: '2rem', lineHeight: '1.6' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        style={{
          background: '#d4a045',
          color: '#000',
          padding: '12px 28px',
          borderRadius: '25px',
          fontWeight: '600',
          textDecoration: 'none',
          transition: 'transform 0.2s ease'
        }}
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
