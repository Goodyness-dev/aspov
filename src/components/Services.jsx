import React from 'react';
import { Wrench, Hammer, Search, ArrowRight } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/plumbingData';

const iconMap = {
  repair: Wrench,
  installation: Hammer,
  inspection: Search
};

const imageMap = {
  repair: '/msalguero-faucet-943297.jpg',
  installation: '/interiorlens-faucet-8372443.jpg',
  inspection: '/timur-shakerzianov-wzIjLL4KB-4-unsplash.jpg',
};

export default function Services({ onSelectService }) {
  return (
    <section id="services" className="py-24 bg-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-mist-950 mb-4 tracking-tight">
            Our Services
          </h2>
          <p className="text-mist-600 text-lg">
            Repair, install, or inspect — we handle it all.
          </p>
        </div>

        {/* Service Cards with real images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICE_CATEGORIES.map((service) => {
            const Icon = iconMap[service.id] || Wrench;
            const imageSrc = imageMap[service.id];
            return (
              <div
                key={service.id}
                className="glass-card rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-mist-400/20 hover:-translate-y-1 transition-all duration-500 group flex flex-col"
              >
                {/* Image */}
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img
                    src={imageSrc}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mist-950/40 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 glass rounded-full px-3.5 py-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-mist-800">{service.badge}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 glass rounded-xl p-2.5">
                    <Icon className="w-6 h-6 text-mist-800" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-mist-950 mb-3">
                      {service.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.popularFixtures.slice(0, 4).map((fixture, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 rounded-lg bg-mist-100 text-mist-700 font-medium"
                        >
                          {fixture}
                        </span>
                      ))}
                      {service.popularFixtures.length > 4 && (
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-mist-100 text-mist-500 font-medium">
                          +{service.popularFixtures.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectService(service.name)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-mist-950 hover:bg-mist-800 text-white font-bold text-base transition-all duration-300 shadow-lg shadow-mist-950/15 group-hover:shadow-xl"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
