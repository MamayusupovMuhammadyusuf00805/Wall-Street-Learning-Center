# 🎓 Wall Street Learning Center - Web Sayt

Modern, responsive va 3 tillik (🇺🇿 O'zbek, 🇬🇧 Ingliz, 🇷🇺 Rus) web-sayt Wall Street o'quv markazi uchun.

---

## ✨ Asosiy Xususiyatlar

### 🌍 3 Tillik Tizim
- **O'zbek tili** 🇺🇿
- **Ingliz tili** 🇬🇧  
- **Rus tili** 🇷🇺
- Navbar'da dropdown menu orqali til almashtirish
- Barcha sahifalar va komponentlar to'liq tarjima qilingan
- Tanlangan til localStorage'da saqlanadi

### 📱 Telegram Bot Integratsiyasi
- Ro'yxatdan o'tganda avtomatik xabar yuborish
- Ism, telefon va sana ma'lumotlari
- Real-time xabarnomalar
- **To'liq yo'riqnoma:** `TELEGRAM_BOT_SETUP.md`

### 🎬 Sahifalar Orasida Animatsiya
- Framer Motion kutubxonasi
- Smooth fade va slide transitions
- Professional ko'rinish
- 60 FPS animatsiyalar

### 📱 100% Responsive Dizayn
- **Mobile:** 480px va undan kichik
- **Tablet:** 768px
- **Desktop:** 992px, 1200px+
- Barcha qurilmalarda mukammal ishlaydi
- Touch-friendly interfeys

### ✨ Animatsiyalar
- **Navbar:** slideDown, hover effektlari, dropdown
- **Home:** fadeInUp, slideInLeft, scaleIn, progressAnimation
- **About:** scaleIn kartalar, modal animatsiyalari
- **Results:** zoomIn, hover effektlari, image gallery
- **Location:** rotating background, fadeIn
- **Community:** rotating icons, pulse effektlari
- **Footer:** bounce animatsiya, hover effektlari

### 🎨 To'g'rilangan Modallar
- Zamonaviy dizayn
- Loading holati (spinner)
- Success/Error xabarlari
- Form validatsiyasi
- Telegram integratsiyasi
- Smooth open/close animatsiyalari

---

## 🚀 O'rnatish va Ishga Tushirish

### 1. Paketlarni o'rnatish
```bash
npm install
```

### 2. Development server
```bash
npm run dev
```

Sayt ochiladi: **http://localhost:5174/**

### 3. Production build
```bash
npm run build
```

---

## 📱 Telegram Bot Sozlash

### Qisqacha:
1. @BotFather orqali bot yarating
2. TOKEN oling
3. Guruh yarating va botni qo'shing
4. Chat ID oling
5. `src/config/telegram.js` faylida sozlang

### To'liq yo'riqnoma:
📖 **`TELEGRAM_BOT_SETUP.md`** faylini o'qing - qadam-baqadam yo'riqnoma!

---

## 🌐 Sahifalar

### 🏠 Home (Bosh sahifa)
- Hero section
- Statistika (talabalar, kurslar, natijalar)
- Darajalar bo'yicha talabalar
- IELTS kafolati
- Kurslar ro'yxati

### 📚 About (Kurslar)
- Kurslar ro'yxati
- CRUD operatsiyalari (Qo'shish, Tahrirlash, O'chirish)
- Daraja bo'yicha filtrlash
- Responsive kartalar

### 👥 Community (Jamiyat)
- Jamiyat haqida ma'lumot
- 6 ta xususiyat
- Call-to-action section
- Animated kartalar

### 🏆 Results (Natijalar)
- Talabalar natijalari
- Rasm galereyasi
- Lightbox modal
- Grid layout

### 📍 Location (Manzil)
- Manzil va telefon
- Ish vaqti
- Google Maps integratsiyasi
- Responsive dizayn

### 📞 Footer
- Kontakt ma'lumotlari
- Ijtimoiy tarmoqlar
- Tezkor havolalar
- Copyright

---

## 🛠 Texnologiyalar

| Texnologiya | Versiya | Maqsad |
|------------|---------|--------|
| **React** | 18.3.1 | UI kutubxonasi |
| **React Router** | 7.1.3 | Routing |
| **Framer Motion** | 11.15.0 | Animatsiyalar |
| **i18next** | 24.2.2 | Ko'p tillik |
| **react-i18next** | 15.2.2 | React integratsiyasi |
| **Axios** | 1.7.9 | HTTP so'rovlar |
| **Vite** | 6.0.5 | Build tool |
| **CSS3** | - | Styling |

---

## 📂 Loyiha Strukturasi

```
Wall Street/
├── public/
│   └── imgs/                    # Rasmlar
├── src/
│   ├── components/              # Komponentlar
│   │   ├── Navbar.jsx          # Navigatsiya
│   │   ├── Navbar.css
│   │   ├── Footer.jsx          # Footer
│   │   └── Footer.css
│   ├── pages/                   # Sahifalar
│   │   ├── home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── about/
│   │   │   ├── About.jsx
│   │   │   └── About.css
│   │   ├── community/
│   │   │   ├── Community.jsx
│   │   │   └── Community.css
│   │   ├── results/
│   │   │   ├── Results.jsx
│   │   │   └── Results.css
│   │   └── location/
│   │       ├── Location.jsx
│   │       └── Location.css
│   ├── i18n/
│   │   └── i18n.js             # Tarjimalar (uz, en, ru)
│   ├── config/
│   │   └── telegram.js         # Telegram bot
│   ├── App.jsx                 # Asosiy komponent
│   ├── App.css
│   ├── main.jsx                # Entry point
│   └── index.css
├── TELEGRAM_BOT_SETUP.md       # Bot yo'riqnomasi
├── README_UZ.md                # O'zbek README
├── package.json
└── vite.config.js
```

---

## 🌍 Til O'zgartirish

### Foydalanuvchi uchun:
Navbar'dagi til tugmasini bosing va tilni tanlang:
- 🇺🇿 O'zbek
- 🇬🇧 English
- 🇷🇺 Русский

### Dasturchi uchun:

```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  
  // Tilni o'zgartirish
  i18n.changeLanguage('uz'); // 'uz', 'en', 'ru'
  
  // Tarjimadan foydalanish
  return <h1>{t('home.hero.title')}</h1>;
}
```

### Yangi tarjima qo'shish:

`src/i18n/i18n.js` faylida:

```javascript
const resources = {
  uz: {
    translation: {
      "yangi.kalit": "Yangi qiymat"
    }
  },
  en: {
    translation: {
      "yangi.kalit": "New value"
    }
  },
  ru: {
    translation: {
      "yangi.kalit": "Новое значение"
    }
  }
};
```

---

## 🎨 Dizayn Tizimi

### Ranglar:
```css
--primary: #2563eb;           /* Asosiy rang */
--primary-hover: #1d4ed8;     /* Hover holati */
--text-dark: #1e293b;         /* Qora matn */
--text-light: #64748b;        /* Kulrang matn */
--bg-light: #f8fafc;          /* Och fon */
```

### Shriftlar:
- **Asosiy:** Poppins (Google Fonts)
- **O'lchamlar:** 14px - 42px
- **Og'irliklar:** 300, 400, 500, 600, 700

### Animatsiyalar:
- **Transition:** 0.3s ease
- **Hover:** translateY(-2px)
- **Scale:** 1.05 - 1.1

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 480px) { ... }

/* Tablet */
@media (max-width: 768px) { ... }

/* Desktop kichik */
@media (max-width: 992px) { ... }

/* Desktop katta */
@media (max-width: 1200px) { ... }
```

---

## 🔧 Sozlamalar

### Telegram Bot
`src/config/telegram.js` faylida:
```javascript
const TELEGRAM_BOT_TOKEN = 'SIZNING_TOKENINGIZ';
const TELEGRAM_CHAT_ID = 'SIZNING_CHAT_ID_INGIZ';
```

### Default Til
`src/i18n/i18n.js` faylida:
```javascript
lng: localStorage.getItem('language') || 'uz'
```

---

## 🐛 Muammolarni Hal Qilish

### Telegram xabar kelmayapti?
1. TOKEN to'g'riligini tekshiring
2. Chat ID to'g'riligini tekshiring
3. Bot admin ekanligini tekshiring
4. Brauzer konsolini tekshiring (F12)

### Til almashtirilmayapti?
1. Brauzer konsolini tekshiring
2. localStorage'ni tozalang
3. Sahifani yangilang (Ctrl+R)

### Animatsiyalar ishlamayapti?
1. Framer Motion o'rnatilganligini tekshiring
2. `npm install` ni qayta ishga tushiring

---

## 📝 Litsenziya

© 2026 Wall Street Learning Center. Barcha huquqlar himoyalangan.

---

## 👨‍💻 Muallif

**Wall Street LC Development Team**

---

## 📞 Aloqa

- **Manzil:** 23 Mahmud ko'chasi, Farg'ona shahri
- **Telefon:** +998 97 418 00 70
- **Email:** info@wallstreet.uz
- **Website:** http://localhost:5174/

---

## 🎉 Minnatdorchilik

- React jamoasiga
- Framer Motion jamoasiga
- i18next jamoasiga
- Barcha open-source hissa qo'shuvchilarga

---

**Muvaffaqiyatlar! 🚀**

*Agar savollar bo'lsa, `TELEGRAM_BOT_SETUP.md` faylini o'qing yoki bizga murojaat qiling.*
