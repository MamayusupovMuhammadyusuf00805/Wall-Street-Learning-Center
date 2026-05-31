import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './Testimonials.css';

function Testimonials() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);
  const observerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('testimonials');
    if (saved) {
      setTestimonials(JSON.parse(saved));
    } else {
      const defaultTestimonials = [
        {
          id: 1,
          name: "Alisher Valiyev",
          course: "IELTS Preparation",
          rating: 5,
          text: "Wall Street LC da o'qish mening hayotimni o'zgartirdi! IELTS dan 7.5 ball oldim va orzuimdagi universitetga kirdim.",
          image: "/imgs/photo_2026-03-25_06-20-08.jpg",
          date: "2026-05-15"
        },
        {
          id: 2,
          name: "Madina Karimova",
          course: "General English",
          rating: 5,
          text: "Ajoyib o'qituvchilar va zamonaviy metodlar. 6 oyda ingliz tilini erkin gapira boshladim!",
          image: "/imgs/photo_2026-03-25_06-20-09.jpg",
          date: "2026-05-10"
        },
        {
          id: 3,
          name: "Sardor Rahimov",
          course: "Business English",
          rating: 5,
          text: "Professional ingliz tili uchun eng yaxshi joy. Ish joyimda katta yutuqlarga erishdim.",
          image: "/imgs/photo_2026-04-08_20-39-21.jpg",
          date: "2026-04-28"
        },
        {
          id: 4,
          name: "Nilufar Toshmatova",
          course: "IELTS Preparation",
          rating: 5,
          text: "8.0 ball! Rahmat Wall Street LC jamoasiga. Siz eng zo'rsiz!",
          image: "/imgs/photo_2026-04-24_21-25-16.jpg",
          date: "2026-04-20"
        },
        {
          id: 5,
          name: "Javohir Usmonov",
          course: "General English",
          rating: 5,
          text: "Kichik guruhlar va individual yondashuv - bu yerda haqiqatan ham o'rganasiz!",
          image: "/imgs/photo_2026-03-25_06-37-18.jpg",
          date: "2026-04-15"
        },
        {
          id: 6,
          name: "Dilnoza Ahmadova",
          course: "IELTS Preparation",
          rating: 5,
          text: "7.5 ball bilan maqsadimga erishdim. Eng yaxshi o'quv markazi!",
          image: "/imgs/photo_2026-04-09_21-14-00.jpg",
          date: "2026-04-10"
        }
      ];
      setTestimonials(defaultTestimonials);
      localStorage.setItem('testimonials', JSON.stringify(defaultTestimonials));
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
  }, [testimonials]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <i 
        key={index} 
        className={`fa-solid fa-star ${index < rating ? 'filled' : ''}`}
      ></i>
    ));
  };

  return (
    <div className="testimonials-page">
      <div className="container">
        <div className="testimonials-header scroll-animate">
          <h1>Talabalarimiz fikri</h1>
          <p>Bizning muvaffaqiyatimiz - sizning muvaffaqiyatingiz</p>
          <button className="admin-link-btn" onClick={() => navigate('/admin')}>
            <i className="fa-solid fa-user-shield"></i> Admin Panel
          </button>
        </div>

        <div className="testimonials-grid scroll-animate">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-avatar" />
                <div className="testimonial-info">
                  <h3>{testimonial.name}</h3>
                  <p className="course-name">{testimonial.course}</p>
                  <div className="rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <span className="testimonial-date">
                <i className="fa-regular fa-calendar"></i> {new Date(testimonial.date).toLocaleDateString('uz-UZ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
