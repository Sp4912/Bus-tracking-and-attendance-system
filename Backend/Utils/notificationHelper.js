// utils/notificationHelper.js
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Send an SMS to a parent.
 * @param {string} to - Recipient phone number (E.164 format).
 * @param {string} message - Text message body.
 */
exports.sendSMS = async (to, message) => {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_FROM_NUMBER,
      to,
    });
    console.log(`SMS sent to ${to}: ${message}`);
  } catch (err) {
    console.error(`Failed to send SMS to ${to}:`, err);
  }
};
