import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { sendToTelegram } from '../../config/telegram';
import "./Community.css"

function Community() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: 'General English'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ type: '', text: '' });
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        elements.forEach((el) => observerRef.current.unobserve(el));
      }
    };
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlertMessage({ type: '', text: '' });

    try {
      const message = `🎉 YANGI A'ZO - COMMUNITY\n\n👤 Ism: ${formData.name}\n📱 Telefon: ${formData.phone}\n📚 Kurs: ${formData.course}`;
      
      const result = await sendToTelegram(message);
      
      if (result.success) {
        setAlertMessage({ type: 'success', text: t('navbar.modal.success') });
        setFormData({ name: '', phone: '', course: 'General English' });
        setTimeout(() => {
          setIsModalOpen(false);
          setAlertMessage({ type: '', text: '' });
        }, 2000);
      } else {
        setAlertMessage({ type: 'error', text: t('navbar.modal.error') });
      }
    } catch (error) {
      console.error('Xatolik:', error);
      setAlertMessage({ type: 'error', text: t('navbar.modal.error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const communityData = [
    {
      id: 1,
      icon: "fa-users",
      title: t('community.card1.title'),
      desc: t('community.card1.desc'),
      color: "#3b82f6"
    },
    {
      id: 2,
      icon: "fa-comments",
      title: t('community.card2.title'),
      desc: t('community.card2.desc'),
      color: "#8b5cf6"
    },
    {
      id: 3,
      icon: "fa-calendar-days",
      title: t('community.card3.title'),
      desc: t('community.card3.desc'),
      color: "#ec4899"
    },
    {
      id: 4,
      icon: "fa-trophy",
      title: t('community.card4.title'),
      desc: t('community.card4.desc'),
      color: "#f59e0b"
    },
    {
      id: 5,
      icon: "fa-book-open",
      title: t('community.card5.title'),
      desc: t('community.card5.desc'),
      color: "#10b981"
    },
    {
      id: 6,
      icon: "fa-handshake",
      title: t('community.card6.title'),
      desc: t('community.card6.desc'),
      color: "#06b6d4"
    }
  ];

  return (
    <div className="community-page">
      <div className="container">
        <div className="community-header">
          <h1>{t('community.title')}</h1>
          <p>{t('community.subtitle')}</p>
        </div>

        <div className="community-grid scroll-animate">
          {communityData.map((item, index) => (
            <div 
              key={item.id} 
              className="community-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="community-icon" style={{ backgroundColor: item.color }}>
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="cta-section scroll-animate">
          <h2>{t('community.cta.title')}</h2>
          <p>{t('community.cta.desc')}</p>
          <button className="cta-button" onClick={() => setIsModalOpen(true)}>
            <i className="fa-solid fa-user-plus"></i> {t('community.cta.button')}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            
            <div className="modal-header">
              <i className="fa-solid fa-user-plus"></i>
              <h2>{t('community.modal.title')}</h2>
              <p>{t('community.modal.subtitle')}</p>
            </div>

            {alertMessage.text && (
              <div className={`alert alert-${alertMessage.type}`}>
                <i className={`fa-solid ${alertMessage.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
                {alertMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>
                  <i className="fa-solid fa-user"></i> {t('navbar.modal.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('navbar.modal.namePlaceholder')}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="fa-solid fa-phone"></i> {t('navbar.modal.phone')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+998 90 123 45 67"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="fa-solid fa-book"></i> {t('navbar.modal.course')}
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                >
                  <option value="General English">General English</option>
                  <option value="IELTS Preparation">IELTS Preparation</option>
                  <option value="Business English">Business English</option>
                  <option value="Kids English">Kids English</option>
                </select>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i> {t('navbar.modal.sending')}
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane"></i> {t('navbar.modal.submit')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Community