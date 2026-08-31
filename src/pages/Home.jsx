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

  const testimonials = [
    { text: "INKONIK completely transformed our digital presence. Our lead volume tripled within the first quarter.", author: "Sarah Jenkins", role: "CMO, TechStartup" },
    { text: "The ROI on their Google Ads campaigns is unparalleled. They don't just generate traffic, they generate revenue.", author: "Marcus Thorne", role: "Founder, EcoRetail" },
    { text: "Their SEO strategy put us on page 1 for our most competitive keywords. Highly recommend this elite team.", author: "Elena Rostova", role: "VP Marketing, CloudNine" }
  ];

  // Shared animation variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="container section-padding" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-grid"></div>
        <div className="hero-bg-gradient"></div>
        
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          style={{ position: 'relative', zIndex: 10 }}
        >
          <motion.h1 variants={fadeUpVariant} className="hero-title">
            Dominate Your Market.<br />
            <span style={{ color: 'var(--accent-color)' }}>Scale Your Brand.</span>
          </motion.h1>
          <motion.p variants={fadeUpVariant} className="hero-subtitle">
            We are INKONIK—a premium digital marketing agency specializing in high-converting Social Media Strategies, elite SEO Optimization, and ROI-focused Google Ads.
          </motion.p>
          <motion.div variants={fadeUpVariant} className="flex flex-wrap-mobile justify-center gap-4">
            <a href="#contact" className="btn btn-primary btn-premium" style={{ color: 'white', border: 'none' }}>Start a Project</a>
            <a href="#portfolio" className="btn btn-outline hover-lift" style={{ background: 'white' }}>View Our Work</a>
          </motion.div>
        </motion.div>
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
          {/* Duplicate for seamless loop */}
          <span>FORBES</span>
          <span>TECHCRUNCH</span>
          <span>WIRED</span>
          <span>BLOOMBERG</span>
          <span>FAST COMPANY</span>
          <span>INC 5000</span>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeUpVariant} className="section-title">Our Expertise</motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {services.map((s, i) => (
              <motion.div key={i} variants={fadeUpVariant} className="hover-lift" style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="container section-padding">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeUpVariant} className="section-title">Proven Results</motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {portfolio.map((p, i) => (
              <motion.div key={i} variants={fadeUpVariant} className="hover-lift" style={{ border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', textAlign: 'left', background: 'white' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{p.name}</h3>
                  <p style={{ color: 'var(--accent-color)', fontWeight: '600', fontSize: '1.1rem' }}>{p.result}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section style={{ backgroundColor: '#000', color: '#fff' }} className="section-padding">
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeUpVariant} className="section-title" style={{ color: '#fff' }}>Client Success Stories</motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUpVariant} style={{ background: '#111', padding: '2.5rem', borderRadius: '12px', border: '1px solid #333' }}>
                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem', color: '#ccc' }}>"{t.text}"</p>
                <div>
                  <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{t.author}</p>
                  <p style={{ color: 'var(--accent-color)', fontSize: '0.875rem' }}>{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ backgroundColor: 'var(--bg-secondary)', padding: '5rem 0' }}>
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)' }}>
            <motion.h2 variants={fadeUpVariant} style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>Ready to Scale?</motion.h2>
            <motion.p variants={fadeUpVariant} style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>Let's discuss how we can accelerate your growth.</motion.p>
            
            <motion.form variants={fadeUpVariant} onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label>Service Interested In</label>
                <input type="text" value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} placeholder="SEO, Social Media, etc." />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  required 
                  rows="4" 
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px', fontFamily: 'inherit', resize: 'vertical' }}
                  value={formData.message} 
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your project goals..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-premium" style={{ width: '100%', color: 'white', border: 'none' }}>Send Message</button>
              {status && <p style={{ marginTop: '1rem', textAlign: 'center', color: status.includes('Error') ? 'red' : 'green', fontWeight: '500' }}>{status}</p>}
            </motion.form>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#000', color: '#fff', padding: '4rem 0 2rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', letterSpacing: '-0.05em' }}>INKONIK.</h2>
          <p style={{ color: '#aaa', marginBottom: '2rem' }}>Your elite growth partner for Social Media, SEO, and Google Ads.</p>
          <div style={{ borderTop: '1px solid #333', paddingTop: '2rem', color: '#666', fontSize: '0.875rem' }}>
            &copy; {new Date().getFullYear()} INKONIK Marketing Agency. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
