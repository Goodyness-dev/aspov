import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';
import { BUSINESS_INFO, HOURS } from '../data/plumbingData';

export default function HoursAndLocation({ onOpenWizard }) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayName = days[new Date().getDay()];

  return (
    <section id="location" className="py-24 bg-mist-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-mist-950 mb-4 tracking-tight">
            Hours & Location
          </h2>
          <p className="text-mist-600 text-lg">
            Serving Markham, ON & surrounding York Region.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Hours Card */}
          <div className="lg:col-span-2 glass-card rounded-3xl p-7 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-mist-200/80 flex items-center justify-center">
                <Clock className="w-6 h-6 text-mist-700" />
              </div>
              <h3 className="text-xl font-bold text-mist-950">Hours</h3>
            </div>

            <div className="space-y-0 divide-y divide-mist-200/50">
              {HOURS.map((h, i) => {
                const isToday = h.day === currentDayName;
                const isClosed = h.hours.toLowerCase().includes('closed');
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between py-3 text-base ${
                      isToday ? 'font-semibold' : ''
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={isToday ? 'text-mist-950 font-bold' : 'text-mist-700'}>
                        {h.day}
                      </span>
                      {isToday && (
                        <span className="text-[10px] uppercase font-extrabold tracking-wider bg-mist-950 text-white px-2 py-0.5 rounded-full">
                          Today
                        </span>
                      )}
                    </span>
                    <span className={isClosed ? 'text-rose-500 font-semibold' : 'text-mist-800 font-medium'}>
                      {h.hours}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-5 border-t border-mist-200/50 space-y-3">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-mist-950 hover:bg-mist-800 text-white font-bold text-base rounded-2xl transition-all duration-300 shadow-lg shadow-mist-950/15"
              >
                <Phone className="w-5 h-5" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
              <button
                onClick={() => onOpenWizard()}
                className="flex items-center justify-center w-full py-3 glass-strong hover:bg-white/80 text-mist-800 font-bold text-base rounded-2xl transition-all duration-300"
              >
                Request Free Quote
              </button>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3 glass-card rounded-3xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-mist-200/80 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-mist-700" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-mist-950">Service Area</h3>
                <p className="text-sm text-mist-500">Markham, ON (York Region)</p>
              </div>
            </div>
            <div className="w-full h-80 sm:h-96">
              <iframe
                title="Aspen Drain Service Area Markham ON"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Markham,+ON,+Canada&t=&z=12&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
