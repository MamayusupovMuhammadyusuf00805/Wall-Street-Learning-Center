import React from "react";
import { useTranslation } from 'react-i18next';
import "./Footer.css";

function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__col">
            <h3 className="footer__logo">
              <i className="fa-solid fa-graduation-cap"></i> Wall Street LC
            </h3>
            <p className="footer__description">
              {t('footer.description')}
            </p>
            <div className="footer__socials">
              <a href="https://www.instagram.com/wallstreet_lc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://t.me/wallstreet_lc" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <i className="fa-brands fa-telegram"></i>
              </a>
              <a href="https://www.facebook.com/wallstreet_lc" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://www.youtube.com/@wallstreet_lc" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="footer__col">
            <h4 className="footer__title">{t('footer.quicklinks')}</h4>
            <ul className="footer__links">
              <li>
                <a href="/">{t('nav.home')}</a>
              </li>
              <li>
                <a href="/about">{t('nav.about')}</a>
              </li>
              <li>
                <a href="/courses">{t('footer.courses')}</a>
              </li>
              <li>
                <a href="/results">{t('nav.results')}</a>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__title">{t('footer.popular')}</h4>
            <ul className="footer__links">
              <li>
                <a href="/ielts">{t('footer.ielts')}</a>
              </li>
              <li>
                <a href="/general">{t('footer.general')}</a>
              </li>
              <li>
                <a href="/kids">{t('footer.kids')}</a>
              </li>
              <li>
                <a href="/business">{t('footer.business')}</a>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__title">{t('footer.contact')}</h4>
            <div className="footer__contact">
              <p>
                <i className="fa-solid fa-location-dot"></i> {t('location.address')}
              </p>
              <p>
                <i className="fa-solid fa-phone"></i> {t('location.phone')}
              </p>
              <p>
                <i className="fa-solid fa-envelope"></i> info@wallstreet.uz
              </p>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
