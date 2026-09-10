import React, { useState } from 'react';
import { 
  X, Save, Send, CheckCircle2, AlertCircle, KeyRound, Bot, Mail, 
  HelpCircle, Eye, EyeOff, Shield
} from 'lucide-react';
import { getAppConfig, saveAppConfig } from '../../services/configService';
import { testTelegramConnection } from '../../services/telegramService';
import { testEmailConnection } from '../../services/emailService';

export default function AdminSettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const initial = getAppConfig();

  const [activeTab, setActiveTab] = useState('telegram'); // 'telegram' | 'emailjs' | 'security'

  // Telegram fields
  const [telegramBotToken, setTelegramBotToken] = useState(initial.telegramBotToken || '');
  const [telegramChatId, setTelegramChatId] = useState(initial.telegramChatId || '');
  const [testingTelegram, setTestingTelegram] = useState(false);
  const [telegramStatus, setTelegramStatus] = useState(null);

  // EmailJS fields
  const [emailjsServiceId, setEmailjsServiceId] = useState(initial.emailjsServiceId || '');
  const [emailjsTemplateId, setEmailjsTemplateId] = useState(initial.emailjsTemplateId || '');
  const [emailjsConfirmationTemplateId, setEmailjsConfirmationTemplateId] = useState(initial.emailjsConfirmationTemplateId || '');
  const [emailjsPublicKey, setEmailjsPublicKey] = useState(initial.emailjsPublicKey || '');
  const [testEmailRecipient, setTestEmailRecipient] = useState('');
  const [testingEmail, setTestingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);

  // Security / Password fields
  const [adminPassword, setAdminPassword] = useState(initial.adminPassword || 'aspen2005');
  const [showPassword, setShowPassword] = useState(false);
  const [securityStatus, setSecurityStatus] = useState(null);

  // Global save notice
  const [saveMessage, setSaveMessage] = useState('');

  const handleSaveAll = () => {
    saveAppConfig({
      telegramBotToken: telegramBotToken.trim(),
      telegramChatId: telegramChatId.trim(),
      emailjsServiceId: emailjsServiceId.trim(),
      emailjsTemplateId: emailjsTemplateId.trim(),
      emailjsConfirmationTemplateId: emailjsConfirmationTemplateId.trim(),
      emailjsPublicKey: emailjsPublicKey.trim(),
      adminPassword: adminPassword.trim() || 'aspen2005',
    });

    setSaveMessage('All settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3500);
  };

  const handleTestTelegram = async () => {
    setTelegramStatus(null);
    setTestingTelegram(true);

    const res = await testTelegramConnection(telegramBotToken.trim(), telegramChatId.trim());
    setTestingTelegram(false);

    if (res.success) {
      setTelegramStatus({ type: 'success', message: res.message });
      // auto-save valid credentials
      saveAppConfig({
        telegramBotToken: telegramBotToken.trim(),
        telegramChatId: telegramChatId.trim(),
      });
    } else {
      setTelegramStatus({ type: 'error', message: res.error });
    }
  };

  const handleTestEmail = async () => {
    setEmailStatus(null);
    setTestingEmail(true);

    const res = await testEmailConnection(
      emailjsServiceId.trim(),
      emailjsTemplateId.trim(),
      emailjsPublicKey.trim(),
      testEmailRecipient.trim()
    );
    setTestingEmail(false);

    if (res.success) {
      setEmailStatus({ type: 'success', message: res.message });
      // auto-save valid credentials
      saveAppConfig({
        emailjsServiceId: emailjsServiceId.trim(),
        emailjsTemplateId: emailjsTemplateId.trim(),
        emailjsPublicKey: emailjsPublicKey.trim(),
      });
    } else {
      setEmailStatus({ type: 'error', message: res.error });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-mist-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-mist-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-mist-950 to-mist-900 text-white flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">Integration & Security Settings</h2>
            <p className="text-xs text-mist-300 mt-0.5">Manage Telegram notifications, EmailJS dispatch & access code</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-mist-200 bg-mist-50/80 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('telegram')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'telegram'
                ? 'border-mist-950 bg-white text-mist-950 shadow-sm'
                : 'border-transparent text-mist-600 hover:text-mist-950'
            }`}
          >
            <Bot className="w-4 h-4 text-sky-600" />
            <span>Telegram Bot</span>
          </button>

          <button
            onClick={() => setActiveTab('emailjs')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'emailjs'
                ? 'border-mist-950 bg-white text-mist-950 shadow-sm'
                : 'border-transparent text-mist-600 hover:text-mist-950'
            }`}
          >
            <Mail className="w-4 h-4 text-amber-600" />
            <span>EmailJS Dispatch</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'security'
                ? 'border-mist-950 bg-white text-mist-950 shadow-sm'
                : 'border-transparent text-mist-600 hover:text-mist-950'
            }`}
          >
            <Shield className="w-4 h-4 text-indigo-600" />
            <span>Passcode</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">

          {saveMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-center gap-2 font-semibold animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{saveMessage}</span>
            </div>
          )}

          {/* TELEGRAM TAB */}
          {activeTab === 'telegram' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-900 leading-relaxed">
                <p className="font-bold mb-1">How to setup Telegram Alerts:</p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Message <strong>@BotFather</strong> on Telegram to create a bot and get your <strong>Bot Token</strong>.</li>
                  <li>Message <strong>@userinfobot</strong> or <strong>@getmyid_bot</strong> to get your numerical <strong>Chat ID</strong>.</li>
                  <li>Paste them below and click <strong>"Send Test Alert"</strong>.</li>
                </ol>
              </div>

              <div>
                <label className="block text-xs font-bold text-mist-800 uppercase tracking-wider mb-2">
                  Telegram Bot Token
                </label>
                <input
                  type="text"
                  value={telegramBotToken}
                  onChange={(e) => setTelegramBotToken(e.target.value)}
                  placeholder="e.g. 7123456789:AAHq..."
                  className="w-full px-4 py-3 rounded-2xl bg-mist-50 border border-mist-200 text-mist-950 placeholder-mist-400 focus:ring-2 focus:ring-mist-950 focus:bg-white text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-mist-800 uppercase tracking-wider mb-2">
                  Telegram Chat ID
                </label>
                <input
                  type="text"
                  value={telegramChatId}
                  onChange={(e) => setTelegramChatId(e.target.value)}
                  placeholder="e.g. 123456789 or -100..."
                  className="w-full px-4 py-3 rounded-2xl bg-mist-50 border border-mist-200 text-mist-950 placeholder-mist-400 focus:ring-2 focus:ring-mist-950 focus:bg-white text-sm font-mono"
                />
              </div>

              {telegramStatus && (
                <div className={`p-4 rounded-2xl text-sm flex items-start gap-2.5 ${
                  telegramStatus.type === 'success' 
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' 
                    : 'bg-rose-50 border border-rose-200 text-rose-900'
                }`}>
                  {telegramStatus.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                  <span>{telegramStatus.message}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleTestTelegram}
                disabled={testingTelegram || !telegramBotToken || !telegramChatId}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
                <span>{testingTelegram ? 'Testing...' : 'Send Test Alert to Telegram'}</span>
              </button>
            </div>
          )}

          {/* EMAILJS TAB */}
          {activeTab === 'emailjs' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 leading-relaxed">
                <p className="font-bold mb-1">EmailJS Setup Instructions:</p>
                <p className="mb-2">
                  When you send quotes from the Aspen Drain dashboard, they are automatically delivered via EmailJS to the customer's inbox.
                </p>
                <p className="font-semibold">Recommended template variables in your EmailJS template:</p>
                <code className="block bg-amber-100/70 p-2 rounded mt-1 font-mono text-[11px] text-amber-900">
                  {"{{to_name}}, {{customer_email}}, {{quote_amount}}, {{quote_message}}, {{reference_id}}, {{company_phone}}"}
                </code>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-mist-800 uppercase tracking-wider mb-2">
                    Service ID
                  </label>
                  <input
                    type="text"
                    value={emailjsServiceId}
                    onChange={(e) => setEmailjsServiceId(e.target.value)}
                    placeholder="e.g. service_xxxxxxx"
                    className="w-full px-4 py-3 rounded-2xl bg-mist-50 border border-mist-200 text-mist-950 placeholder-mist-400 focus:ring-2 focus:ring-mist-950 focus:bg-white text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-mist-800 uppercase tracking-wider mb-2">
                    Public Key (User ID)
                  </label>
                  <input
                    type="text"
                    value={emailjsPublicKey}
                    onChange={(e) => setEmailjsPublicKey(e.target.value)}
                    placeholder="e.g. xxxxxxxxxxxxxxxx"
                    className="w-full px-4 py-3 rounded-2xl bg-mist-50 border border-mist-200 text-mist-950 placeholder-mist-400 focus:ring-2 focus:ring-mist-950 focus:bg-white text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-mist-800 uppercase tracking-wider mb-1">
                    Template 1: Quote Reply ID
                  </label>
                  <p className="text-[11px] text-mist-500 mb-2">Sent when replying to customer with quote</p>
                  <input
                    type="text"
                    value={emailjsTemplateId}
                    onChange={(e) => setEmailjsTemplateId(e.target.value)}
                    placeholder="e.g. template_quote..."
                    className="w-full px-4 py-3 rounded-2xl bg-mist-50 border border-mist-200 text-mist-950 placeholder-mist-400 focus:ring-2 focus:ring-mist-950 focus:bg-white text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-mist-800 uppercase tracking-wider mb-1">
                    Template 2: Customer Receipt ID
                  </label>
                  <p className="text-[11px] text-mist-500 mb-2">Sent automatically on wizard submit</p>
                  <input
                    type="text"
                    value={emailjsConfirmationTemplateId}
                    onChange={(e) => setEmailjsConfirmationTemplateId(e.target.value)}
                    placeholder="e.g. template_receipt..."
                    className="w-full px-4 py-3 rounded-2xl bg-mist-50 border border-mist-200 text-mist-950 placeholder-mist-400 focus:ring-2 focus:ring-mist-950 focus:bg-white text-sm font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-mist-100">
                <label className="block text-xs font-bold text-mist-800 uppercase tracking-wider mb-2">
                  Test Email Recipient
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={testEmailRecipient}
                    onChange={(e) => setTestEmailRecipient(e.target.value)}
                    placeholder="your-email@example.com"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-mist-50 border border-mist-200 text-mist-950 text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleTestEmail}
                    disabled={testingEmail || !emailjsServiceId || !emailjsTemplateId || !emailjsPublicKey}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-40"
                  >
                    {testingEmail ? 'Testing...' : 'Send Test'}
                  </button>
                </div>
              </div>

              {emailStatus && (
                <div className={`p-4 rounded-2xl text-sm flex items-start gap-2.5 ${
                  emailStatus.type === 'success' 
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' 
                    : 'bg-rose-50 border border-rose-200 text-rose-900'
                }`}>
                  {emailStatus.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                  <span>{emailStatus.message}</span>
                </div>
              )}
            </div>
          )}

          {/* SECURITY / PASSCODE TAB */}
          {activeTab === 'security' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 leading-relaxed">
                Change the master passcode required to access the Aspen Drain admin portal.
              </div>

              <div>
                <label className="block text-xs font-bold text-mist-800 uppercase tracking-wider mb-2">
                  Owner Passcode
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter new passcode"
                    className="w-full px-4 pr-11 py-3 rounded-2xl bg-mist-50 border border-mist-200 text-mist-950 font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-mist-400 hover:text-mist-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-mist-500 mt-2">
                  Current default is <code className="font-mono bg-mist-100 px-1 py-0.5 rounded">aspen2005</code>.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-white border-t border-mist-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl glass hover:bg-mist-100 text-mist-800 text-sm font-bold transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveAll}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-mist-950 hover:bg-mist-800 text-white font-bold text-sm shadow-lg shadow-mist-950/20 transition-all"
          >
            <Save className="w-4 h-4 text-mist-300" />
            <span>Save Settings</span>
          </button>
        </div>

      </div>
    </div>
  );
}
