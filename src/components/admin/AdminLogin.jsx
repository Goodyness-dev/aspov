import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';
import { loginAdmin } from '../../services/configService';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Please enter your owner passcode.');
      return;
    }

    setLoading(true);
    const result = loginAdmin(password, rememberMe);
    setLoading(false);

    if (result.success) {
      onLoginSuccess();
    } else {
      setError(result.error || 'Invalid passcode.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mist-100 via-mist-50 to-mist-200 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-mist-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-mist-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top back button */}
      <button
        onClick={onBackToSite}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-semibold text-mist-700 hover:text-mist-950 transition-colors px-4 py-2 rounded-xl glass hover:bg-white/60"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Aspen Drain</span>
      </button>

      {/* Card */}
      <div className="w-full max-w-md glass-strong rounded-3xl p-8 sm:p-10 shadow-2xl shadow-mist-900/15 border border-white/60 relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-mist-950 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-mist-950/20">
            <Lock className="w-8 h-8 text-mist-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-mist-950 tracking-tight">
            Owner Portal
          </h1>
          <p className="text-sm text-mist-600 mt-1">
            Aspen Drain Order & Quote Management
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 animate-shake">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-mist-800 uppercase tracking-wider mb-2">
              Passcode
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-mist-400">
                <KeyRound className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter owner passcode"
                autoFocus
                className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-white/80 border border-mist-200 text-mist-950 placeholder-mist-400 focus:outline-none focus:ring-2 focus:ring-mist-950 focus:bg-white transition-all text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-mist-400 hover:text-mist-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-mist-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-mist-300 text-mist-950 focus:ring-mist-950"
              />
              <span>Remember me on this browser</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-mist-950 hover:bg-mist-800 text-white font-bold text-base shadow-xl shadow-mist-950/20 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShieldCheck className="w-5 h-5 text-mist-300" />
            <span>{loading ? 'Authenticating...' : 'Access Dashboard'}</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-mist-200/50 text-center">
          <p className="text-xs text-mist-500">
            Initial setup key: <code className="font-mono bg-mist-200/60 px-1.5 py-0.5 rounded text-mist-800">aspen2005</code>
          </p>
        </div>
      </div>
    </div>
  );
}
