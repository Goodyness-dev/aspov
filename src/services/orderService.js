import { sendTelegramOrderNotification } from './telegramService.js';

const STORAGE_KEY = 'aspen_drain_quotes';

/**
 * Seed realistic initial demo data if no orders exist, so the dashboard
 * can be tested immediately.
 */
const SAMPLE_ORDERS = [
  {
    referenceId: 'ASP-749210',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 mins ago
    status: 'new',
    serviceType: 'Plumbing Repair',
    fixture: 'Toilet',
    toiletDetails: {
      count: '2',
      types: ['Standard flow toilet (most common)', 'Dual flush toilet'],
      issues: ['Keeps running', 'Leaking']
    },
    isEmergency: true,
    details: 'Master bathroom toilet is leaking from the base onto the hardwood floor and running continuously.',
    timeline: 'asap',
    specificDate: null,
    customer: {
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins.markham@gmail.com',
      phone: '(647) 555-0192'
    },
    serviceArea: 'Markham, ON & York Region',
    replies: []
  },
  {
    referenceId: 'ASP-621849',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    status: 'quoted',
    serviceType: 'Plumbing Installation or Replacement',
    fixture: 'Sump pump',
    toiletDetails: null,
    isEmergency: false,
    details: 'Looking to replace an old 10-year submersible sump pump before the spring thaw in Berczy Village.',
    timeline: 'flexible',
    specificDate: null,
    customer: {
      name: 'Michael Chen',
      email: 'mchen.tech@outlook.com',
      phone: '(416) 555-8831'
    },
    serviceArea: 'Markham, ON & York Region',
    replies: [
      {
        id: 'rep-1',
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        amount: '$480 – $650 CAD (parts & labour included)',
        message: 'Hi Michael, we can install a heavy-duty 1/2 HP cast iron pump with a battery backup system. We can book for this Thursday morning.',
        estimatedSchedule: 'Thursday 9:00 AM'
      }
    ]
  },
  {
    referenceId: 'ASP-518304',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    status: 'completed',
    serviceType: 'Plumbing Inspection',
    fixture: 'Drain',
    toiletDetails: null,
    isEmergency: false,
    details: 'Need a main sewer line camera inspection prior to closing on a heritage home in Unionville.',
    timeline: 'specific',
    specificDate: '2026-09-15',
    customer: {
      name: 'David Patel',
      email: 'david.patel99@yahoo.ca',
      phone: '(905) 555-4420'
    },
    serviceArea: 'Markham, ON & York Region',
    replies: [
      {
        id: 'rep-2',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
        amount: '$220 CAD',
        message: 'Full HD scope video recorded on USB drive included. Inspection completed.',
        estimatedSchedule: 'Completed'
      }
    ]
  }
];

/**
 * Retrieve all orders from localStorage
 */
export function getOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_ORDERS));
      return SAMPLE_ORDERS;
    }
    const orders = JSON.parse(raw);
    return Array.isArray(orders) ? orders : [];
  } catch (e) {
    console.error('Error loading orders:', e);
    return [];
  }
}

/**
 * Save orders array to localStorage
 */
function saveOrders(orders) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders to localStorage:', e);
  }
}

/**
 * Get a single order by referenceId
 */
export function getOrderById(referenceId) {
  const orders = getOrders();
  return orders.find(o => o.referenceId === referenceId) || null;
}

/**
 * Submit a new quote request from the customer-facing wizard.
 * Auto-triggers instant Telegram alert to the business owner.
 */
export async function submitQuoteRequest(orderData) {
  const referenceId = 'ASP-' + Math.floor(100000 + Math.random() * 900000);
  const timestamp = new Date().toISOString();

  const formattedOrder = {
    referenceId,
    timestamp,
    status: 'new', // 'new' | 'quoted' | 'in_progress' | 'completed' | 'declined'
    serviceType: orderData.serviceType,
    fixture: orderData.fixture,
    toiletDetails: orderData.fixture === 'Toilet' ? {
      count: orderData.toiletCount || 'Not specified',
      types: orderData.toiletTypes || [],
      issues: orderData.toiletIssues || []
    } : null,
    isEmergency: !!orderData.isEmergency,
    details: orderData.details || 'None provided',
    timeline: orderData.timeline,
    specificDate: orderData.specificDate || null,
    customer: {
      name: orderData.name,
      email: orderData.email,
      phone: orderData.phone || 'Not provided'
    },
    serviceArea: 'Markham, ON & York Region',
    replies: []
  };

  // Console logging for verification
  console.log('%c============================================', 'color: #10b981; font-weight: bold;');
  console.log('%c[Aspen Drain] NEW QUOTE REQUEST CREATED!', 'color: #10b981; font-size: 14px; font-weight: bold;');
  console.log('%cOrder Reference:', 'color: #0284c7; font-weight: bold;', referenceId);
  console.log('%cPayload Details:', 'color: #4b5563;', formattedOrder);
  console.log('%c============================================', 'color: #10b981; font-weight: bold;');

  // Save to persistent storage (prepend as newest)
  try {
    const existing = getOrders();
    existing.unshift(formattedOrder);
    saveOrders(existing);
  } catch (e) {
    console.error('Failed to save quote request:', e);
  }

  // 🔔 Dispatch Telegram notification to owner in background
  sendTelegramOrderNotification(formattedOrder).catch(err => {
    console.warn('Telegram notification background dispatch error:', err);
  });

  // Short delay for optimal UX feedback
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    success: true,
    referenceId,
    order: formattedOrder
  };
}

/**
 * Update an order's status
 */
export function updateOrderStatus(referenceId, newStatus) {
  const orders = getOrders();
  const updated = orders.map(o => {
    if (o.referenceId === referenceId) {
      return { ...o, status: newStatus, lastUpdated: new Date().toISOString() };
    }
    return o;
  });
  saveOrders(updated);
  return updated.find(o => o.referenceId === referenceId);
}

/**
 * Append an owner reply / quote to the order and update status to 'quoted'
 */
export function addOrderReply(referenceId, replyData) {
  const orders = getOrders();
  let updatedOrder = null;

  const updated = orders.map(o => {
    if (o.referenceId === referenceId) {
      const newReplies = Array.isArray(o.replies) ? [...o.replies] : [];
      const replyEntry = {
        id: 'rep-' + Date.now(),
        timestamp: new Date().toISOString(),
        amount: replyData.amount,
        message: replyData.message,
        estimatedSchedule: replyData.estimatedSchedule || 'Flexible',
        sentVia: replyData.sentVia || 'email',
        emailStatus: replyData.emailStatus || 'sent'
      };
      newReplies.push(replyEntry);

      updatedOrder = {
        ...o,
        status: o.status === 'new' ? 'quoted' : o.status,
        lastQuotedAt: new Date().toISOString(),
        latestQuoteAmount: replyData.amount,
        replies: newReplies
      };
      return updatedOrder;
    }
    return o;
  });

  saveOrders(updated);
  return updatedOrder;
}

/**
 * Delete an order by referenceId
 */
export function deleteOrder(referenceId) {
  const orders = getOrders();
  const filtered = orders.filter(o => o.referenceId !== referenceId);
  saveOrders(filtered);
  return filtered;
}
