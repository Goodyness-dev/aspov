import React from 'react';
import { ShieldCheck, PhoneCall, MessageSquare, BadgeCheck, MapPin } from 'lucide-react';
import { TRUST_BADGES } from '../data/plumbingData';

const iconMap = {
  'shield-check': ShieldCheck,
  'phone-call': PhoneCall,
  'message-square': MessageSquare,
  'badge-check': BadgeCheck,
  'map-pin': MapPin,
};

export default function TrustBadges() {
  return (
    <section className="py-10 bg-mist-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {TRUST_BADGES.map((badge, idx) => {
            const Icon = iconMap[badge.icon] || ShieldCheck;
            return (
              <div key={idx} className="flex items-center gap-3 text-mist-700 group">
                <div className="w-11 h-11 rounded-xl glass-card flex items-center justify-center group-hover:-translate-y-0.5 transition-all duration-300">
                  <Icon className="w-5 h-5 text-mist-600" />
                </div>
                <span className="text-base font-semibold text-mist-800">{badge.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
