import React from 'react';
import { Phone, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/plumbingData';

export default function Footer({ onOpenWizard }) {
  return (
    <footer className="bg-mist-950 text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top CTA Band */}
        <div className="rounded-3xl bg-gradient-to-r from-mist-800 to-mist-900 p-10 sm:p-12 mb-14 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-mist-700/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-mist-600/15 rounded-full blur-2xl" />
          
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative z-10">
            Ready to get started?
          </h3>
          <p className="text-base text-mist-300 mb-8 max-w-md mx-auto relative z-10">
            Get a free quote in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => onOpenWizard()}
              className="px-10 py-4 rounded-2xl bg-white text-mist-950 font-bold text-base hover:bg-mist-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              Request Free Quote
            </button>
            <a
              href={BUSINESS_INFO.phoneTel}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass-dark hover:bg-mist-700/60 text-white font-bold text-base transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Aspen Drain" className="w-12 h-12 object-contain rounded-xl bg-white/10 p-1.5" />
              <span className="text-xl font-extrabold">Aspen Drain</span>
            </div>
            <p className="text-sm text-mist-400 leading-relaxed">
              Markham's trusted plumbing specialist since 2005.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-mist-400">Navigate</h4>
            <ul className="space-y-3 text-base text-mist-300">
              {['Services', 'About', 'Gallery', 'Location'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-mist-400">Hours</h4>
            <ul className="space-y-2 text-sm text-mist-300">
              <li className="flex justify-between"><span>Mon–Fri</span><span className="font-semibold text-white">7am–7pm</span></li>
              <li className="flex justify-between"><span>Saturday</span><span className="font-semibold text-rose-400">Closed</span></li>
              <li className="flex justify-between"><span>Sunday</span><span className="font-semibold text-white">9am–5pm</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-mist-400">Contact</h4>
            <a
              href={BUSINESS_INFO.phoneTel}
              className="inline-flex items-center gap-2 text-base text-white font-bold hover:text-mist-300 transition-colors duration-300"
            >
              <Phone className="w-5 h-5" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <p className="text-sm text-mist-400">Markham, ON & York Region</p>
            <button
              onClick={() => onOpenWizard()}
              className="inline-flex items-center gap-1.5 text-base font-bold text-mist-300 hover:text-white transition-colors duration-300"
            >
              <span>Online Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-mist-800/50 flex flex-col sm:flex-row items-center justify-between text-sm text-mist-500 gap-3">
          <p>© {new Date().getFullYear()} Aspen Drain. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <p>Serving Markham & York Region Since 2005</p>
            <a
              href="#/admin"
              className="hover:text-mist-300 transition-colors text-xs font-semibold text-mist-600 flex items-center gap-1"
            >
              <span>Owner Portal</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
