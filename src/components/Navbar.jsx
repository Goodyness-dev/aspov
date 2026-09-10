import React, { useState } from 'react';
import { Phone, Menu, X, ChevronRight, Shield } from 'lucide-react';
import { BUSINESS_INFO } from '../data/plumbingData';

export default function Navbar({ onOpenWizard }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass-strong shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-22">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/logo.jpg"
              alt="Aspen Drain Logo"
              className="h-11 sm:h-13 w-auto object-contain rounded-xl shadow-sm"
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-mist-950">
                Aspen Drain
              </span>
              <span className="text-xs text-mist-600 font-medium hidden sm:block">
                Since 2005
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {['Services', 'About', 'Gallery', 'Location'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-base font-semibold text-mist-700 hover:text-mist-950 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-mist-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-mist-800 font-bold text-base hover:bg-white/50 transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">{BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <button
              onClick={() => onOpenWizard()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-mist-950 text-white font-bold text-base hover:bg-mist-800 transition-all duration-300 shadow-lg shadow-mist-950/20 hover:shadow-xl"
            >
              <span>Free Quote</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href="#/admin"
              className="p-2.5 rounded-xl text-mist-600 hover:text-mist-950 hover:bg-white/60 transition-colors"
              title="Aspen Drain Owner Portal"
            >
              <Shield className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenWizard()}
              className="px-4 py-2.5 text-sm font-bold bg-mist-950 text-white rounded-xl shadow-md"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-mist-700"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/30 glass px-4 pt-4 pb-6 space-y-2">
          {['Services', 'About', 'Gallery', 'Location'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-lg font-medium text-mist-800 hover:bg-white/50 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <div className="pt-3 border-t border-mist-200/50 space-y-3">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl glass-card font-bold text-mist-900 text-base"
            >
              <Phone className="w-4 h-4" />
              <span>Call {BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenWizard(); }}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-mist-950 text-white font-bold text-base shadow-lg"
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
