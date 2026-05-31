import React from 'react';
import { useTranslation } from 'react-i18next';
import './Location.css';

function Location() {
  const { t } = useTranslation();
  
  const workingHours = [
    { day: t('location.monday'), time: "08:00 – 20:30" },
    { day: t('location.tuesday'), time: "08:00 – 18:30" },
    { day: t('location.wednesday'), time: "08:00 – 20:30" },
    { day: t('location.thursday'), time: "08:00 – 20:30" },
    { day: t('location.friday'), time: "08:00 – 20:30" },
    { day: t('location.saturday'), time: "08:00 – 20:30" },
    { day: t('location.sunday'), time: t('location.closed'), isHoliday: true }
  ];

  return (
    <div className="location-section">
      <div className="container">
        <div className="location-grid">
          
          <div className="info-side">
          
            <div className="info-card address-card">
              <h3>{t('location.title')}</h3>
              <div className="info-row">
                <i className="fa-solid fa-location-dot"></i>
                <span>{t('location.address')}</span>
              </div>
              <div className="info-row">
                <i className="fa-solid fa-phone"></i>
                <span>{t('location.phone')}</span>
              </div>
            </div>

            <div className="info-card hours-card">
              <h3><i className="fa-solid fa-clock"></i> {t('location.hours')}</h3>
              <div className="hours-list">
                {workingHours.map((item, index) => (
                  <div key={index} className={`hour-item ${item.isHoliday ? 'holiday' : ''}`}>
                    <span className="day-name">{item.day}</span>
                    <span className="day-time">{item.time}</span>
                  </div>
                ))}
              </div>
              <div className="status-footer">
                <span className="status-dot"></span>
                {t('location.status')}
              </div>
            </div>
          </div>

          <div className="map-side">
             <div className="map-header">
                <a href="https://www.google.com/maps" target="_blank" rel="noreferrer">
                   {t('location.openmap')} <i className="fa-solid fa-up-right-from-square"></i>
                </a>
             </div>
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.727768565985!2d71.78184537651036!3d40.38164395781358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb8346083c271d%3A0x6966cf17f54924c8!2zMjMgTWFraG11ZCBTdCwgRmVyZ2FuYSwgVXpiZWtpc3Rhbg!5e0!3m2!1sen!2s!4v1711234567890!5m2!1sen!2s"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Google Maps"
              ></iframe>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Location;