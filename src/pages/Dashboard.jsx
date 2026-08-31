import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [projects, setProjects] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchProjects = async () => {
        const { data, error } = await supabase
          .from('client_projects')
          .select('*')
          .eq('user_id', user.id);
        
        if (!error && data) {
          setProjects(data);
        }
        setDataLoading(false);
      };
      fetchProjects();
    }
  }, [user]);

  // Protect the route
  if (!authLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  if (authLoading || dataLoading) {
    return <div className="container mt-8">Loading your portal...</div>;
  }

  return (
    <div className="container mt-8" style={{ minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Client Portal</h1>
        <button onClick={signOut} className="btn btn-outline">Log Out</button>
      </div>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          Welcome back, {user.user_metadata?.full_name || user.email}!
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Here are your active projects and their latest statuses.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {projects.length === 0 ? (
            <div style={{ border: '1px dashed var(--border-color)', padding: '2rem', borderRadius: '6px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No active projects found.
            </div>
          ) : (
            projects.map(p => (
              <div key={p.id} style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{p.project_name}</h3>
                  <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'var(--bg-secondary)', borderRadius: '999px', border: '1px solid var(--border-color)' }}>
                    {p.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  <strong>Last Update:</strong> {p.last_update || 'N/A'}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
