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
      padding: '1rem 0', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000,
      borderBottom: '2px solid var(--border-color)'
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.05em' }}>
          INKONIK.
        </Link>
        
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ gridColumn: '3', justifySelf: 'end' }}>
          ☰
        </button>

        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`} style={{ gridColumn: '2', display: 'flex', justifyContent: 'center' }}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/#capabilities" onClick={() => setIsMenuOpen(false)}>Capabilities</Link>
          <Link to="/#case-studies" onClick={() => setIsMenuOpen(false)}>Case Studies</Link>
        </nav>

        <div className="desktop-cta" style={{ gridColumn: '3', justifySelf: 'end', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {user ? (
            <>
              {isAdmin && <Link to="/admin" style={{ color: 'var(--accent-color)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.875rem' }}>Admin Console</Link>}
              <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', backgroundColor: 'white', color: 'black' }}>Portal <span className="ik-mark">IK</span></Link>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: '#ccc', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.875rem' }}>Client Login</Link>
              <Link to="/signup" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--accent-color)', color: 'white', borderColor: 'var(--accent-color)' }}>Get Started <span className="ik-mark" style={{ color: 'white' }}>IK</span></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
