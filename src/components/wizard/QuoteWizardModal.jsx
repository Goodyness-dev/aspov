import React, { useState, useEffect } from 'react';
import { 
  X, ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle, Phone, 
  Calendar, ShieldCheck, Mail, User, PhoneCall, Sparkles, Clock, AlertCircle
} from 'lucide-react';
import { 
  BUSINESS_INFO, ALL_FIXTURES, INSPECTION_FIXTURES,
  TOILET_COUNT_OPTIONS, TOILET_TYPE_OPTIONS, TOILET_ISSUE_OPTIONS, TIMELINE_OPTIONS
} from '../../data/plumbingData';
import { submitQuoteRequest } from '../../services/orderService';

export default function QuoteWizardModal({ isOpen, onClose, initialService = null }) {
  // Wizard state
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // Form fields
  const [serviceType, setServiceType] = useState('Repair');
  const [fixture, setFixture] = useState('');
  const [customFixture, setCustomFixture] = useState('');
  
  // Toilet sub-steps
  const [toiletCount, setToiletCount] = useState('1');
  const [toiletTypes, setToiletTypes] = useState([]);
  const [toiletIssues, setToiletIssues] = useState([]);

  // Emergency & Details
  const [isEmergency, setIsEmergency] = useState(null);
  const [details, setDetails] = useState('');

  // Timeline
  const [timeline, setTimeline] = useState('asap');
  const [specificDate, setSpecificDate] = useState('');

  // Contact info
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');

  // Form error message
  const [error, setError] = useState('');

  // Update initial service when opened with a pre-selection
  useEffect(() => {
    if (initialService) {
      if (initialService.toLowerCase().includes('installation')) {
        setServiceType('Installation or Replacement');
      } else if (initialService.toLowerCase().includes('inspection')) {
        setServiceType('Inspection');
      } else {
        setServiceType('Repair');
      }
    }
  }, [initialService, isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Determine fixtures list based on service
  const availableFixtures = serviceType === 'Inspection' ? INSPECTION_FIXTURES : ALL_FIXTURES;

  // Multi-select toggle helper
  const toggleArrayItem = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // Validation before advancing
  const canGoNext = () => {
    setError('');
    if (step === 1) {
      if (!serviceType) {
        setError('Please select a service type.');
        return false;
      }
    }
    if (step === 2) {
      if (!fixture) {
        setError('Please select what needs attention.');
        return false;
      }
      if (fixture === 'Toilet' && toiletTypes.length === 0) {
        setError('Please select at least one toilet type.');
        return false;
      }
      if (fixture === 'Toilet' && toiletIssues.length === 0) {
        setError('Please select at least one toilet issue.');
        return false;
      }
    }
    if (step === 3) {
      if (isEmergency === null) {
        setError('Please indicate if this is an emergency.');
        return false;
      }
    }
    if (step === 5) {
      if (timeline === 'specific' && !specificDate) {
        setError('Please choose a preferred service date.');
        return false;
      }
    }
    if (step === 6) {
      if (!email || !email.includes('@') || !email.includes('.')) {
        setError('Please enter a valid email address.');
        return false;
      }
    }
    if (step === 7) {
      if (!firstName.trim()) {
        setError('Please enter your first name.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (canGoNext()) {
      setError('');
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setError('');
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!canGoNext()) return;

    setSubmitting(true);
    try {
      const payload = {
        serviceType,
        fixture: fixture === 'Other' && customFixture ? customFixture : fixture,
        toiletCount: fixture === 'Toilet' ? toiletCount : null,
        toiletTypes: fixture === 'Toilet' ? toiletTypes : null,
        toiletIssues: fixture === 'Toilet' ? toiletIssues : null,
        isEmergency: isEmergency === 'yes',
        details,
        timeline,
        specificDate: timeline === 'specific' ? specificDate : null,
        email,
        name: firstName,
        phone,
      };

      const result = await submitQuoteRequest(payload);
      setSubmitResult(result);
      setStep(9); // Step 9 is Success Confirmation
    } catch (err) {
      setError('Something went wrong submitting your request. Please call directly: (647) 522-1884');
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setSubmitResult(null);
    setFixture('');
    setIsEmergency(null);
    setDetails('');
    setEmail('');
    setFirstName('');
    setPhone('');
    setError('');
    onClose();
  };

  // Calculate progress percentage
  const totalSteps = 8;
  const progressPercent = Math.min(100, Math.round((step / totalSteps) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-navy-950/75 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Aspen Drain" className="w-9 h-9 object-contain rounded-md" />
            <div>
              <h2 className="text-base font-bold text-navy-950 leading-tight">Aspen Drain Quote Request</h2>
              <p className="text-xs text-slate-500">Free, no-obligation estimate in under 2 minutes</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (visible during steps 1-8) */}
        {step <= 8 && (
          <div className="w-full bg-slate-100 h-1.5 shrink-0">
            <div 
              className="bg-blue-600 h-1.5 transition-all duration-300 ease-out" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        )}

        {/* Body (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* STEP 1: Service Type */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 1 of 8</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950 mt-1">
                  What kind of plumbing service are you looking for?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Select the category that best matches your situation.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'Repair', label: 'Repair', desc: 'Fix an active leak, clog, noise, or malfunctioning fixture' },
                  { id: 'Installation or Replacement', label: 'Installation or Replacement', desc: 'Install new fixtures, replace aging equipment, or renovate' },
                  { id: 'Inspection', label: 'Inspection', desc: 'Drain camera scan, preventive checkup, or home diagnosis' },
                  { id: 'Other', label: 'Other', desc: 'Custom project or general plumbing consultation' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      serviceType === item.id
                        ? 'border-navy-900 bg-blue-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceType"
                      value={item.id}
                      checked={serviceType === item.id}
                      onChange={() => setServiceType(item.id)}
                      className="mt-1 w-4 h-4 text-navy-900 focus:ring-navy-800"
                    />
                    <div className="flex-1">
                      <span className="block text-base font-bold text-navy-950">{item.label}</span>
                      <span className="block text-xs text-slate-500 mt-0.5">{item.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Fixture Selector */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 2 of 8</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950 mt-1">
                  {serviceType === 'Repair' && 'What do you need to repair?'}
                  {serviceType === 'Installation or Replacement' && 'What do you need installed or replaced?'}
                  {serviceType === 'Inspection' && 'What do you need inspected?'}
                  {serviceType === 'Other' && 'Which fixture or area needs attention?'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Choose the primary fixture for your service.
                </p>
              </div>

              {/* Fixture Radio Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto p-1">
                {availableFixtures.map((fix) => (
                  <label
                    key={fix}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-sm font-semibold transition-all ${
                      fixture === fix
                        ? 'border-navy-900 bg-navy-900 text-white shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/70 text-slate-800'
                    }`}
                  >
                    <input
                      type="radio"
                      name="fixture"
                      value={fix}
                      checked={fixture === fix}
                      onChange={() => setFixture(fix)}
                      className="sr-only"
                    />
                    <span className="truncate">{fix}</span>
                  </label>
                ))}
              </div>

              {/* Custom fixture input if "Other" */}
              {fixture === 'Other' && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Please specify the item or area:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Outdoor hose bib, water softener, laundry tub"
                    value={customFixture}
                    onChange={(e) => setCustomFixture(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-800 focus:outline-none"
                  />
                </div>
              )}

              {/* DEEP TOILET SUB-FLOW (Specified in brief) */}
              {fixture === 'Toilet' && (
                <div className="p-5 bg-blue-50/60 rounded-xl border border-blue-200 space-y-5 animate-fadeIn">
                  <div className="flex items-center gap-2 text-navy-900 font-bold text-sm pb-2 border-b border-blue-200">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Toilet Details</span>
                  </div>

                  {/* 1. Toilet Count */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-2">
                      How many toilets need service?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TOILET_COUNT_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setToiletCount(opt)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            toiletCount === opt
                              ? 'bg-navy-900 text-white'
                              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Toilet Type (Multi-select) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-2">
                      What type of toilet? <span className="font-normal text-slate-500">(Select all that apply)</span>
                    </label>
                    <div className="space-y-1.5">
                      {TOILET_TYPE_OPTIONS.map((typeOpt) => (
                        <label
                          key={typeOpt}
                          className="flex items-center gap-2 text-xs text-slate-800 font-medium cursor-pointer p-1.5 rounded hover:bg-blue-100/50"
                        >
                          <input
                            type="checkbox"
                            checked={toiletTypes.includes(typeOpt)}
                            onChange={() => toggleArrayItem(toiletTypes, setToiletTypes, typeOpt)}
                            className="rounded text-navy-900 focus:ring-navy-800"
                          />
                          <span>{typeOpt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 3. Toilet Problem (Multi-select) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-2">
                      What's wrong with your toilet? <span className="font-normal text-slate-500">(Select all that apply)</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {TOILET_ISSUE_OPTIONS.map((issueOpt) => (
                        <label
                          key={issueOpt}
                          className="flex items-center gap-2 text-xs text-slate-800 font-medium cursor-pointer p-1.5 rounded hover:bg-blue-100/50"
                        >
                          <input
                            type="checkbox"
                            checked={toiletIssues.includes(issueOpt)}
                            onChange={() => toggleArrayItem(toiletIssues, setToiletIssues, issueOpt)}
                            className="rounded text-navy-900 focus:ring-navy-800"
                          />
                          <span>{issueOpt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Emergency Check */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 3 of 8</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950 mt-1">
                  Is this an emergency repair?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Active flooding, burst pipes, or sewage backups require immediate dispatch.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setIsEmergency('yes')}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    isEmergency === 'yes'
                      ? 'border-rose-600 bg-rose-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-rose-700 text-lg">Yes, Urgent Emergency</span>
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                  </div>
                  <p className="text-xs text-slate-600">
                    Water is currently leaking, overflowing, or needs shutoff ASAP.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setIsEmergency('no')}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    isEmergency === 'no'
                      ? 'border-navy-900 bg-blue-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-navy-950 text-lg">No, Standard Service</span>
                    <CheckCircle2 className="w-5 h-5 text-navy-900" />
                  </div>
                  <p className="text-xs text-slate-600">
                    Can be scheduled during normal hours at your convenience.
                  </p>
                </button>
              </div>

              {/* SPECIAL REQUIREMENT FROM BRIEF:
                  If Yes, surface the phone number immediately with a "Call Now" prompt
              */}
              {isEmergency === 'yes' && (
                <div className="p-5 bg-rose-100/70 border-2 border-rose-300 rounded-xl space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2 text-rose-900 font-extrabold text-sm">
                    <AlertCircle className="w-5 h-5 text-rose-700 shrink-0" />
                    <span>Active Emergency? Call Us Right Away!</span>
                  </div>
                  <p className="text-xs text-rose-800 leading-relaxed">
                    Don't wait for email processing. For active bursts or sewer emergencies, call our direct mobile dispatch line right now for immediate triage instructions.
                  </p>
                  <a
                    href={BUSINESS_INFO.phoneTel}
                    className="inline-flex items-center justify-center gap-2.5 w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm rounded-lg shadow-md transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Direct: {BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                  <p className="text-center text-[11px] text-rose-700 font-medium">
                    Or click "Continue" below to complete your quote request online.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Additional Details */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 4 of 8</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950 mt-1">
                  Any details you'd like to add?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Optional notes help us give you an exact estimate faster (e.g. brand, age, basement location).
                </p>
              </div>

              <div>
                <textarea
                  rows={5}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Describe your issue or installation requirements (e.g., 'Basement floor drain backing up when laundry runs', 'Want to replace old 1990s toilet with modern water-saver', etc.)..."
                  className="w-full p-4 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-navy-800 focus:outline-none resize-none"
                ></textarea>
                <div className="flex justify-between text-xs text-slate-600 mt-1">
                  <span>Optional</span>
                  <span>{details.length} characters</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Timeline */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 5 of 8</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950 mt-1">
                  When do you require this service?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Help us fit you into our Markham dispatch schedule.
                </p>
              </div>

              <div className="space-y-3">
                {TIMELINE_OPTIONS.map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      timeline === item.id
                        ? 'border-navy-900 bg-blue-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="timeline"
                      value={item.id}
                      checked={timeline === item.id}
                      onChange={() => setTimeline(item.id)}
                      className="w-4 h-4 text-navy-900 focus:ring-navy-800"
                    />
                    <span className="font-bold text-navy-950 text-sm">{item.label}</span>
                  </label>
                ))}
              </div>

              {/* Date picker if "Specific date(s)" selected */}
              {timeline === 'specific' && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 animate-fadeIn">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select your preferred date:
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={specificDate}
                    onChange={(e) => setSpecificDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-800 focus:outline-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 6: Email Address */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 6 of 8</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950 mt-1">
                  Where should we send quotes?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Your estimate and breakdown will be delivered here.
                </p>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="yourname@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl text-base focus:ring-2 focus:ring-navy-800 focus:outline-none"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-slate-500 italic pl-1">
                  "We won't share this email with businesses."
                </p>
              </div>
            </div>
          )}

          {/* STEP 7: Customer Name */}
          {step === 7 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 7 of 8</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950 mt-1">
                  What is your name?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Who should we address the quote to?
                </p>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl text-base focus:ring-2 focus:ring-navy-800 focus:outline-none"
                    autoFocus
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: Phone Number (Optional) */}
          {step === 8 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 8 of 8</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950 mt-1">
                  Phone number (optional)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Allows faster response time for urgent quotes.
                </p>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <PhoneCall className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="(647) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl text-base focus:ring-2 focus:ring-navy-800 focus:outline-none"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-slate-500 italic pl-1">
                  "Get texts and calls from pros about your project."
                </p>
              </div>

              {/* Summary Overview before final submission */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <p className="font-bold text-navy-950">Quote Request Summary:</p>
                <p>• <span className="font-semibold">Service:</span> {serviceType} — {fixture || 'General'}</p>
                {fixture === 'Toilet' && (
                  <p>• <span className="font-semibold">Toilet Details:</span> {toiletCount} toilet(s) • Issues: {toiletIssues.join(', ')}</p>
                )}
                <p>• <span className="font-semibold">Emergency:</span> {isEmergency === 'yes' ? '🚨 YES' : 'Standard'}</p>
                <p>• <span className="font-semibold">Contact:</span> {firstName} ({email})</p>
              </div>
            </div>
          )}

          {/* STEP 9: SUCCESS SCREEN */}
          {step === 9 && submitResult && (
            <div className="text-center py-6 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Request Received
                </span>
                <h3 className="text-2xl font-extrabold text-navy-950 mt-2">
                  Thank You, {firstName}!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
                  Your quote request has been logged successfully and sent to Aspen Drain.
                </p>
              </div>

              {/* Reference Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-sm mx-auto text-xs space-y-1.5 text-left">
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Reference Number:</span>
                  <span className="font-mono font-bold text-navy-900">{submitResult.referenceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-semibold text-slate-800">{serviceType} ({fixture})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Email:</span>
                  <span className="font-semibold text-slate-800">{email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Response Rate:</span>
                  <span className="font-bold text-emerald-600">100% Guaranteed</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl max-w-sm mx-auto text-xs text-navy-950">
                <p className="font-semibold mb-1">Need immediate assistance?</p>
                <p className="text-slate-600 mb-2">Our master plumber can be reached directly at:</p>
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={resetAndClose}
                  className="w-full max-w-sm mx-auto py-3 px-6 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-xl text-sm transition-colors shadow-md"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}

          {/* Validation Error Banner */}
          {error && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step <= 8 && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-slate-600 hover:text-navy-900 font-bold text-xs sm:text-sm hover:bg-slate-200/50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div></div>
            )}

            <div className="flex items-center gap-3">
              {step < 8 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg active:scale-95"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Free Quote</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
