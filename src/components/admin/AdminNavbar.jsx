import React from 'react';
import { ExternalLink, Settings, LogOut, Shield, Bell } from 'lucide-react';
import { logoutAdmin } from '../../services/configService';

export default function AdminNavbar({ onOpenSettings, onLogout, newOrdersCount = 0 }) {
  return (
    <header className="sticky top-0 z-30 glass-strong border-b border-mist-200/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-mist-950 text-white flex items-center justify-center font-black shadow-md shadow-mist-950/20">
            AD
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-mist-950">Aspen Drain</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-mist-200 text-mist-800">
                Admin
              </span>
            </div>
            <p className="text-xs text-mist-500 font-medium hidden sm:block">Markham, ON • Orders & Dispatch</p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {newOrdersCount > 0 && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/60 text-amber-900 text-xs font-bold animate-pulse">
              <Bell className="w-3.5 h-3.5 text-amber-700" />
              <span>{newOrdersCount} New Inquiry{newOrdersCount > 1 ? 's' : ''}</span>
            </div>
          )}

          {/* Settings button */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass hover:bg-white text-mist-800 text-xs sm:text-sm font-semibold transition-all"
            title="Configure Telegram Bot & EmailJS"
          >
            <Settings className="w-4 h-4 text-mist-600" />
            <span className="hidden sm:inline">Settings</span>
          </button>

          {/* Live site link */}
          <a
            href="#/"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass hover:bg-white text-mist-800 text-xs sm:text-sm font-semibold transition-all"
          >
            <span className="hidden sm:inline">View Site</span>
            <ExternalLink className="w-4 h-4 text-mist-600" />
          </a>

          {/* Logout */}
          <button
            onClick={() => {
              logoutAdmin();
              onLogout();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-mist-200/80 hover:bg-rose-100 hover:text-rose-700 text-mist-800 text-xs sm:text-sm font-semibold transition-all"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </div>
    </header>
  );
}
