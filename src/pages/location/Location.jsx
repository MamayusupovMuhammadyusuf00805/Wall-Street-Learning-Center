import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Location.css';

function Location() {
  const { t } = useTranslation();
  const observerRef = useRef(null);
  
  const workingHours = [
    { day: t('location.monday'), time: "08:00 – 20:30" },
    { day: t('location.tuesday'), time: "08:00 – 18:30" },
    { day: t('location.wednesday'), time: "08:00 – 20:30" },
    { day: t('location.thursday'), time: "08:00 – 20:30" },
    { day: t('location.friday'), time: "08:00 – 20:30" },
    { day: t('location.saturday'), time: "08:00 – 20:30" },
    { day: t('location.sunday'), time: t('location.restDay'), isHoliday: true }
  ];

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

  return (
    <div className="location-section">
      <div className="location-background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="container">
        <div className="location-header scroll-animate">
          <div className="header-content">
            <span className="header-badge">
              <i className="fa-solid fa-map-location-dot"></i>
              {t('location.findUs')}
            </span>
            <h1>{t('location.title')}</h1>
            <p>{t('location.subtitle')}</p>
          </div>
        </div>

        <div className="location-grid scroll-animate">
          
          <div className="info-side">
          
            <div className="info-card address-card">
              <div className="card-icon-wrapper">
                <div className="card-icon">
                  <i className="fa-solid fa-building"></i>
                </div>
              </div>
              <h3>{t('location.ourAddress')}</h3>
              
              <div className="info-details">
                <div className="info-row">
                  <div className="info-icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="info-text">
                    <span className="info-label">{t('location.addressLabel')}</span>
                    <span className="info-value">{t('location.address')}</span>
                  </div>
                </div>
                
                <div className="info-row">
                  <div className="info-icon">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="info-text">
                    <span className="info-label">{t('location.phoneLabel')}</span>
                    <span className="info-value">{t('location.phone')}</span>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="info-text">
                    <span className="info-label">{t('location.emailLabel')}</span>
                    <span className="info-value">info@wallstreet.uz</span>
                  </div>
                </div>
              </div>

              <div className="action-buttons">
                <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="action-btn primary">
                  <i className="fa-solid fa-location-arrow"></i>
                  {t('location.getDirections')}
                </a>
                <a href="tel:+998974180070" className="action-btn secondary">
                  <i className="fa-solid fa-phone-volume"></i>
                  {t('location.callNow')}
                </a>
              </div>
            </div>

            <div className="info-card hours-card">
              <div className="hours-header">
                <div className="hours-icon">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div className="hours-title">
                  <h3>{t('location.hours')}</h3>
                  <p>{t('location.hoursSubtitle')}</p>
                </div>
              </div>
              
              <div className="hours-list">
                {workingHours.map((item, index) => (
                  <div key={index} className={`hour-item ${item.isHoliday ? 'holiday' : ''}`}>
                    <span className="day-name">{item.day}</span>
                    <span className="day-separator"></span>
                    <span className="day-time">{item.time}</span>
                  </div>
                ))}
              </div>
              
              <div className="status-footer">
                <div className="status-indicator">
                  <span className="status-dot"></span>
                  <span className="status-text">{t('location.status')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="map-side">
             <div className="map-overlay-controls">
                <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="map-control-btn">
                   <i className="fa-solid fa-expand"></i>
                   {t('location.openmap')}
                </a>
                <button className="map-control-btn zoom-btn">
                  <i className="fa-solid fa-location-crosshairs"></i>
                </button>
             </div>
             
             <div className="map-wrapper">
               <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.727768565985!2d71.78184537651036!3d40.38164395781358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb8346083c271d%3A0x6966cf17f54924c8!2zMjMgTWFraG11ZCBTdCwgRmVyZ2FuYSwgVXpiZWtpc3Rhbg!5e0!3m2!1sen!2s!4v1711234567890!5m2!1sen!2s"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                  title="Google Maps Location"
                ></iframe>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Location;