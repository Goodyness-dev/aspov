/**
 * Configuration & Credentials Service
 * Supports environment variables with fallback to persistent LocalStorage.
 * Allows the owner to enter/update credentials dynamically from the Admin Settings UI.
 */

const STORAGE_KEY_CONFIG = 'aspen_app_config';
const STORAGE_KEY_AUTH = 'aspen_admin_auth';

const DEFAULT_CONFIG = {
  // Admin credentials
  adminPassword: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADMIN_PASSWORD) || 'aspen2005',

  // Telegram Bot Configuration
  telegramBotToken: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_TELEGRAM_BOT_TOKEN) || '',
  telegramChatId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_TELEGRAM_CHAT_ID) || '',
  telegramEnabled: true,

  // EmailJS Configuration
  emailjsServiceId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMAILJS_SERVICE_ID) || '',
  emailjsTemplateId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMAILJS_TEMPLATE_ID) || '',
  emailjsPublicKey: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMAILJS_PUBLIC_KEY) || '',
  emailjsEnabled: true,
};

export function getAppConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (saved) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Could not read config from storage', e);
  }
  return { ...DEFAULT_CONFIG };
}

export function saveAppConfig(newConfig) {
  try {
    const current = getAppConfig();
    const updated = { ...current, ...newConfig };
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Could not save config to storage', e);
    return null;
  }
}

// Authentication Helpers
export function isAdminAuthenticated() {
  try {
    const session = sessionStorage.getItem(STORAGE_KEY_AUTH) || localStorage.getItem(STORAGE_KEY_AUTH);
    return session === 'authenticated';
  } catch (e) {
    return false;
  }
}

export function loginAdmin(password, rememberMe = true) {
  const config = getAppConfig();
  if (password === config.adminPassword) {
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEY_AUTH, 'authenticated');
    } else {
      sessionStorage.setItem(STORAGE_KEY_AUTH, 'authenticated');
    }
    return { success: true };
  }
  return { success: false, error: 'Incorrect passcode. Please try again.' };
}

export function logoutAdmin() {
  try {
    localStorage.removeItem(STORAGE_KEY_AUTH);
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
  } catch (e) {
    // Ignore
  }
}
