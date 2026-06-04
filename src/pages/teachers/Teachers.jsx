import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Teachers.css';

function Teachers() {
  const { t } = useTranslation();
  const [teachers, setTeachers] = useState([]);
  const observerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('teachers');
    if (saved) {
      setTeachers(JSON.parse(saved));
    } else {
      const defaultTeachers = [
        {
          id: 1,
          name: "Doniyorbek Abdurahmonov",
          position: "IELTS Expert & Head Teacher",
          experience: "10+ yil tajriba",
          education: "Cambridge CELTA, TESOL",
          image: "/imgs/doniyorbek.jpg",
          specialization: "IELTS, Academic English",
          rating: 5
        },
        {
          id: 2,
          name: "Ulu'gbek Ergashov",
          position: "General English Teacher",
          experience: "10+ yil tajriba",
          education: "MA in English Literature",
          image: "/imgs/ulugbek.jpg",
          specialization: "Speaking, Grammar",
          rating: 5
        },
        {
          id: 3,
          name: "Sitora Tohirjonova",
          position: "Business English Specialist",
          experience: "5+ yil tajriba",
          education: "MBA, TESOL Certificate",
          image: "/imgs/sitora.jpg",
          specialization: "Business English, Presentations",
          rating: 5
        }
      ];
      setTeachers(defaultTeachers);
      localStorage.setItem('teachers', JSON.stringify(defaultTeachers));
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        elements.forEach((el) => observerRef.current.unobserve(el));
      }
    };
  }, [teachers]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <i key={index} className={`fa-solid fa-star ${index < rating ? 'filled' : ''}`}></i>
    ));
  };

  return (
    <div className="teachers-page">
      <div className="container">
        <div className="teachers-header scroll-animate">
          <h1>Bizning o'qituvchilar</h1>
          <p>Professional va tajribali mutaxassislar</p>
        </div>

        <div className="teachers-grid scroll-animate">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="teacher-card">
              <div className="teacher-image-wrapper">
                <img src={teacher.image} alt={teacher.name} className="teacher-image" />
                <div className="teacher-overlay">
                  <div className="rating">
                    {renderStars(teacher.rating)}
                  </div>
                </div>
              </div>
              <div className="teacher-content">
                <h3>{teacher.name}</h3>
                <p className="teacher-position">{teacher.position}</p>
                <div className="teacher-details">
                  <div className="detail-item">
                    <i className="fa-solid fa-briefcase"></i>
                    <span>{teacher.experience}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fa-solid fa-graduation-cap"></i>
                    <span>{teacher.education}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fa-solid fa-star"></i>
                    <span>{teacher.specialization}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teachers;
