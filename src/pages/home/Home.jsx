import React, { useEffect, useRef } from "react";
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const courseData = [
    { id: 1, text: t('home.course1') },
    { id: 2, text: t('home.course2') },
    { id: 3, text: t('home.course3') },
    { id: 4, text: t('home.course4') },
    { id: 5, text: t('home.course5') },
  ];

  return (
    <div className="homepage">
      <div className="container">
        <div className="hero">
          <h3>
            <i className="fa-solid fa-graduation-cap"></i>{t('home.hero.title')}
          </h3>
          <h1>
            {t('home.hero.subtitle').split(' ').slice(0, 3).join(' ')} <span>{t('home.hero.subtitle').split(' ').slice(3).join(' ')}</span>
          </h1>
          <p>
            {t('home.hero.description')}
          </p>
        </div>
      </div>

      <div className="container">
        <div className="dashboard-stats scroll-animate">
          <div className="stat-item">
            <div className="stat-icon-box bg-light-blue">
              <i className="fa-solid fa-users"></i>
            </div>
            <div className="stat-info">
              <h2 className="stat-number">1500</h2>
              <p className="stat-title">{t('home.stats.students')}</p>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon-box bg-light-purple">
              <i className="fa-solid fa-book-open"></i>
            </div>
            <div className="stat-info">
              <h2 className="stat-number">6</h2>
              <p className="stat-title">{t('home.stats.courses')}</p>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon-box bg-light-yellow">
              <i className="fa-solid fa-chart-simple"></i>
            </div>
            <div className="stat-info">
              <h2 className="stat-number">1</h2>
              <p className="stat-title">{t('home.stats.tests')}</p>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon-box bg-light-green">
              <i className="fa-regular fa-star"></i>
            </div>
            <div className="stat-info">
              <h2 className="stat-number">96%</h2>
              <p className="stat-title">{t('home.stats.score')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="level-card scroll-animate">
          <h3 className="level-card__title">{t('home.levels.title')}</h3>

          <div className="level-card__list">
            <div className="level-row">
              <div className="level-row__badge level-row__badge--blue">
                Pre-Intermediate
              </div>
              <div className="level-row__progress-wrapper">
                <div className="level-row__progress-fill1"></div>
              </div>
              <span className="level-row__count">18</span>
            </div>

            <div className="level-row">
              <div className="level-row__badge level-row__badge--indigo">
                Intermediate
              </div>
              <div className="level-row__progress-wrapper">
                <div className="level-row__progress-fill1"></div>
              </div>
              <span className="level-row__count">33</span>
            </div>

            <div className="level-row">
              <div className="level-row__badge level-row__badge--purple">
                Upper-Intermediate
              </div>
              <div className="level-row__progress-wrapper">
                <div className="level-row__progress-fill1"></div>
              </div>
              <span className="level-row__count">49</span>
            </div>

            <div className="level-row">
              <div className="level-row__badge level-row__badge--red">
                Advanced
              </div>
              <div className="level-row__progress-wrapper">
                <div className="level-row__progress-fill1"></div>
              </div>
              <span className="level-row__count">59</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section1">
        <div className="container">
          <div className="part1 scroll-animate">
            <div className="info">
              <h1>{t('home.section1.title')}</h1>
              <h1>{t('home.section1.guarantee')}</h1>
              <h3>{t('home.section1.guarantee.desc')}</h3>

              <h1>{t('home.section1.groups')}</h1>
              <h3>{t('home.section1.groups.desc')}</h3>

              <h1>{t('home.section1.immersion')}</h1>
              <h3>{t('home.section1.immersion.desc')}</h3>

              <h1>{t('home.section1.experts')}</h1>
              <h3>{t('home.section1.experts.desc')}</h3>

              <h4>{t('home.section1.quote')}</h4>
            </div>
            <div className="main_img">
              <img
                src="/imgs/Gemini_Generated_Image_69q1t969q1t969q1.png"
                alt="Wall Street Learning"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="section2">
        <div className="container">
          <div className="course-wrapper scroll-animate">
            <div className="course-header">
              <h2>{t('home.section2.title')}</h2>
            </div>

            <div className="course-list">
              {courseData.map((course) => (
                <div
                  key={course.id}
                  className="course-item"
                  onClick={() => navigate('/about')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="course-item__icon">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                  <span className="course-item__text">{course.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;