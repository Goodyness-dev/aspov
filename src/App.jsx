import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import Services from './components/Services';
import About from './components/About';
import Gallery from './components/Gallery';
import HoursAndLocation from './components/HoursAndLocation';
import Amenities from './components/Amenities';
import Footer from './components/Footer';
import QuoteWizardModal from './components/wizard/QuoteWizardModal';
import AdminProtectedPortal from './components/admin/AdminProtectedPortal';

export default function App() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    return (hash.startsWith('#/admin') || path === '/admin') ? 'admin' : 'home';
  });

  // Listen to hash and popstate changes
  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash.startsWith('#/admin') || path === '/admin') {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);

    // Keyboard shortcut for quick owner access: Ctrl + Shift + A (or Cmd + Shift + A)
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        window.location.hash = '#/admin';
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOpenWizard = (serviceName = null) => {
    setSelectedService(serviceName);
    setWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setWizardOpen(false);
    setSelectedService(null);
  };

  // Render Admin Dashboard if route is admin
  if (currentRoute === 'admin') {
    return (
      <AdminProtectedPortal
        onBackToSite={() => {
          window.location.hash = '';
          setCurrentRoute('home');
        }}
      />
    );
  }

  // Render Public Website
  return (
    <div className="min-h-screen bg-mist-100 flex flex-col selection:bg-mist-950 selection:text-white">
      <Navbar onOpenWizard={() => handleOpenWizard()} />

      <main className="flex-grow">
        <Hero onOpenWizard={() => handleOpenWizard()} />
        <TrustBadges />
        <Services onSelectService={(serviceName) => handleOpenWizard(serviceName)} />
        <About onOpenWizard={() => handleOpenWizard()} />
        <Gallery onOpenWizard={(serviceName) => handleOpenWizard(serviceName)} />
        <HoursAndLocation onOpenWizard={() => handleOpenWizard()} />
        <Amenities />
      </main>

      <Footer onOpenWizard={() => handleOpenWizard()} />

      <QuoteWizardModal
        isOpen={wizardOpen}
        onClose={handleCloseWizard}
        initialService={selectedService}
      />
    </div>
  );
}
