const axios = require('axios');

module.exports = async function sendSMS(phone, message) {
  try {
    const res = await axios.post('https://api.msg91.com/api/v5/flow/', {
      mobiles: phone,
      sender: process.env.SMS_SENDER_ID,
      message: message
    }, {
      headers: {
        authkey: process.env.SMS_API_KEY,
        'content-type': 'application/json'
      }
    });
    console.log('SMS response:', res.data);
  } catch (err) {
    console.error(`Failed to send SMS:`, err.message);
  }
};