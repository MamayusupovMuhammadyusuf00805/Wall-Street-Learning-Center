import axios from 'axios';

const TELEGRAM_BOT_TOKEN = '8225831828:AAEIUY3WJw1r0OtDBFaY7EgeKO6eP496hfU';
const TELEGRAM_CHAT_ID = '-1003988408148';

/**
 * @param {Object} data - Yuborilishi kerak bo'lgan ma'lumotlar
 * @returns {Promise} - Axios promise
 */
export const sendToTelegram = async (data) => {
  const { name, phone } = data;

  const message = `
🎓 <b>Yangi ro'yxatdan o'tish!</b>

👤 <b>Ism:</b> ${name}
📱 <b>Telefon:</b> ${phone}
📅 <b>Sana:</b> ${new Date().toLocaleString('uz-UZ', {
    timeZone: 'Asia/Tashkent',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}

✅ Iltimos, tez orada bog'laning!
  `.trim();

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Telegram xabar yuborildi:', response.data);
    return response.data;
  } catch (error) {
    console.error('Telegram xabar yuborishda xatolik:', error.response?.data || error.message);
    throw error;
  }
};
