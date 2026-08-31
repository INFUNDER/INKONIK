import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState('');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    
    const { error } = await supabase.from('contact_submissions').insert([formData]);
    
    if (error) {
      console.error(error);
      setStatus('Error submitting form. Please try again.');
    } else {
      setStatus('Message sent successfully! We will be in touch soon.');
      setFormData({ name: '', email: '', service: '', message: '' });
    }
  };

  const capabilities = [
    { title: 'Digital Strategy', desc: 'Comprehensive roadmaps to scale enterprise presence and drive digital transformation.' },
    { title: 'Search Engine Dominance', desc: 'Technical SEO and high-authority link acquisition for global search visibility.' },
    { title: 'Performance Media', desc: 'Data-driven programmatic and search advertising designed for maximal enterprise ROI.' }
  ];

  const caseStudies = [
    { name: 'Analytics Pro', result: '150% Increase in Enterprise Leads', metric: '150%', desc: 'in high-value B2B pipeline generation' },
    { name: 'Aesthetik Commerce', result: 'Global E-Commerce Transformation', metric: '3x', desc: 'return on global performance media' },
    { name: 'CloudNine Infrastructure', result: 'B2B Market Penetration Strategy', metric: '#1', desc: 'search share in cloud infrastructure' }
  ];

  const testimonials = [
    { text: "INKONIK operates at a level of strategic depth that is rare to find. They are a true extension of our executive team.", author: "Sarah Jenkins", role: "CMO, TechStartup" },
    { text: "Their performance media architecture completely revitalized our global customer acquisition strategy.", author: "Marcus Thorne", role: "CEO, EcoRetail Global" },
    { text: "Unparalleled execution and analytics. INKONIK's strategies are the backbone of our digital growth.", author: "Elena Rostova", role: "VP Marketing, CloudNine" }
  ];

  // Shared animation variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div>
      {/* Enterprise Hero Section */}
      <section style={{ height: '90vh', position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div className="hero-video-container">
          {/* PLACEHOLDER VIDEO: Replace 'background.mp4' with your actual video file in the public folder */}
          <video autoPlay loop muted playsInline>
            <source src="/loop_vid.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay"></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeUpVariant} className="hero-title" style={{ color: 'white' }}>
              Let there be<br />
              <span style={{ color: 'var(--accent-color)' }}>Growth.</span>
            </motion.h1>
            <motion.p variants={fadeUpVariant} className="hero-subtitle" style={{ color: '#eaeaea' }}>
              We architect digital dominance. Elite strategy, performance media, and search optimization for ambitious global brands.
            </motion.p>
            <motion.div variants={fadeUpVariant} className="flex flex-wrap-mobile gap-4">
              <a href="#contact" className="btn btn-primary">Partner With Us <span className="ik-mark">IK</span></a>
              <a href="#case-studies" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>Explore Capabilities <span className="ik-mark" style={{ color: 'white' }}>IK</span></a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Infinite Logo Marquee */}
      <section className="marquee-container">
        <div className="marquee-content">
          <span>FORBES</span>
          <span>TECHCRUNCH</span>
          <span>WIRED</span>
          <span>BLOOMBERG</span>
          <span>FAST COMPANY</span>
          <span>INC 5000</span>
          <span>FORBES</span>
          <span>TECHCRUNCH</span>
          <span>WIRED</span>
          <span>BLOOMBERG</span>
          <span>FAST COMPANY</span>
          <span>INC 5000</span>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeUpVariant} className="section-title">Capabilities</motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {capabilities.map((s, i) => (
              <motion.div key={i} variants={fadeUpVariant} className="enterprise-card" style={{ background: 'var(--bg-secondary)', border: 'none' }}>
                <h3 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Case Studies Section (Standardized Enterprise Layout) */}
      <section id="case-studies" className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUpVariant} className="section-title">Case Studies</motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {caseStudies.map((p, i) => (
                <motion.div key={i} variants={fadeUpVariant} className="enterprise-card" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '350px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '1rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{p.name}</h3>
                    <p style={{ fontWeight: '700', fontSize: '1.5rem', lineHeight: '1.3' }}>{p.result}</p>
                  </div>
                  <div style={{ marginTop: '3rem' }}>
                    <p style={{ color: 'var(--accent-color)', fontWeight: '900', fontSize: '4rem', lineHeight: '1' }}>{p.metric}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Insights / Testimonials Section */}
      <section style={{ backgroundColor: '#000', color: '#fff' }} className="section-padding">
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeUpVariant} className="section-title" style={{ color: '#fff', borderLeftColor: 'var(--accent-color)' }}>Latest Insights</motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUpVariant} style={{ background: '#111', padding: '3rem', border: '1px solid #333' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: '300', marginBottom: '2rem', color: '#eaeaea', lineHeight: '1.8' }}>"{t.text}"</p>
                <div>
                  <p style={{ fontWeight: '700', fontSize: '1.125rem', textTransform: 'uppercase' }}>{t.author}</p>
                  <p style={{ color: 'var(--accent-color)', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ backgroundColor: 'var(--accent-color)', color: 'white', padding: '8rem 0' }}>
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div style={{ maxWidth: '700px', margin: '0 auto', background: '#000', padding: '4rem', boxShadow: '20px 20px 0px rgba(0,0,0,0.5)' }}>
            <motion.h2 variants={fadeUpVariant} style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Initiate Transformation</motion.h2>
            <motion.p variants={fadeUpVariant} style={{ color: '#ccc', marginBottom: '3rem', fontSize: '1.125rem' }}>Connect with our global strategy team to define your digital roadmap.</motion.p>
            
            <motion.form variants={fadeUpVariant} onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label style={{ color: '#fff' }}>Full Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ background: '#111', color: 'white', borderColor: '#333' }} />
              </div>
              <div className="form-group">
                <label style={{ color: '#fff' }}>Corporate Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ background: '#111', color: 'white', borderColor: '#333' }} />
              </div>
              <div className="form-group">
                <label style={{ color: '#fff' }}>Area of Interest</label>
                <input type="text" value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} style={{ background: '#111', color: 'white', borderColor: '#333' }} />
              </div>
              <div className="form-group">
                <label style={{ color: '#fff' }}>Strategic Objectives</label>
                <textarea 
                  required 
                  rows="5" 
                  style={{ width: '100%', padding: '1rem', border: '1px solid #333', background: '#111', color: 'white', fontFamily: 'inherit', resize: 'vertical' }}
                  value={formData.message} 
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', backgroundColor: 'var(--accent-color)', color: 'white', marginTop: '1rem' }}>Submit Inquiry <span className="ik-mark" style={{ color: 'white' }}>IK</span></button>
              {status && <p style={{ marginTop: '1.5rem', textAlign: 'center', color: status.includes('Error') ? '#ff4d4f' : '#dcfce3', fontWeight: '700' }}>{status}</p>}
            </motion.form>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#000', color: '#fff', padding: '6rem 0 3rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '4rem', marginBottom: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-0.05em' }}>INKONIK.</h2>
              <p style={{ color: '#aaa', maxWidth: '300px' }}>Global digital transformation and performance strategy.</p>
            </div>
            <div style={{ display: 'flex', gap: '4rem' }}>
              <div>
                <h4 style={{ textTransform: 'uppercase', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>About</h4>
                <p style={{ color: '#ccc', marginBottom: '0.5rem', cursor: 'pointer' }}>Our Story</p>
                <p style={{ color: '#ccc', marginBottom: '0.5rem', cursor: 'pointer' }}>Leadership</p>
                <p style={{ color: '#ccc', marginBottom: '0.5rem', cursor: 'pointer' }}>Careers</p>
              </div>
              <div>
                <h4 style={{ textTransform: 'uppercase', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>Connect</h4>
                <p style={{ color: '#ccc', marginBottom: '0.5rem', cursor: 'pointer' }}>LinkedIn</p>
                <p style={{ color: '#ccc', marginBottom: '0.5rem', cursor: 'pointer' }}>Twitter</p>
                <p style={{ color: '#ccc', marginBottom: '0.5rem', cursor: 'pointer' }}>Contact</p>
              </div>
            </div>
          </div>
          <div style={{ color: '#666', fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <p>&copy; {new Date().getFullYear()} INKONIK Global. All rights reserved.</p>
            <p style={{ display: 'flex', gap: '2rem' }}>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
