import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header style={{ 
      backgroundColor: '#000', 
      color: '#fff',
      padding: '1.5rem 0', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000,
      borderBottom: '4px solid var(--accent-color)'
    }}>
      <div className="container flex justify-between items-center">
        <Link to="/" style={{ fontSize: '1.75rem', fontWeight: '900', letterSpacing: '-0.05em' }}>
          INKONIK.
        </Link>
        
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>

        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/#capabilities" onClick={() => setIsMenuOpen(false)}>Capabilities</Link>
          <Link to="/#case-studies" onClick={() => setIsMenuOpen(false)}>Case Studies</Link>
          
          {user ? (
            <>
              {isAdmin && <Link to="/admin" style={{ color: 'var(--accent-color)' }} onClick={() => setIsMenuOpen(false)}>Admin Console</Link>}
              <Link to="/dashboard" className="btn btn-primary" style={{ backgroundColor: 'white', color: 'black' }} onClick={() => setIsMenuOpen(false)}>Portal <span className="ik-mark">IK</span></Link>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: '#ccc' }} onClick={() => setIsMenuOpen(false)}>Client Login</Link>
              <Link to="/signup" className="btn btn-primary" style={{ backgroundColor: 'var(--accent-color)', color: 'white', borderColor: 'var(--accent-color)' }} onClick={() => setIsMenuOpen(false)}>Get Started <span className="ik-mark" style={{ color: 'white' }}>IK</span></Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
