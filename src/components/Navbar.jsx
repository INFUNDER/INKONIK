import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header style={{ borderBottom: '1px solid var(--border-color)', padding: '1rem 0', position: 'relative' }}>
      <div className="container flex justify-between items-center">
        <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '-0.05em' }}>
          INKONIK.
        </Link>
        
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>

        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/#services" onClick={() => setIsMenuOpen(false)}>Services</Link>
          <Link to="/#portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
          
          {user ? (
            <>
              {isAdmin && <Link to="/admin" style={{ fontWeight: '500', color: 'var(--accent-color)' }} onClick={() => setIsMenuOpen(false)}>Admin</Link>}
              <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }} onClick={() => setIsMenuOpen(false)}>Log In</Link>
              <Link to="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
