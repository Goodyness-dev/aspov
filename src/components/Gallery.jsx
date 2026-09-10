import React from 'react';
import { ExternalLink } from 'lucide-react';

const JOBS = [
  { id: 1, title: 'Main Drain Snaking', category: 'Drain Cleaning', tag: 'Drain Specialist', image: '/image.jpg' },
  { id: 2, title: 'Sump Pump Replacement', category: 'Installation', tag: 'Flood Prevention', image: '/img 2.jpg' },
  { id: 3, title: 'Copper Pipe Repair', category: 'Emergency Repair', tag: 'Emergency Fix', image: '/marian-florinel-condruz-C-oYJoIfgCs-unsplash.jpg' },
  { id: 4, title: 'Kitchen Sink Install', category: 'Installation', tag: 'Kitchen Plumbing', image: '/rose-galloway-green-MzPnzK3prTU-unsplash.jpg' },
  { id: 5, title: 'Toilet Installation', category: 'Fixture Replacement', tag: 'Water Saving', image: '/azka-rayhansyah-DByY8MbE9OE-unsplash.jpg' },
  { id: 6, title: 'Sewer Camera Inspection', category: 'Inspection', tag: 'Diagnostic', image: '/jackmac34-plumbing-2489860.jpg' },
];

export default function Gallery({ onOpenWizard }) {
  return (
    <section id="gallery" className="py-24 bg-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-mist-950 mb-4 tracking-tight">
            Our Work
          </h2>
          <p className="text-mist-600 text-lg">
            Real projects completed across Markham homes.
          </p>
        </div>

        {/* Gallery Grid with real images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {JOBS.map((job) => (
            <div
              key={job.id}
              className="group glass-card rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-mist-400/20 hover:-translate-y-1 transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={job.image}
                  alt={job.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mist-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute top-3 left-3 glass rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-mist-800">
                  {job.tag}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <span className="text-xs font-semibold text-mist-500 uppercase tracking-wider">{job.category}</span>
                <h3 className="text-lg font-bold text-mist-950 mt-1.5 mb-4">{job.title}</h3>
                <button
                  onClick={() => onOpenWizard(job.category)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-mist-600 hover:text-mist-950 transition-colors duration-300"
                >
                  <span>Get Similar Quote</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onOpenWizard()}
            className="inline-flex items-center gap-2 px-10 py-4 bg-mist-950 hover:bg-mist-800 text-white text-base font-bold rounded-2xl shadow-xl shadow-mist-950/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Start Your Quote Request
          </button>
        </div>

      </div>
    </section>
  );
}
