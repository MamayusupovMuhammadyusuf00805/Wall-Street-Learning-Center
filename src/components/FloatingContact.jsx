import React, { useState } from 'react';
import './FloatingContact.css';

function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = '+998974180070';
  const telegramUsername = 'wallstreet_lc';

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  const handleTelegram = () => {
    window.open(`https://t.me/${telegramUsername}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="floating-contact">
      {isOpen && (
        <div className="contact-options">
          <button className="contact-btn whatsapp" onClick={handleWhatsApp}>
            <i className="fa-brands fa-whatsapp"></i>
            <span>WhatsApp</span>
          </button>
          <button className="contact-btn telegram" onClick={handleTelegram}>
            <i className="fa-brands fa-telegram"></i>
            <span>Telegram</span>
          </button>
          <button className="contact-btn phone" onClick={handleCall}>
            <i className="fa-solid fa-phone"></i>
            <span>Qo'ng'iroq</span>
          </button>
        </div>
      )}
      
      <button 
        className={`main-contact-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <i className="fa-solid fa-comments"></i>
        )}
      </button>
    </div>
  );
}

export default FloatingContact;
