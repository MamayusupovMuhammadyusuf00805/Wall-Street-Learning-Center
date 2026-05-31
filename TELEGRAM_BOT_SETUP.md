# 📱 Telegram Bot Sozlash - Oddiy Yo'riqnoma

## Video Yo'riqnoma 🎥

Agar matnli yo'riqnoma tushunarsiz bo'lsa, YouTube'da "Telegram bot yaratish" deb qidiring.

---

## 1️⃣ Bot Yaratish (5 daqiqa)

### Qadam 1: BotFather ni toping
1. Telegram ilovasini oching
2. Qidiruv qismiga `@BotFather` yozing
3. **Rasmiy** BotFather botini tanlang (ko'k galochka bilan)

### Qadam 2: Bot yarating
1. BotFather'ga `/newbot` yuboring
2. Bot nomini yozing: `Wall Street Registration`
3. Bot username yozing: `wallstreet_reg_bot` (bot bilan tugashi kerak)
4. **TOKEN ni nusxalang va saqlang!** ✅

**Misol TOKEN:**
```
7989876543:AAHexampleTokenReplaceWithYourRealToken
```

---

## 2️⃣ Guruh Yaratish va Chat ID Olish (3 daqiqa)

### Qadam 1: Guruh yarating
1. Telegram'da yangi guruh yarating
2. Nom: `Wall Street Registrations`

### Qadam 2: Botni qo'shing
1. Guruhga a'zolar qo'shish tugmasini bosing
2. Yaratgan botingizni toping va qo'shing

### Qadam 3: Botni admin qiling
1. Guruh sozlamalariga kiring (3 nuqta)
2. **Administratorlar** → **Administrator qo'shish**
3. Botni tanlang va **Xabar yuborish** huquqini bering ✅

### Qadam 4: Test xabar yuboring
1. Guruhga biror xabar yozing: `Test`

### Qadam 5: Chat ID ni oling
1. **Brauzerda** quyidagi linkni oching:
```
https://api.telegram.org/bot<TOKENINGIZ>/getUpdates
```

2. `<TOKENINGIZ>` o'rniga yuqoridagi TOKEN ni qo'ying

**Misol:**
```
https://api.telegram.org/bot7989876543:AAHexampleToken/getUpdates
```

3. Sahifada JSON ko'rinishida ma'lumot chiqadi
4. `"chat":{"id":-1001234567890` kabi raqamni toping
5. **Bu raqamni nusxalang!** (Minus belgisi bilan) ✅

**Misol Chat ID:**
```
-1001234567890
```

---

## 3️⃣ Loyihaga Qo'shish (2 daqiqa)

### Qadam 1: Faylni oching
```
src/config/telegram.js
```

### Qadam 2: TOKEN va Chat ID ni o'zgartiring

**ESKI:**
```javascript
const TELEGRAM_BOT_TOKEN = '7989876543:AAHexampleTokenReplaceWithYourRealToken';
const TELEGRAM_CHAT_ID = '-1001234567890';
```

**YANGI (o'z ma'lumotlaringiz bilan):**
```javascript
const TELEGRAM_BOT_TOKEN = 'SIZNING_TOKENINGIZ';
const TELEGRAM_CHAT_ID = 'SIZNING_CHAT_ID_INGIZ';
```

### Qadam 3: Saqlang
`Ctrl + S` yoki `Cmd + S`

---

## 4️⃣ Tekshirish (1 daqiqa)

1. **Saytni oching:** http://localhost:5174
2. **"Sign in" tugmasini bosing**
3. **Ism va telefon kiriting**
4. **"Register Now" tugmasini bosing**
5. **Telegram guruhingizni tekshiring** ✅

**Xabar kelishi kerak:**
```
🎓 Yangi ro'yxatdan o'tish!

👤 Ism: Test User
📱 Telefon: +998 90 123 45 67
📅 Sana: 30 may 2026, 14:30

✅ Iltimos, tez orada bog'laning!
```

---

## ❌ Muammolar va Yechimlar

### Xabar kelmayapti?

#### 1. TOKEN xato
- BotFather'dan qayta TOKEN oling
- To'g'ri nusxaladingizmi?
- Bo'sh joy yoki qo'shimcha belgilar yo'qmi?

#### 2. Chat ID xato
- getUpdates linkini qayta oching
- Minus belgisini unutdingizmi?
- Guruh ID si `-100` bilan boshlanadi

#### 3. Bot admin emas
- Guruh sozlamalariga kiring
- Botni admin qiling
- **Xabar yuborish** huquqini bering

#### 4. Kod xatosi
- Brauzer konsolini oching (F12)
- Console tabida xatolik bormi?
- Xatolik xabarini o'qing

---

## 📸 Skrinshotlar Bilan Yo'riqnoma

### 1. BotFather
```
Siz: /newbot
BotFather: Alright, a new bot. How are we going to call it?
Siz: Wall Street Registration
BotFather: Good. Now let's choose a username for your bot.
Siz: wallstreet_reg_bot
BotFather: Done! Your token is: 7989876543:AAHexample...
```

### 2. getUpdates natijasi
```json
{
  "ok": true,
  "result": [
    {
      "update_id": 123456789,
      "message": {
        "message_id": 1,
        "from": {...},
        "chat": {
          "id": -1001234567890,  ← BU CHAT ID
          "title": "Wall Street Registrations",
          "type": "supergroup"
        },
        "text": "Test"
      }
    }
  ]
}
```

---

## 🔒 Xavfsizlik

⚠️ **MUHIM:**
- TOKEN ni hech kimga bermang
- GitHub'ga yuklamasdan oldin `.env` faylidan foydalaning
- TOKEN ni oshkor qilmang

---

## 💡 Qo'shimcha Ma'lumot

### Xabar formatini o'zgartirish

`src/config/telegram.js` faylida:

```javascript
const message = `
🎓 <b>Yangi talaba!</b>

👤 ${name}
📱 ${phone}

Bog'laning!
`.trim();
```

### Emoji qo'shish
- 🎓 📱 👤 ✅ ❌ 🔥 💡 📅 ⏰
- https://emojipedia.org/ dan ko'proq emoji toping

---

## 📞 Yordam

Agar hali ham ishlamasa:

1. **Telegram Bot API dokumentatsiyasi:**
   https://core.telegram.org/bots/api

2. **BotFather'ga yordam so'rang:**
   `/help` yuboring

3. **YouTube'da qidiring:**
   "Telegram bot yaratish o'zbek tilida"

---

## ✅ Tayyor!

Endi har safar kimdir ro'yxatdan o'tganda, Telegram guruhingizga xabar keladi! 🎉

**Muvaffaqiyatlar! 🚀**

---

**Muallif:** Wall Street LC Development Team
**Sana:** 2026
**Versiya:** 1.0
