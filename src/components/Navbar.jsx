import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, isAdmin } = useAuth();

  return (
    <header style={{ borderBottom: '1px solid var(--border-color)', padding: '1rem 0' }}>
      <div className="container flex justify-between items-center">
        <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '-0.05em' }}>
          INKONIK.
        </Link>
        <nav className="flex gap-4 items-center">
          <Link to="/">Home</Link>
          <Link to="/#services">Services</Link>
          <Link to="/#portfolio">Portfolio</Link>
          
          {user ? (
            <>
              {isAdmin && <Link to="/admin" style={{ fontWeight: '500', color: 'var(--accent-color)' }}>Admin</Link>}
              <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Dashboard</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Log In</Link>
              <Link to="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
