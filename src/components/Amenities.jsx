import React from 'react';
import { Check, X } from 'lucide-react';
import { AMENITIES } from '../data/plumbingData';

export default function Amenities() {
  return (
    <section className="py-14 bg-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-10">
          <h3 className="text-xl font-bold text-mist-950 mb-6">Features & Payment</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {AMENITIES.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-4 rounded-2xl text-base font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                  item.available
                    ? 'bg-mist-50/80 text-mist-800'
                    : 'bg-mist-50/40 text-mist-400'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    item.available
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-rose-100 text-rose-500'
                  }`}
                >
                  {item.available ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </div>
                <span className={item.available ? 'font-semibold' : 'line-through'}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
