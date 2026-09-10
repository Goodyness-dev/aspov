import emailjs from '@emailjs/browser';
import { getAppConfig } from './configService.js';
import { BUSINESS_INFO } from '../data/plumbingData.js';

/**
 * Send official quote and response from the owner to customer's email via EmailJS
 */
export async function sendCustomerQuoteEmail(order, quoteData) {
  const config = getAppConfig();
  const serviceId = config.emailjsServiceId;
  const templateId = config.emailjsTemplateId;
  const publicKey = config.emailjsPublicKey;

  const templateParams = {
    to_name: order.customer?.name || 'Valued Customer',
    to_email: order.customer?.email,
    customer_email: order.customer?.email,
    customer_phone: order.customer?.phone || 'Not provided',
    reference_id: order.referenceId,
    service_type: order.serviceType,
    fixture: order.fixture,
    quote_amount: quoteData.amount || 'To be determined upon inspection',
    quote_message: quoteData.message || 'Thank you for reaching out to Aspen Drain.',
    estimated_schedule: quoteData.estimatedSchedule || 'As discussed',
    company_name: BUSINESS_INFO.name,
    company_phone: BUSINESS_INFO.phoneDisplay,
    company_area: BUSINESS_INFO.serviceArea,
    date: new Date().toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };

  // Check if credentials are fully configured
  if (!serviceId || !templateId || !publicKey || !config.emailjsEnabled) {
    console.log(
      '%c[EmailJS Quote Dispatch Simulated - Credentials Not Set Yet]',
      'color: #10b981; font-weight: bold;',
      '\nParams:', templateParams
    );
    return {
      success: true,
      simulated: true,
      message: `Email simulated! (Configure EmailJS keys in Admin Settings to deliver directly to ${order.customer?.email})`
    };
  }

  try {
    const result = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    console.log('[EmailJS Quote Sent Successfully]', result);
    return {
      success: true,
      simulated: false,
      result
    };
  } catch (error) {
    console.error('EmailJS send error:', error);
    return {
      success: false,
      error: error?.text || error?.message || 'Failed to dispatch email via EmailJS.'
    };
  }
}

/**
 * Send automatic order confirmation receipt to customer upon wizard submission
 */
export async function sendOrderConfirmationEmail(order) {
  const config = getAppConfig();
  const serviceId = config.emailjsServiceId;
  const templateId = config.emailjsConfirmationTemplateId;
  const publicKey = config.emailjsPublicKey;

  if (!templateId || !serviceId || !publicKey || !config.emailjsEnabled) {
    console.log(
      '%c[EmailJS Order Receipt Simulated - Confirmation Template ID Not Set Yet]',
      'color: #0ea5e9; font-weight: bold;',
      `\nReceipt for: ${order.customer?.email} (Ref: ${order.referenceId})`
    );
    return {
      success: true,
      simulated: true,
      message: 'Confirmation email simulated.'
    };
  }

  const templateParams = {
    to_name: order.customer?.name || 'Valued Customer',
    to_email: order.customer?.email,
    customer_email: order.customer?.email,
    customer_phone: order.customer?.phone || 'Not provided',
    reference_id: order.referenceId,
    service_type: order.serviceType,
    fixture: order.fixture,
    estimated_schedule: order.timeline === 'specific' ? (order.specificDate || 'Specific Date') : (order.timeline || 'ASAP'),
    company_name: BUSINESS_INFO.name,
    company_phone: BUSINESS_INFO.phoneDisplay,
    company_area: BUSINESS_INFO.serviceArea,
    date: new Date().toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };

  try {
    const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log('[EmailJS Confirmation Sent Successfully]', result);
    return { success: true, simulated: false, result };
  } catch (error) {
    console.warn('EmailJS confirmation error:', error);
    return { success: false, error: error?.text || error?.message };
  }
}

/**
 * Send a test email to verify EmailJS setup from the Admin Settings
 */
export async function testEmailConnection(serviceId, templateId, publicKey, testRecipient) {
  if (!serviceId || !templateId || !publicKey) {
    return {
      success: false,
      error: 'Service ID, Template ID, and Public Key are all required.'
    };
  }

  try {
    const testParams = {
      to_name: 'Aspen Drain Admin Test',
      to_email: testRecipient || 'admin@aspendrain.ca',
      customer_email: testRecipient || 'admin@aspendrain.ca',
      reference_id: 'ASP-TEST-001',
      service_type: 'Plumbing Repair',
      fixture: 'Drain Cleaning',
      quote_amount: '$150 - $250 CAD',
      quote_message: 'This is a test notification confirming that your Aspen Drain EmailJS integration is functioning perfectly!',
      estimated_schedule: 'Next Business Day',
      company_name: BUSINESS_INFO.name,
      company_phone: BUSINESS_INFO.phoneDisplay,
      company_area: BUSINESS_INFO.serviceArea,
      date: new Date().toLocaleDateString()
    };

    const res = await emailjs.send(serviceId, templateId, testParams, publicKey);
    return { success: true, message: 'Test email delivered successfully!' };
  } catch (error) {
    return {
      success: false,
      error: error?.text || error?.message || 'Could not send test email. Check keys.'
    };
  }
}
