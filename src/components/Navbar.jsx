import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { sendToTelegram } from '../config/telegram';
import DarkModeToggle from './DarkModeToggle';
import "./Navbar.css";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '+998 ' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const dropdown = document.querySelector('.lang-dropdown');
      const langBtn = document.querySelector('.lang-btn');
      if (dropdown && !dropdown.contains(e.target) && !langBtn.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setSubmitStatus(null);
    setFormData({ name: '', phone: '+998 ' });
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      // Faqat harflar va bo'sh joylar ruxsat etiladi
      const onlyLetters = value.replace(/[^a-zA-Zа-яА-ЯўғҳқўҒҲҚЎ\s]/g, '');
      setFormData(prev => ({ ...prev, [name]: onlyLetters }));
    } else if (name === 'phone') {
      // Faqat raqamlar
      const onlyNumbers = value.replace(/\D/g, '');
      
      // 998 ni o'chirmaslik
      if (!onlyNumbers.startsWith('998')) {
        setFormData(prev => ({ ...prev, [name]: '+998 ' }));
        return;
      }
      
      // Raqamlarni formatlash: +998 (XX) XXX-XX-XX
      let formatted = '+998';
      const digits = onlyNumbers.slice(3); // 998 dan keyingi raqamlar
      
      if (digits.length > 0) {
        formatted += ' (' + digits.slice(0, 2);
        if (digits.length > 2) {
          formatted += ') ' + digits.slice(2, 5);
          if (digits.length > 5) {
            formatted += '-' + digits.slice(5, 7);
            if (digits.length > 7) {
              formatted += '-' + digits.slice(7, 9);
            }
          }
        } else {
          formatted += ')';
        }
      }
      
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Telefon raqamdan faqat raqamlarni olish
    const phoneDigits = formData.phone.replace(/\D/g, '');
    
    if (!formData.name || phoneDigits.length < 12) {
      alert('Iltimos, barcha maydonlarni to\'ldiring!');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await sendToTelegram(formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', phone: '+998 ' });
      
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus(null);
      }, 2000);
      
    } catch (error) {
      console.error('Xatolik:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <nav className={`navbar-main ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="bar">
            <div className="logo-section">
              <NavLink to="/">
                <img src="/imgs/photo_2026-05-29_11-53-09-removebg-preview.png" alt="Wall Street Logo" />
              </NavLink>
            </div>

            <div
              className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
              onClick={toggleMobileMenu}
            >
              <span className="bar-line"></span>
              <span className="bar-line"></span>
              <span className="bar-line"></span>
            </div>

            <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {t('nav.home')}
                </NavLink>
              </li>
              <li>
                <NavLink to="/about">{t('nav.about')}</NavLink>
              </li>
              <li>
                <NavLink to="/community">{t('nav.community')}</NavLink>
              </li>
              <li>
                <NavLink to="/results">{t('nav.results')}</NavLink>
              </li>
              <li>
                <NavLink to="/testimonials">{t('nav.testimonials')}</NavLink>
              </li>
              <li>
                <NavLink to="/teachers">{t('nav.teachers')}</NavLink>
              </li>
              <li>
                <NavLink to="/location">{t('nav.location')}</NavLink>
              </li>
              <li>
                <NavLink to="/admin" className="admin-nav-link">
                  <i className="fa-solid fa-user-shield"></i>
                  {t('nav.admin')}
                </NavLink>
              </li>
            </ul>

            <div className={`nav-btns ${isMobileMenuOpen ? "active" : ""}`}>
              <DarkModeToggle />
              
              <div className="language-selector">
                <button 
                  type="button" 
                  className="lang-btn"
                  onClick={() => {
                    const dropdown = document.querySelector('.lang-dropdown');
                    dropdown.classList.toggle('active');
                  }}
                >
                  {i18n.language === 'uz' ? '🇺🇿 O\'zbek' : i18n.language === 'en' ? '🇬🇧 English' : '🇷🇺 Русский'}
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
                <div className="lang-dropdown">
                  <div 
                    className={`lang-option ${i18n.language === 'uz' ? 'active' : ''}`}
                    onClick={() => {
                      changeLanguage('uz');
                      document.querySelector('.lang-dropdown').classList.remove('active');
                    }}
                  >
                    <span className="flag">🇺🇿</span>
                    <span>O'zbek</span>
                  </div>
                  <div 
                    className={`lang-option ${i18n.language === 'en' ? 'active' : ''}`}
                    onClick={() => {
                      changeLanguage('en');
                      document.querySelector('.lang-dropdown').classList.remove('active');
                    }}
                  >
                    <span className="flag">🇬🇧</span>
                    <span>English</span>
                  </div>
                  <div 
                    className={`lang-option ${i18n.language === 'ru' ? 'active' : ''}`}
                    onClick={() => {
                      changeLanguage('ru');
                      document.querySelector('.lang-dropdown').classList.remove('active');
                    }}
                  >
                    <span className="flag">🇷🇺</span>
                    <span>Русский</span>
                  </div>
                </div>
              </div>
              
              <button
                type="button"
                className="signin-btn"
                onClick={toggleModal}
              >
                {t('nav.signin')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div className={`reg-overlay ${isModalOpen ? 'active' : ''}`} onClick={toggleModal}>
          <div className={`reg-content ${isModalOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="modal-decoration">
              <div className="decoration-circle circle-1"></div>
              <div className="decoration-circle circle-2"></div>
              <div className="decoration-circle circle-3"></div>
            </div>
            
            <button className="close-x" onClick={toggleModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            
            <div className="modal-icon">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            
            <div className="reg-header">
              <h2>{t('register.title')}</h2>
              <p>{t('register.subtitle')}</p>
            </div>
            
            {submitStatus === 'success' && (
              <div className="alert alert-success">
                <i className="fa-solid fa-circle-check"></i>
                <span>{t('register.success')}</span>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="alert alert-error">
                <i className="fa-solid fa-circle-xmark"></i>
                <span>{t('register.error')}</span>
              </div>
            )}
            
            <form className="reg-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input 
                  type="text" 
                  name="name"
                  placeholder=" "
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                  disabled={isSubmitting}
                  autoComplete="off"
                />
                <i className="fa-solid fa-user"></i>
                <label>{t('register.name')}</label>
              </div>
              <div className="input-group">
                <input 
                  type="text" 
                  name="phone"
                  placeholder="+998 (XX) XXX-XX-XX"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                  disabled={isSubmitting}
                  maxLength="19"
                  autoComplete="off"
                />
                <i className="fa-solid fa-phone"></i>
              </div>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <span>{t('register.button')}...</span>
                  </>
                ) : (
                  <>
                    <span>{t('register.button')}</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </>
                )}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={toggleModal}
                disabled={isSubmitting}
              >
                {t('modal.cancel')}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
