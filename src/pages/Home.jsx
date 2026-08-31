import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', service: 'Social Media', message: '' });
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: false, error: null });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: null });
    
    const { error } = await supabase
      .from('contact_submissions')
      .insert([{ 
        name: formData.name, 
        email: formData.email, 
        service: formData.service, 
        message: formData.message 
      }]);

    if (error) {
      setSubmitStatus({ loading: false, success: false, error: error.message });
    } else {
      setSubmitStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', service: 'Social Media', message: '' });
    }
  };

  const services = [
    { title: 'Social Media Management', desc: 'Build a loyal community and scale your brand awareness with strategic, engaging content across all platforms.' },
    { title: 'SEO Optimization', desc: 'Dominate search results and capture high-intent traffic with our data-driven on-page and off-page SEO strategies.' },
    { title: 'Google Ads (PPC)', desc: 'Maximize your ROI with hyper-targeted paid campaigns designed to turn clicks into paying customers instantly.' }
  ];

  const portfolio = [
    { name: 'Analytics Pro', result: '150% Increase in Leads', image: '/images/portfolio_1.jpg' },
    { name: 'Aesthetik Commerce', result: '3x ROAS on Google Ads', image: '/images/portfolio_2.jpg' },
    { name: 'Viral Campaign', result: '10k New Followers in 3 Months', image: '/images/portfolio_3.jpg' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="animate-fade-in-up">
          <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
            Dominate Your Market.<br />
            <span style={{ color: 'var(--accent-color)' }}>Scale Your Brand.</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
            We are INKONIK—a premium digital marketing agency specializing in high-converting Social Media Strategies, elite SEO Optimization, and ROI-focused Google Ads.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#contact" className="btn btn-primary hover-lift">Start a Project</a>
            <a href="#portfolio" className="btn btn-outline hover-lift">View Our Work</a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ backgroundColor: 'var(--bg-secondary)', padding: '6rem 0' }}>
        <div className="container">
          <h2 className="animate-fade-in-up" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3.5rem', textAlign: 'center' }}>Our Expertise</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {services.map((s, i) => (
              <div key={i} className={`hover-lift animate-fade-in-up delay-${(i + 1) * 100}`} style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="container" style={{ padding: '6rem 0' }}>
        <h2 className="animate-fade-in-up" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3.5rem', textAlign: 'center' }}>Proven Results</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          {portfolio.map((p, i) => (
            <div key={i} className={`hover-lift animate-fade-in-up delay-${(i + 1) * 100}`} style={{ border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', textAlign: 'left', background: 'white' }}>
              <img src={p.image} alt={p.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{p.name}</h3>
                <p style={{ color: 'var(--accent-color)', fontWeight: '600', fontSize: '1.1rem' }}>{p.result}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ backgroundColor: 'var(--bg-secondary)', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>Let's Talk</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>Ready to scale? Fill out the form below and we'll be in touch.</p>
          
          <form onSubmit={handleContactSubmit} style={{ background: 'white', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            {submitStatus.success && <div style={{ color: 'green', marginBottom: '1rem', padding: '1rem', background: '#ecfdf5', borderRadius: '4px' }}>Thanks! We've received your inquiry and will respond shortly.</div>}
            {submitStatus.error && <div style={{ color: 'red', marginBottom: '1rem', padding: '1rem', background: '#fef2f2', borderRadius: '4px' }}>Error: {submitStatus.error}</div>}
            
            <div className="form-group">
              <label>Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Service of Interest</label>
              <select 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px', fontFamily: 'inherit' }}
                value={formData.service} 
                onChange={e => setFormData({...formData, service: e.target.value})}
              >
                <option>Social Media</option>
                <option>SEO</option>
                <option>Google Ads</option>
                <option>Full Service</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea 
                required 
                rows="4"
                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px', fontFamily: 'inherit', resize: 'vertical' }}
                value={formData.message} 
                onChange={e => setFormData({...formData, message: e.target.value})} 
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitStatus.loading}>
              {submitStatus.loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}

      {/* Footer */}
      <footer style={{ backgroundColor: '#000', color: '#fff', padding: '4rem 0 2rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>INKONIK.</h2>
          <p style={{ color: '#aaa', marginBottom: '2rem' }}>Your growth partner for Social Media, SEO, and Google Ads.</p>
          <div style={{ borderTop: '1px solid #333', paddingTop: '2rem', color: '#666', fontSize: '0.875rem' }}>
            &copy; {new Date().getFullYear()} INKONIK Marketing Agency. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
