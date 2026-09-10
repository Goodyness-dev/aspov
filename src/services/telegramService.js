import { getAppConfig } from './configService.js';

/**
 * Format and send a Telegram alert when a new quote request arrives.
 */
export async function sendTelegramOrderNotification(order) {
  const config = getAppConfig();
  const token = config.telegramBotToken;
  const chatId = config.telegramChatId;

  // Format toilet details if applicable
  let toiletSummary = '';
  if (order.toiletDetails) {
    const types = (order.toiletDetails.types || []).join(', ') || 'Standard';
    const issues = (order.toiletDetails.issues || []).join(', ') || 'General';
    toiletSummary = `\n🚽 *Toilet Specs:* ${order.toiletDetails.count} toilet(s) | ${types}\n⚠️ *Issues:* ${issues}`;
  }

  const emergencyHeader = order.isEmergency
    ? `🚨 *URGENT EMERGENCY PLUMBING REQUEST* 🚨\n\n`
    : `🔔 *New Aspen Drain Quote Request*\n\n`;

  const text = `${emergencyHeader}`
    + `📌 *Ref:* \`#${order.referenceId}\`\n`
    + `👤 *Customer:* ${order.customer?.name || 'Anonymous'}\n`
    + `📞 *Phone:* ${order.customer?.phone || 'Not provided'}\n`
    + `📧 *Email:* ${order.customer?.email || 'Not provided'}\n`
    + `🔧 *Service:* ${order.serviceType} — *${order.fixture}*`
    + `${toiletSummary}\n`
    + `⏱ *Timeline:* ${order.timeline === 'specific' ? (order.specificDate || 'Specific date') : (order.timeline || 'ASAP')}\n`
    + `📝 *Notes:* ${order.details || 'None provided'}\n`
    + `📍 *Area:* Markham, ON & York Region\n\n`
    + `👉 *Respond via Aspen Admin Portal:* ${window.location.origin}/#/admin`;

  // If credentials are not configured yet, simulate and log
  if (!token || !chatId || !config.telegramEnabled) {
    console.log(
      '%c[Telegram Notification Simulated - No Bot Token/Chat ID configured yet]',
      'color: #0284c7; font-weight: bold;',
      '\nMessage:\n' + text
    );
    return {
      success: true,
      simulated: true,
      message: 'Telegram credentials not configured. Notification simulated in console.'
    };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();
    if (!response.ok || !data.ok) {
      console.error('Telegram API error:', data);
      return { success: false, error: data.description || 'Telegram API request failed' };
    }

    console.log('[Telegram Notification Sent Successfully]', data);
    return { success: true, simulated: false, data };
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Test Telegram Bot connection
 */
export async function testTelegramConnection(botToken, chatId) {
  if (!botToken || !chatId) {
    return { success: false, error: 'Both Bot Token and Chat ID are required.' };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `✅ *Aspen Drain Telegram Alert Connected!*\n\nYou will now receive instant alerts whenever a customer requests a quote on your website.`,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();
    if (!response.ok || !data.ok) {
      return { success: false, error: data.description || 'Telegram verification failed' };
    }

    return { success: true, message: 'Test message sent successfully to your Telegram!' };
  } catch (error) {
    return { success: false, error: error.message || 'Network error connecting to Telegram' };
  }
}
