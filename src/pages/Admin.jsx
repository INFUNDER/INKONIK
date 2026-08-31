import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      const fetchData = async () => {
        const [leadsRes, projectsRes] = await Promise.all([
          supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
          supabase.from('client_projects').select('*').order('created_at', { ascending: false })
        ]);
        
        if (leadsRes.data) setLeads(leadsRes.data);
        if (projectsRes.data) setProjects(projectsRes.data);
        setDataLoading(false);
      };
      fetchData();
    }
  }, [isAdmin]);

  // Protect the route
  if (!authLoading && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (authLoading || dataLoading) {
    return <div className="container mt-8">Loading admin panel...</div>;
  }

  return (
    <div className="container mt-8" style={{ minHeight: '80vh' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Admin Dashboard</h1>

      <div style={{ display: 'grid', gap: '3rem' }}>
        {/* Leads Section */}
        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Incoming Leads</h2>
          <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                  <th style={{ padding: '1rem' }}>Date</th>
                  <th style={{ padding: '1rem' }}>Name</th>
                  <th style={{ padding: '1rem' }}>Email</th>
                  <th style={{ padding: '1rem' }}>Service</th>
                  <th style={{ padding: '1rem' }}>Message</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No leads found.</td></tr>
                ) : (
                  leads.map(lead => (
                    <tr key={lead.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}>{new Date(lead.created_at).toLocaleDateString()}</td>
                      <td style={{ padding: '1rem', fontWeight: '500' }}>{lead.name}</td>
                      <td style={{ padding: '1rem' }}>{lead.email}</td>
                      <td style={{ padding: '1rem' }}><span style={{ padding: '0.25rem 0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px', fontSize: '0.875rem' }}>{lead.service}</span></td>
                      <td style={{ padding: '1rem', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={lead.message}>{lead.message}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Client Projects</h2>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>To assign a new project to a client, you currently need to use the Supabase SQL editor or Table editor. Status updates will be built here in the future.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {projects.length === 0 ? (
                <div style={{ border: '1px dashed var(--border-color)', padding: '2rem', borderRadius: '6px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No active client projects.
                </div>
              ) : (
                projects.map(p => (
                  <div key={p.id} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '6px' }}>
                    <h3 style={{ fontWeight: 'bold' }}>{p.project_name}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>User ID: {p.user_id.substring(0, 8)}...</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                      <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '999px' }}>{p.status}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(p.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
