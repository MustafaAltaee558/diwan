import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Simulator from './components/Simulator';
import Footer from './components/Footer';

export default function App() {
  const featuresRef = useRef(null);
  const simulatorRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSimulator = () => {
    simulatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Navbar with smooth scroll navigations */}
      <Navbar 
        onScrollToFeatures={scrollToFeatures}
        onScrollToSimulator={scrollToSimulator}
      />

      {/* Hero Section */}
      <Hero 
        onStartDemo={scrollToSimulator}
        onExploreFeatures={scrollToFeatures}
      />

      {/* Features & Solutions Section */}
      <div ref={featuresRef}>
        <Features />
      </div>

      {/* Interactive live system demo */}
      <div ref={simulatorRef}>
        <Simulator />
      </div>

      {/* Pricing and Footer Info Section */}
      <Footer />

      <style>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
        }
      `}</style>
    </div>
  );
}
