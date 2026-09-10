/**
 * Automated Verification Suite for Aspen Drain
 * Tests data integrity, service methods, authentication, and dispatch payloads.
 */

// Mock browser globals for Node.js test environment
const memoryStore = {};
global.localStorage = {
  getItem: (k) => memoryStore[k] || null,
  setItem: (k, v) => { memoryStore[k] = String(v); },
  removeItem: (k) => { delete memoryStore[k]; },
  clear: () => { Object.keys(memoryStore).forEach(k => delete memoryStore[k]); }
};

global.sessionStorage = {
  getItem: (k) => memoryStore['sess_' + k] || null,
  setItem: (k, v) => { memoryStore['sess_' + k] = String(v); },
  removeItem: (k) => { delete memoryStore['sess_' + k]; }
};

global.window = {
  location: {
    origin: 'https://aspendrain.ca',
    hash: '',
    pathname: '/'
  }
};

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    failed++;
  }
}

async function runTestSuite() {
  console.log('\n=============================================');
  console.log('🧪 RUNNING ASPEN DRAIN AUTOMATED VERIFICATION');
  console.log('=============================================\n');

  // Test 1: Config Service
  console.log('--- 1. Testing Config Service & Auth ---');
  const { getAppConfig, saveAppConfig, loginAdmin, logoutAdmin, isAdminAuthenticated } = await import('../src/services/configService.js');

  const initialConfig = getAppConfig();
  assert(initialConfig.adminPassword === 'aspen2005', 'Default admin password is "aspen2005"');

  // Test failed login
  const failLogin = loginAdmin('wrongpassword');
  assert(failLogin.success === false, 'Rejects invalid password');
  assert(isAdminAuthenticated() === false, 'Session is not authenticated after failed login');

  // Test successful login
  const okLogin = loginAdmin('aspen2005', true);
  assert(okLogin.success === true, 'Accepts correct password');
  assert(isAdminAuthenticated() === true, 'Session is authenticated after valid login');

  // Test logout
  logoutAdmin();
  assert(isAdminAuthenticated() === false, 'Session is terminated after logout');

  // Test saving updated config
  saveAppConfig({ adminPassword: 'newSecretPassword2026' });
  const updatedConfig = getAppConfig();
  assert(updatedConfig.adminPassword === 'newSecretPassword2026', 'Successfully updates and persists admin password');

  // Re-verify login with updated password
  const newLogin = loginAdmin('newSecretPassword2026');
  assert(newLogin.success === true, 'Authenticates with newly configured password');

  // Restore default for dev
  saveAppConfig({ adminPassword: 'aspen2005' });

  // Test 2: Order Service & Telegram Trigger
  console.log('\n--- 2. Testing Order Service & Dispatch ---');
  const { submitQuoteRequest, getOrders, getOrderById, updateOrderStatus, addOrderReply, deleteOrder } = await import('../src/services/orderService.js');

  // Initial seeding
  const initialOrders = getOrders();
  assert(Array.isArray(initialOrders) && initialOrders.length >= 3, 'Sample orders seeded properly if empty');

  // Create new customer emergency toilet order
  const orderSubmission = await submitQuoteRequest({
    serviceType: 'Plumbing Repair',
    fixture: 'Toilet',
    toiletCount: '2',
    toiletTypes: ['Dual flush toilet'],
    toiletIssues: ['Keeps running', 'Leaking'],
    isEmergency: true,
    details: 'Urgent leak from toilet base into hallway',
    timeline: 'asap',
    name: 'Robert Miller',
    email: 'robert.miller@test.ca',
    phone: '(647) 555-9090'
  });

  assert(orderSubmission.success === true, 'Order created successfully');
  assert(orderSubmission.referenceId.startsWith('ASP-'), 'Reference ID generated with prefix ASP-');
  assert(orderSubmission.order.status === 'new', 'New order initialized with status "new"');
  assert(orderSubmission.order.isEmergency === true, 'Emergency flag correctly stored');
  assert(orderSubmission.order.toiletDetails.count === '2', 'Toilet diagnostics preserved');

  // Verify it exists in store
  const fetched = getOrderById(orderSubmission.referenceId);
  assert(fetched !== null && fetched.customer.name === 'Robert Miller', 'Order retrievable by referenceId');

  // Test updating status
  const updatedStatusOrder = updateOrderStatus(orderSubmission.referenceId, 'in_progress');
  assert(updatedStatusOrder.status === 'in_progress', 'Order status updated to "in_progress"');

  // Test 3: Quoting & Reply flow
  console.log('\n--- 3. Testing Owner Quote Reply Flow ---');
  const replyOrder = addOrderReply(orderSubmission.referenceId, {
    amount: '$240 CAD',
    message: 'We can dispatch a technician within 45 minutes.',
    estimatedSchedule: 'Today in 45m',
    sentVia: 'email',
    emailStatus: 'delivered'
  });

  assert(replyOrder.replies.length === 1, 'Quote reply appended to order history');
  assert(replyOrder.replies[0].amount === '$240 CAD', 'Quote amount correctly recorded');
  assert(replyOrder.latestQuoteAmount === '$240 CAD', 'latestQuoteAmount field populated');

  // Test deleting order
  const remaining = deleteOrder(orderSubmission.referenceId);
  const checkDeleted = getOrderById(orderSubmission.referenceId);
  assert(checkDeleted === null, 'Order successfully deleted from store');

  // Test 4: Telegram Service Simulation
  console.log('\n--- 4. Testing Telegram Alert Simulation ---');
  const { sendTelegramOrderNotification } = await import('../src/services/telegramService.js');
  const tgResult = await sendTelegramOrderNotification({
    referenceId: 'ASP-TEST99',
    serviceType: 'Plumbing Repair',
    fixture: 'Drain',
    isEmergency: true,
    customer: { name: 'Test User', phone: '6470000000', email: 'test@test.ca' },
    timeline: 'asap',
    details: 'Kitchen sink clogged'
  });
  assert(tgResult.success === true, 'Telegram notification handles simulation cleanly when unconfigured');

  // Summary
  console.log('\n=============================================');
  console.log(`📊 TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log('=============================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
