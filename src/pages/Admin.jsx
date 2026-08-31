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
    <div className="container mt-8 section-padding" style={{ minHeight: '80vh', paddingTop: '4rem' }}>
      <div className="animate-fade-in-up">
        <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>Admin Dashboard</h1>
      </div>

      <div style={{ display: 'grid', gap: '4rem' }}>
        {/* Leads Section */}
        <section className="animate-fade-in-up delay-100">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Incoming Leads</h2>
          <div className="enterprise-card" style={{ padding: '0', background: 'var(--bg-secondary)', overflowX: 'auto', border: '1px solid var(--border-color)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                  <th style={{ padding: '1.25rem 1rem', fontWeight: '600' }}>Date</th>
                  <th style={{ padding: '1.25rem 1rem', fontWeight: '600' }}>Name</th>
                  <th style={{ padding: '1.25rem 1rem', fontWeight: '600' }}>Email</th>
                  <th style={{ padding: '1.25rem 1rem', fontWeight: '600' }}>Service</th>
                  <th style={{ padding: '1.25rem 1rem', fontWeight: '600' }}>Message</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr><td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No leads found.</td></tr>
                ) : (
                  leads.map(lead => (
                    <tr key={lead.id} className="hover-lift" style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}>
                      <td style={{ padding: '1rem', whiteSpace: 'nowrap', color: 'var(--text-muted)' }}>{new Date(lead.created_at).toLocaleDateString()}</td>
                      <td style={{ padding: '1rem', fontWeight: '600' }}>{lead.name}</td>
                      <td style={{ padding: '1rem' }}><a href={`mailto:${lead.email}`} style={{ color: 'var(--accent-color)' }}>{lead.email}</a></td>
                      <td style={{ padding: '1rem' }}><span style={{ padding: '0.35rem 0.75rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '500' }}>{lead.service}</span></td>
                      <td style={{ padding: '1rem', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={lead.message}>{lead.message}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Projects Section */}
        <section className="animate-fade-in-up delay-200">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Client Projects</h2>
          <div className="enterprise-card" style={{ background: 'var(--bg-secondary)', padding: '2rem', border: '1px solid var(--border-color)' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>To assign a new project to a client, you currently need to use the Supabase SQL editor or Table editor. Status updates will be built here in the future.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {projects.length === 0 ? (
                <div style={{ border: '2px dashed var(--border-color)', padding: '3rem', borderRadius: '8px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No active client projects.
                </div>
              ) : (
                projects.map(p => (
                  <div key={p.id} className="hover-lift" style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '10px', background: 'var(--bg-main)' }}>
                    <h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>{p.project_name}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>Client UID: {p.user_id.substring(0, 12)}...</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.875rem', padding: '0.35rem 0.75rem', background: p.status === 'Completed' ? '#dcfce3' : 'var(--bg-secondary)', color: p.status === 'Completed' ? '#166534' : 'inherit', border: '1px solid var(--border-color)', borderRadius: '999px', fontWeight: '500' }}>{p.status}</span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{new Date(p.created_at).toLocaleDateString()}</span>
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
