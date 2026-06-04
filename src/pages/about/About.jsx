import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';

function About() {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const observerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('courses');
    if (saved) {
      setCourses(JSON.parse(saved));
    } else {
      const defaultCourses = [
        {
          id: 1,
          level: "Beginner",
          title: "Everyday English A1",
          desc: "Learn how to say 'hello' and 'goodbye'. Learn the most important words for daily life.",
          duration: "12",
          schedule: "3",
          color: "#e6f9ed",
          tagColor: "#22c55e"
        },
        {
          id: 2,
          level: "Elementary",
          title: "English in Action A2",
          desc: "Learn more new words. Start speaking confidently about simple things that happen every day.",
          duration: "12",
          schedule: "3",
          color: "#e6fcf5",
          tagColor: "#0ca678"
        },
        {
          id: 3,
          level: "Pre-Intermediate",
          title: "Communicate Clearly B1",
          desc: "Learn to give your opinion. Talk about your past experiences. Speak easily when you travel or work.",
          duration: "14",
          schedule: "3",
          color: "#e7f5ff",
          tagColor: "#228be6"
        },
        {
          id: 4,
          level: "Intermediate",
          title: "Confident English B2",
          desc: "Talk freely with native speakers. Discuss different interesting topics and understand harder texts.",
          duration: "16",
          schedule: "4",
          color: "#f3f0ff",
          tagColor: "#7950f2"
        },
        {
          id: 5,
          level: "Upper-Intermediate",
          title: "Professional English C1",
          desc: "Use perfect grammar. Learn to write business emails and give professional presentations at work.",
          duration: "16",
          schedule: "4",
          color: "#fff4ff",
          tagColor: "#d6336c"
        }
      ];
      setCourses(defaultCourses);
      localStorage.setItem('courses', JSON.stringify(defaultCourses));
    }
  }, []);

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
  }, [courses]);

  return (
    <div className="courses-section">
      <div className="container">
        <div className="top scroll-animate">
          <div className="top1">
            <h1>{t('about.title')}</h1>
            <p>{t('about.subtitle')}</p>
          </div>
        </div>

        <div className="courses-grid scroll-animate">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-card__header">
                <span className="course-badge" style={{ backgroundColor: course.color, color: course.tagColor }}>
                  {t(`level.${course.level.toLowerCase().replace('-', '')}`)}
                </span>
              </div>
              <h3 className="course-card__title">{course.title}</h3>
              <p className="course-card__desc">{course.desc}</p>
              <div className="course-card__footer">
                <span><i className="fa-regular fa-clock"></i> {course.duration} {t('about.weeks')}</span>
                <span><i className="fa-solid fa-calendar-days"></i> {course.schedule}{t('about.perweek')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;