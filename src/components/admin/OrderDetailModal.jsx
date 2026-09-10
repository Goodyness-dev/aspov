import React, { useState } from 'react';
import { 
  X, Phone, Mail, Clock, AlertTriangle, Send, Calendar, CheckCircle2, 
  DollarSign, MessageSquare, History, User, Check, ShieldAlert
} from 'lucide-react';
import { addOrderReply, updateOrderStatus } from '../../services/orderService';
import { sendCustomerQuoteEmail } from '../../services/emailService';

export default function OrderDetailModal({ order, isOpen, onClose, onOrderUpdated }) {
  if (!isOpen || !order) return null;

  const [quoteAmount, setQuoteAmount] = useState('');
  const [quoteMessage, setQuoteMessage] = useState('');
  const [estimatedSchedule, setEstimatedSchedule] = useState('');
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [status, setStatus] = useState(order.status || 'new');

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    const updated = updateOrderStatus(order.referenceId, newStatus);
    if (onOrderUpdated) onOrderUpdated(updated);
  };

  const handleSendQuote = async (e) => {
    e.preventDefault();
    setFeedback(null);

    if (!quoteAmount.trim()) {
      setFeedback({ type: 'error', message: 'Please specify a quote amount or estimate range.' });
      return;
    }

    setSending(true);

    const quoteData = {
      amount: quoteAmount.trim(),
      message: quoteMessage.trim() || 'Thank you for choosing Aspen Drain. Please find our estimated quote above.',
      estimatedSchedule: estimatedSchedule.trim() || 'To be scheduled upon your confirmation',
      sentVia: 'email'
    };

    // 1. Dispatch Email to Customer via EmailJS
    const emailResult = await sendCustomerQuoteEmail(order, quoteData);

    // 2. Add reply to order history and update status to 'quoted'
    const updatedOrder = addOrderReply(order.referenceId, {
      ...quoteData,
      emailStatus: emailResult.success ? (emailResult.simulated ? 'simulated' : 'delivered') : 'failed'
    });

    setSending(false);

    if (emailResult.success) {
      setFeedback({
        type: 'success',
        message: emailResult.simulated 
          ? `Quote recorded! Simulated dispatch (Add EmailJS keys in Settings to deliver directly to ${order.customer?.email}).`
          : `Quote dispatched directly to ${order.customer?.email}!`
      });
      setQuoteAmount('');
      setQuoteMessage('');
      setEstimatedSchedule('');
      setStatus('quoted');
      if (onOrderUpdated) onOrderUpdated(updatedOrder);
    } else {
      setFeedback({
        type: 'error',
        message: `Quote saved to dashboard, but email failed: ${emailResult.error}`
      });
      if (onOrderUpdated) onOrderUpdated(updatedOrder);
    }
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleString('en-CA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-mist-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden border border-mist-200">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-mist-950 to-mist-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">Order #{order.referenceId}</span>
              {order.isEmergency && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500 text-white flex items-center gap-1 animate-pulse">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Emergency</span>
                </span>
              )}
            </div>
            <p className="text-xs text-mist-300 mt-1">
              Received {formatDateTime(order.timestamp)}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-mist-50/50">
          
          {/* Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-mist-200 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-mist-500">Current Status:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                status === 'new' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                status === 'quoted' ? 'bg-sky-100 text-sky-900 border border-sky-300' :
                status === 'in_progress' ? 'bg-indigo-100 text-indigo-900 border border-indigo-300' :
                status === 'completed' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                'bg-gray-100 text-gray-800'
              }`}>
                {status.replace('_', ' ')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-mist-600">Change Status:</span>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="text-xs font-bold px-3 py-1.5 rounded-xl border border-mist-300 bg-white text-mist-900 focus:outline-none focus:ring-2 focus:ring-mist-950"
              >
                <option value="new">New</option>
                <option value="quoted">Quoted</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="declined">Declined</option>
              </select>
            </div>
          </div>

          {/* Customer & Service Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Customer Box */}
            <div className="p-6 rounded-2xl bg-white border border-mist-200 shadow-sm space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-mist-400 flex items-center gap-1.5">
                <User className="w-4 h-4 text-mist-600" />
                <span>Customer Information</span>
              </h3>
              <div>
                <p className="text-xl font-extrabold text-mist-950">{order.customer?.name || 'Customer'}</p>
                <div className="mt-3 space-y-2">
                  <a
                    href={`tel:${order.customer?.phone?.replace(/\D/g, '')}`}
                    className="flex items-center gap-2 text-sm font-semibold text-mist-700 hover:text-mist-950 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-mist-500" />
                    <span>{order.customer?.phone || 'No phone provided'}</span>
                  </a>
                  <a
                    href={`mailto:${order.customer?.email}`}
                    className="flex items-center gap-2 text-sm font-semibold text-mist-700 hover:text-mist-950 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-mist-500" />
                    <span>{order.customer?.email || 'No email provided'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Service & Timeline Box */}
            <div className="p-6 rounded-2xl bg-white border border-mist-200 shadow-sm space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-mist-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-mist-600" />
                <span>Service & Schedule</span>
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-mist-500 font-medium">Category: </span>
                  <span className="font-bold text-mist-900">{order.serviceType}</span>
                </div>
                <div>
                  <span className="text-mist-500 font-medium">Fixture / Area: </span>
                  <span className="font-bold text-mist-900">{order.fixture}</span>
                </div>
                <div>
                  <span className="text-mist-500 font-medium">Requested Timeline: </span>
                  <span className="font-bold text-mist-900">
                    {order.timeline === 'asap' ? '⚡ As soon as possible' :
                     order.timeline === 'specific' ? `📅 Specific Date: ${order.specificDate}` :
                     '🕒 Flexible'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Fixture Diagnostics (Special Toilet Details or Notes) */}
          {order.toiletDetails && (
            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-2">
                <span>🚽 Toilet Detailed Diagnostics</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-amber-800 font-semibold block text-xs">Quantity:</span>
                  <span className="font-bold text-mist-950">{order.toiletDetails.count} toilet(s)</span>
                </div>
                <div>
                  <span className="text-amber-800 font-semibold block text-xs">Type(s):</span>
                  <span className="font-bold text-mist-950">{(order.toiletDetails.types || []).join(', ') || 'None specified'}</span>
                </div>
                <div>
                  <span className="text-amber-800 font-semibold block text-xs">Identified Issue(s):</span>
                  <span className="font-bold text-mist-950">{(order.toiletDetails.issues || []).join(', ') || 'None specified'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Customer Job Notes */}
          <div className="p-6 rounded-2xl bg-white border border-mist-200 shadow-sm space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-mist-400">Customer Notes</h3>
            <p className="text-sm text-mist-800 bg-mist-100/50 p-4 rounded-xl italic">
              "{order.details || 'No additional details provided by customer.'}"
            </p>
          </div>

          {/* Feedback message banner */}
          {feedback && (
            <div className={`p-4 rounded-2xl text-sm flex items-start gap-3 ${
              feedback.type === 'success' 
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' 
                : 'bg-rose-50 border border-rose-200 text-rose-900'
            }`}>
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">{feedback.message}</div>
            </div>
          )}

          {/* SEND QUOTE & REPLY FORM */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-mist-950/10 shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-mist-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-mist-950 flex items-center gap-2">
                  <Send className="w-5 h-5 text-mist-600" />
                  <span>Send Quote & Message to Customer</span>
                </h3>
                <p className="text-xs text-mist-500 mt-0.5">
                  Submitting will automatically send an email to <span className="font-bold text-mist-700">{order.customer?.email}</span> via EmailJS.
                </p>
              </div>
            </div>

            <form onSubmit={handleSendQuote} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-mist-800 uppercase tracking-wider mb-2">
                    Estimated Quote Amount *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-mist-400">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={quoteAmount}
                      onChange={(e) => setQuoteAmount(e.target.value)}
                      placeholder="e.g. $220 - $280 CAD or $180"
                      className="w-full pl-9 pr-4 py-3 rounded-2xl bg-mist-50 border border-mist-200 text-mist-950 placeholder-mist-400 focus:outline-none focus:ring-2 focus:ring-mist-950 focus:bg-white text-sm font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-mist-800 uppercase tracking-wider mb-2">
                    Estimated Availability / Schedule
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-mist-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={estimatedSchedule}
                      onChange={(e) => setEstimatedSchedule(e.target.value)}
                      placeholder="e.g. Tomorrow at 10:00 AM or Flexible"
                      className="w-full pl-9 pr-4 py-3 rounded-2xl bg-mist-50 border border-mist-200 text-mist-950 placeholder-mist-400 focus:outline-none focus:ring-2 focus:ring-mist-950 focus:bg-white text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-mist-800 uppercase tracking-wider mb-2">
                  Quote Message / Scope Breakdown
                </label>
                <textarea
                  rows={4}
                  value={quoteMessage}
                  onChange={(e) => setQuoteMessage(e.target.value)}
                  placeholder="Hi Sarah, thank you for reaching out to Aspen Drain. Based on your description, we can snake the drain and inspect the toilet seals. Price includes parts and labour..."
                  className="w-full p-4 rounded-2xl bg-mist-50 border border-mist-200 text-mist-950 placeholder-mist-400 focus:outline-none focus:ring-2 focus:ring-mist-950 focus:bg-white text-sm"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-mist-500">
                  Customer will receive quote with your phone <code className="font-mono text-mist-700">(647) 522-1884</code>.
                </p>

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-mist-950 hover:bg-mist-800 text-white font-bold text-sm shadow-xl shadow-mist-950/20 transition-all duration-300 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-mist-300" />
                  <span>{sending ? 'Sending Quote...' : 'Dispatch Quote via Email'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* QUOTE & REPLY HISTORY THREAD */}
          {Array.isArray(order.replies) && order.replies.length > 0 && (
            <div className="p-6 rounded-3xl bg-white border border-mist-200 shadow-sm space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-mist-500 flex items-center gap-2">
                <History className="w-4 h-4 text-mist-700" />
                <span>Quote History ({order.replies.length})</span>
              </h3>

              <div className="space-y-4 divide-y divide-mist-100">
                {order.replies.map((reply, i) => (
                  <div key={reply.id || i} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-mist-950 text-sm">Quote: {reply.amount}</span>
                      <span className="text-mist-400">{formatDateTime(reply.timestamp)}</span>
                    </div>
                    {reply.estimatedSchedule && (
                      <p className="text-xs text-mist-600 font-semibold">
                        Suggested Time: {reply.estimatedSchedule}
                      </p>
                    )}
                    <p className="text-sm text-mist-800 bg-mist-50 p-3.5 rounded-xl">
                      {reply.message}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-mist-500">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        Dispatched via Email
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-white border-t border-mist-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href={`tel:${order.customer?.phone?.replace(/\D/g, '')}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-mist-100 hover:bg-mist-200 text-mist-800 text-xs font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-mist-600" />
              <span>Call Customer</span>
            </a>
            <a
              href={`mailto:${order.customer?.email}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-mist-100 hover:bg-mist-200 text-mist-800 text-xs font-bold transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-mist-600" />
              <span>Email Customer</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl glass hover:bg-mist-100 text-mist-800 text-sm font-bold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
