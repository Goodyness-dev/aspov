import React from 'react';
import { ArrowRight, Phone, Award, Clock, Shield } from 'lucide-react';
import { BUSINESS_INFO } from '../data/plumbingData';

export default function Hero({ onOpenWizard }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-mist-100 via-mist-50 to-mist-200 pt-10 pb-20 lg:pt-20 lg:pb-28">
      {/* Subtle decorative circles */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-mist-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-mist-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-mist-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left: Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-mist-700 text-sm font-semibold">
              <Award className="w-4 h-4 text-mist-500" />
              <span>Trusted Since 2005</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-mist-950">
              Expert Drain &
              <br />
              <span className="text-mist-500">Plumbing</span> Service
            </h1>

            <p className="text-lg text-mist-700 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              22 years of trusted residential plumbing in Markham & York Region.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onOpenWizard()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-mist-950 hover:bg-mist-800 text-white font-bold text-base shadow-xl shadow-mist-950/25 transform hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href={BUSINESS_INFO.phoneTel}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl glass-strong hover:bg-white/80 text-mist-900 font-bold text-base transition-all duration-300"
              >
                <Phone className="w-5 h-5 text-mist-500" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* Floating Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-4">
              <div className="glass-card rounded-2xl px-6 py-4 text-center animate-float">
                <span className="block text-3xl font-extrabold text-mist-950">22+</span>
                <span className="text-sm text-mist-600 font-medium">Years</span>
              </div>
              <div className="glass-card rounded-2xl px-6 py-4 text-center animate-float-delayed">
                <span className="block text-3xl font-extrabold text-mist-950">100%</span>
                <span className="text-sm text-mist-600 font-medium">Response</span>
              </div>
              <div className="glass-card rounded-2xl px-6 py-4 text-center animate-float">
                <span className="block text-3xl font-extrabold text-mist-950">Free</span>
                <span className="text-sm text-mist-600 font-medium">Estimates</span>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-mist-900/20 ring-1 ring-white/20">
              <img
                src="/jacek-dylag-Vve7XkiUq_Y-unsplash.jpg"
                alt="Professional plumbing - water flowing from chrome faucet"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-mist-950/30 via-transparent to-transparent" />
            </div>

            {/* Floating glass card overlay */}
            <div className="absolute -bottom-6 -left-4 sm:left-4 glass-strong rounded-2xl p-5 shadow-xl max-w-[240px] animate-float-delayed">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-mist-200/80 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-mist-700" />
                </div>
                <div>
                  <p className="text-sm font-bold text-mist-950">Available Now</p>
                  <p className="text-xs text-mist-600">Mon-Fri 7am-7pm</p>
                </div>
              </div>
            </div>

            {/* Another floating card - top right */}
            <div className="absolute -top-4 -right-2 sm:right-4 glass-strong rounded-2xl px-5 py-3.5 shadow-xl animate-float">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-bold text-mist-950">Locally Owned</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
