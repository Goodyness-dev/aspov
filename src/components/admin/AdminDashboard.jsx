import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, AlertTriangle, Clock, CheckCircle2, ChevronRight, 
  Phone, Mail, Calendar, Trash2, Eye, RefreshCw, Send, ShieldAlert,
  Inbox, Sparkles, MessageSquare, Bot
} from 'lucide-react';
import AdminNavbar from './AdminNavbar';
import OrderDetailModal from './OrderDetailModal';
import AdminSettingsModal from './AdminSettingsModal';
import { getOrders, deleteOrder, updateOrderStatus } from '../../services/orderService';
import { getAppConfig } from '../../services/configService';

export default function AdminDashboard({ onLogout }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // Filters & search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'new' | 'quoted' | 'in_progress' | 'completed'
  const [emergencyOnly, setEmergencyOnly] = useState(false);

  // Load orders
  const refreshOrders = () => {
    const data = getOrders();
    setOrders(data);
    if (selectedOrder) {
      const refreshedSelected = data.find(o => o.referenceId === selectedOrder.referenceId);
      if (refreshedSelected) setSelectedOrder(refreshedSelected);
    }
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  const config = getAppConfig();
  const hasTelegramConfigured = !!(config.telegramBotToken && config.telegramChatId);
  const hasEmailJSConfigured = !!(config.emailjsServiceId && config.emailjsTemplateId && config.emailjsPublicKey);

  // Metrics
  const totalCount = orders.length;
  const newCount = orders.filter(o => o.status === 'new').length;
  const emergencyCount = orders.filter(o => o.isEmergency).length;
  const quotedCount = orders.filter(o => o.status === 'quoted').length;
  const completedCount = orders.filter(o => o.status === 'completed').length;

  // Filtered orders
  const filteredOrders = orders.filter(order => {
    // Status filter
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    
    // Emergency filter
    if (emergencyOnly && !order.isEmergency) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const refMatch = order.referenceId?.toLowerCase().includes(q);
      const nameMatch = order.customer?.name?.toLowerCase().includes(q);
      const emailMatch = order.customer?.email?.toLowerCase().includes(q);
      const phoneMatch = order.customer?.phone?.toLowerCase().includes(q);
      const fixtureMatch = order.fixture?.toLowerCase().includes(q);
      const serviceMatch = order.serviceType?.toLowerCase().includes(q);
      return refMatch || nameMatch || emailMatch || phoneMatch || fixtureMatch || serviceMatch;
    }

    return true;
  });

  const handleDelete = (e, refId) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete order #${refId}?`)) {
      deleteOrder(refId);
      refreshOrders();
      if (selectedOrder?.referenceId === refId) {
        setSelectedOrder(null);
      }
    }
  };

  const formatRelativeTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return date.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-mist-100/60 flex flex-col selection:bg-mist-950 selection:text-white">
      
      {/* Top Navbar */}
      <AdminNavbar
        newOrdersCount={newCount}
        onOpenSettings={() => setSettingsOpen(true)}
        onLogout={onLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header & Quick Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-mist-950 tracking-tight">
              Quote & Order Dispatch
            </h1>
            <p className="text-sm text-mist-600 mt-1">
              Real-time inbound quote requests from Aspen Drain website.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshOrders}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass hover:bg-white text-mist-800 text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              <RefreshCw className="w-4 h-4 text-mist-600" />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => setSettingsOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-mist-950 hover:bg-mist-800 text-white text-xs sm:text-sm font-bold shadow-md shadow-mist-950/20 transition-all"
            >
              <Bot className="w-4 h-4 text-mist-300" />
              <span>Setup Alerts</span>
            </button>
          </div>
        </div>

        {/* Integration Notification Banners (if not configured) */}
        {(!hasTelegramConfigured || !hasEmailJSConfigured) && (
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-mist-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-mist-950">Complete Your Automated Notifications</h4>
                <p className="text-xs text-mist-600 mt-0.5">
                  {!hasTelegramConfigured && !hasEmailJSConfigured
                    ? 'Connect Telegram to receive instant mobile alerts when customers submit inquiries, and connect EmailJS to send quote replies directly to customers.'
                    : !hasTelegramConfigured
                    ? 'Connect Telegram Bot to get instant push alerts on your phone whenever an emergency or quote is requested.'
                    : 'Connect EmailJS so that replying to orders will automatically email customer quotes.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSettingsOpen(true)}
              className="px-4 py-2 rounded-xl bg-mist-900 hover:bg-mist-800 text-white text-xs font-bold shrink-0 transition-colors"
            >
              Configure in Settings
            </button>
          </div>
        )}

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* New / Action Required */}
          <div 
            onClick={() => setStatusFilter('new')}
            className={`p-6 rounded-3xl glass-card cursor-pointer transition-all duration-300 ${
              statusFilter === 'new' ? 'ring-2 ring-mist-950 shadow-xl' : 'hover:-translate-y-0.5'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-mist-500 uppercase tracking-wider mb-2">
              <span>New Inquiries</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-mist-950">{newCount}</div>
            <p className="text-xs text-amber-800 font-semibold mt-1">Pending your quote response</p>
          </div>

          {/* Emergency Inquiries */}
          <div 
            onClick={() => setEmergencyOnly(!emergencyOnly)}
            className={`p-6 rounded-3xl glass-card cursor-pointer transition-all duration-300 ${
              emergencyOnly ? 'ring-2 ring-rose-600 shadow-xl' : 'hover:-translate-y-0.5'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-mist-500 uppercase tracking-wider mb-2">
              <span>Emergencies</span>
              <AlertTriangle className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-rose-600">{emergencyCount}</div>
            <p className="text-xs text-rose-700 font-semibold mt-1">
              {emergencyOnly ? 'Filtering emergencies' : 'Requires fast action'}
            </p>
          </div>

          {/* Quoted Orders */}
          <div 
            onClick={() => setStatusFilter('quoted')}
            className={`p-6 rounded-3xl glass-card cursor-pointer transition-all duration-300 ${
              statusFilter === 'quoted' ? 'ring-2 ring-mist-950 shadow-xl' : 'hover:-translate-y-0.5'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-mist-500 uppercase tracking-wider mb-2">
              <span>Quoted</span>
              <Send className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-mist-950">{quotedCount}</div>
            <p className="text-xs text-sky-700 font-semibold mt-1">Quote sent to customer</p>
          </div>

          {/* Total Handled */}
          <div 
            onClick={() => { setStatusFilter('all'); setEmergencyOnly(false); }}
            className={`p-6 rounded-3xl glass-card cursor-pointer transition-all duration-300 ${
              statusFilter === 'all' && !emergencyOnly ? 'ring-2 ring-mist-950 shadow-xl' : 'hover:-translate-y-0.5'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-mist-500 uppercase tracking-wider mb-2">
              <span>Total Inquiries</span>
              <Inbox className="w-4 h-4 text-mist-500" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-mist-950">{totalCount}</div>
            <p className="text-xs text-mist-600 font-semibold mt-1">{completedCount} completed jobs</p>
          </div>

        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="p-4 sm:p-5 rounded-3xl glass-strong border border-white/60 space-y-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-mist-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by customer name, ref #, phone, email, or fixture (e.g. toilet, sump pump)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-mist-200 text-mist-950 placeholder-mist-400 focus:outline-none focus:ring-2 focus:ring-mist-950 text-sm font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-mist-400 hover:text-mist-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Emergency Toggle Pill */}
            <button
              onClick={() => setEmergencyOnly(!emergencyOnly)}
              className={`w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                emergencyOnly
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                  : 'bg-white border border-mist-200 text-mist-700 hover:bg-mist-50'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Emergency Only</span>
            </button>

          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-mist-200/50">
            <span className="text-xs font-bold text-mist-500 uppercase tracking-wider mr-1">Status:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'new', label: 'New Inquiries' },
              { id: 'quoted', label: 'Quoted' },
              { id: 'in_progress', label: 'In Progress' },
              { id: 'completed', label: 'Completed' },
              { id: 'declined', label: 'Declined' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === tab.id
                    ? 'bg-mist-950 text-white shadow-sm'
                    : 'bg-white/70 hover:bg-white text-mist-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ORDERS LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-mist-500">
              Showing {filteredOrders.length} of {orders.length} order{orders.length === 1 ? '' : 's'}
            </span>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="p-16 rounded-3xl glass-card text-center space-y-4">
              <Inbox className="w-12 h-12 text-mist-400 mx-auto" />
              <h3 className="text-lg font-bold text-mist-950">No orders match your filter</h3>
              <p className="text-sm text-mist-500 max-w-sm mx-auto">
                Try clearing your search query or switching the status filter to see other orders.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setStatusFilter('all'); setEmergencyOnly(false); }}
                className="px-5 py-2.5 rounded-xl bg-mist-950 text-white text-xs font-bold shadow transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredOrders.map((order) => {
                const isNew = order.status === 'new';
                const hasReplies = Array.isArray(order.replies) && order.replies.length > 0;

                return (
                  <div
                    key={order.referenceId}
                    onClick={() => setSelectedOrder(order)}
                    className={`group glass-card rounded-3xl p-5 sm:p-6 cursor-pointer border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
                      isNew 
                        ? 'border-amber-300/80 bg-gradient-to-r from-amber-50/40 via-white to-white ring-1 ring-amber-200' 
                        : 'border-white/80 hover:border-mist-300'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      {/* Left: Ref, Status, Customer */}
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 pt-0.5">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                            order.status === 'new' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                            order.status === 'quoted' ? 'bg-sky-100 text-sky-900 border border-sky-300' :
                            order.status === 'in_progress' ? 'bg-indigo-100 text-indigo-900 border border-indigo-300' :
                            order.status === 'completed' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status.replace('_', ' ')}
                          </span>
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-extrabold text-base text-mist-950">
                              {order.customer?.name || 'Customer'}
                            </span>
                            <span className="text-xs font-mono font-bold text-mist-500">
                              #{order.referenceId}
                            </span>
                            {order.isEmergency && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                <span>Emergency</span>
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-mist-600">
                            <span className="font-semibold text-mist-900">
                              {order.serviceType} — <span className="font-extrabold text-mist-950">{order.fixture}</span>
                            </span>
                            {order.toiletDetails && (
                              <span className="text-amber-800 font-semibold bg-amber-100/60 px-2 py-0.5 rounded-md">
                                🚽 {order.toiletDetails.count} toilet(s)
                              </span>
                            )}
                            <span className="text-mist-400">•</span>
                            <span>Requested: {order.timeline === 'asap' ? '⚡ ASAP' : order.timeline}</span>
                          </div>

                          {/* Customer note preview */}
                          {order.details && order.details !== 'None provided' && (
                            <p className="text-xs text-mist-600 mt-2 line-clamp-1 italic bg-mist-50/80 px-2.5 py-1 rounded-lg">
                              "{order.details}"
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right: Timeline, Quotes count, Actions */}
                      <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-mist-100">
                        <div className="text-right">
                          <span className="text-xs font-bold text-mist-500 block">
                            {formatRelativeTime(order.timestamp)}
                          </span>
                          {hasReplies && (
                            <span className="text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1 mt-1">
                              <CheckCircle2 className="w-3 h-3 text-sky-600" />
                              <span>{order.replies.length} quote sent</span>
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(order);
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-mist-950 hover:bg-mist-800 text-white text-xs font-bold shadow-sm transition-all"
                          >
                            <Send className="w-3.5 h-3.5 text-mist-300" />
                            <span>{isNew ? 'Reply & Quote' : 'View / Reply'}</span>
                          </button>

                          <button
                            onClick={(e) => handleDelete(e, order.referenceId)}
                            className="p-2 rounded-xl text-mist-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </main>

      {/* Order Detail & Quote Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onOrderUpdated={(updated) => {
            refreshOrders();
            setSelectedOrder(updated);
          }}
        />
      )}

      {/* Settings Modal */}
      <AdminSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

    </div>
  );
}
