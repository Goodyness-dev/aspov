import React from 'react';
import { Quote, ArrowRight, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/plumbingData';

export default function About({ onOpenWizard }) {
  return (
    <section id="about" className="py-24 bg-mist-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left: Image with glassmorphism overlay */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-mist-900/15 ring-1 ring-white/20">
              <img
                src="/interiorlens-faucet-8372443.jpg"
                alt="Premium bathroom with elegant fixtures"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mist-950/20 via-transparent to-transparent" />
            </div>

            {/* Glassmorphism card overlay */}
            <div className="absolute -bottom-6 right-4 sm:right-8 glass-strong rounded-2xl p-6 shadow-xl max-w-[260px]">
              <p className="text-base font-bold text-mist-950 mb-1">Locally Owned</p>
              <p className="text-sm text-mist-700">Serving Markham & York Region since 2005</p>
            </div>
          </div>

          {/* Right: Minimal text content */}
          <div className="space-y-7">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-mist-950 tracking-tight leading-tight">
              A Plumber You Can Trust
            </h2>

            {/* Owner Quote */}
            <div className="relative glass-card border-l-4 border-mist-500 p-6 rounded-r-2xl">
              <Quote className="w-7 h-7 text-mist-300/60 absolute top-4 right-4" />
              <p className="text-base text-mist-800 italic leading-relaxed">
                "{BUSINESS_INFO.ownerQuote}"
              </p>
              <p className="text-sm font-bold text-mist-600 mt-3">Owner & Lead Specialist</p>
            </div>

            {/* Quick facts grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '22+ Years', desc: 'Experience' },
                { label: '100%', desc: 'Response Rate' },
                { label: 'Free', desc: 'Estimates' },
                { label: 'Local', desc: 'Markham, ON' },
              ].map((fact, i) => (
                <div key={i} className="glass-card rounded-2xl p-5 text-center hover:-translate-y-0.5 transition-all duration-300">
                  <span className="block text-2xl font-extrabold text-mist-950">{fact.label}</span>
                  <span className="text-sm text-mist-600">{fact.desc}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onOpenWizard()}
                className="flex-1 inline-flex items-center justify-center gap-2 py-4 px-7 rounded-2xl bg-mist-950 hover:bg-mist-800 text-white font-bold text-base transition-all duration-300 shadow-lg shadow-mist-950/20 hover:shadow-xl"
              >
                <span>Request Quote</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href={BUSINESS_INFO.phoneTel}
                className="flex-1 inline-flex items-center justify-center gap-2 py-4 px-7 rounded-2xl glass-strong hover:bg-white/80 text-mist-900 font-bold text-base transition-all duration-300"
              >
                <Phone className="w-5 h-5 text-mist-500" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
