import React, { useState, useEffect } from 'react';
import { ChefHat, Menu, X, Terminal, HelpCircle } from 'lucide-react';

export default function Navbar({ onScrollToSimulator, onScrollToFeatures }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar-container ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-content">
        {/* Logo */}
        <div className="logo-section">
          <ChefHat className="logo-icon" />
          <div className="logo-text">
            <span className="brand-name">ديوان</span>
            <span className="brand-sub">DIWAN</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="nav-links">
          <a href="#features" onClick={(e) => { e.preventDefault(); onScrollToFeatures(); }} className="nav-link">المميزات</a>
          <a href="#demo" onClick={(e) => { e.preventDefault(); onScrollToSimulator(); }} className="nav-link highlight-link">
            <Terminal size={16} />
            المحاكي التفاعلي
          </a>
          <a href="#about" className="nav-link">من نحن</a>
          <a href="#pricing" className="nav-link">الاشتراكات</a>
        </div>

        {/* CTA Button */}
        <div className="nav-cta-container">
          <button onClick={onScrollToSimulator} className="btn btn-primary btn-sm-padding">
            جرب النظام مجاناً
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="mobile-menu-dropdown glass-panel">
          <a 
            href="#features" 
            onClick={(e) => { e.preventDefault(); onScrollToFeatures(); setIsOpen(false); }} 
            className="mobile-link"
          >
            المميزات
          </a>
          <a 
            href="#demo" 
            onClick={(e) => { e.preventDefault(); onScrollToSimulator(); setIsOpen(false); }} 
            className="mobile-link mobile-highlight-link"
          >
            <Terminal size={18} />
            المحاكي التفاعلي
          </a>
          <a href="#about" onClick={() => setIsOpen(false)} className="mobile-link">من نحن</a>
          <a href="#pricing" onClick={() => setIsOpen(false)} className="mobile-link">الاشتراكات</a>
          <button 
            onClick={() => { onScrollToSimulator(); setIsOpen(false); }} 
            className="btn btn-primary w-full mt-4"
          >
            جرب النظام مجاناً
          </button>
        </div>
      )}

      <style>{`
        .navbar-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all var(--transition-normal);
          border-bottom: 1px solid transparent;
          padding: 20px 0;
        }

        .navbar-scrolled {
          background: rgba(8, 11, 17, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-light);
          padding: 12px 0;
        }

        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .logo-icon {
          color: var(--primary);
          width: 36px;
          height: 36px;
          filter: drop-shadow(0 0 8px var(--primary-glow));
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-white);
          line-height: 1;
        }

        .brand-sub {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .nav-link {
          color: var(--text-gray);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .nav-link:hover {
          color: var(--primary);
        }

        .highlight-link {
          color: var(--secondary);
          position: relative;
        }
        
        .highlight-link:hover {
          color: #22d3ee;
        }

        .highlight-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--secondary);
          border-radius: 2px;
          box-shadow: 0 0 8px var(--secondary-glow);
          transform: scaleX(0);
          transition: transform var(--transition-normal);
        }

        .highlight-link:hover::after {
          transform: scaleX(1);
        }

        .nav-cta-container {
          display: block;
        }

        .btn-sm-padding {
          padding: 8px 18px;
          font-size: 0.9rem;
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-white);
          cursor: pointer;
        }

        .mobile-menu-dropdown {
          position: absolute;
          top: 100%;
          left: 20px;
          right: 20px;
          margin-top: 10px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-radius: 12px;
          animation: slideIn 0.3s ease-out;
        }

        .mobile-link {
          color: var(--text-gray);
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 600;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mobile-highlight-link {
          color: var(--secondary);
        }

        .w-full {
          width: 100%;
        }

        .mt-4 {
          margin-top: 16px;
        }

        @media (max-width: 768px) {
          .nav-links, .nav-cta-container {
            display: none;
          }
          .mobile-menu-toggle {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
}
