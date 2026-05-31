import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import "./Results.css";

function Results() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null);
  const [results, setResults] = useState([]);
  const observerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('results');
    if (saved) {
      setResults(JSON.parse(saved));
    } else {
      const defaultResults = [
        { id: 1, img: "/imgs/photo_2026-03-25_06-20-08.jpg", name: "Student 1", score: "7.5" },
        { id: 2, img: "/imgs/photo_2026-03-25_06-20-08 (2).jpg", name: "Student 2", score: "8.0" },
        { id: 3, img: "/imgs/photo_2026-03-25_06-20-09.jpg", name: "Student 3", score: "7.0" },
        { id: 4, img: "/imgs/photo_2026-03-25_06-20-09 (2).jpg", name: "Student 4", score: "6.5" },
        { id: 5, img: "/imgs/photo_2026-03-25_06-20-09 (3).jpg", name: "Student 5", score: "7.5" },
        { id: 6, img: "/imgs/photo_2026-03-25_06-20-09 (4).jpg", name: "Student 6", score: "8.5" },
        { id: 7, img: "/imgs/photo_2026-03-25_06-20-09 (5).jpg", name: "Student 7", score: "7.0" },
        { id: 8, img: "/imgs/photo_2026-03-25_06-20-09 (6).jpg", name: "Student 8", score: "6.5" },
        { id: 9, img: "/imgs/photo_2026-03-25_06-20-09 (7).jpg", name: "Student 9", score: "7.5" },
        { id: 10, img: "/imgs/photo_2026-03-25_06-20-09 (8).jpg", name: "Student 10", score: "8.0" },
        { id: 11, img: "/imgs/photo_2026-03-25_06-36-00.jpg", name: "Student 11", score: "7.0" },
        { id: 12, img: "/imgs/photo_2026-03-25_06-37-27.jpg", name: "Student 12", score: "7.5" },
        { id: 13, img: "/imgs/photo_2026-03-25_06-37-18.jpg", name: "Student 13", score: "8.0" },
        { id: 14, img: "/imgs/photo_2026-03-25_06-37-18 (2).jpg", name: "Student 14", score: "6.5" },
        { id: 15, img: "/imgs/photo_2026-03-25_06-41-13.jpg", name: "Student 15", score: "7.5" },
        { id: 16, img: "/imgs/ielts.jpg", name: "Student 16", score: "8.5" },
        { id: 17, img: "/imgs/photo_2026-04-08_20-39-21.jpg", name: "Student 17", score: "7.0" },
        { id: 18, img: "/imgs/photo_2026-04-24_21-25-16.jpg", name: "Student 18", score: "7.5" },
        { id: 19, img: "/imgs/photo_2026-04-09_21-14-00.jpg", name: "Student 19", score: "8.0" },
        { id: 20, img: "/imgs/photo_2026-04-24_21-28-09.jpg", name: "Student 20", score: "7.5" },
      ];
      setResults(defaultResults);
      localStorage.setItem('results', JSON.stringify(defaultResults));
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
  }, [results]);

  return (
    <div className="resultspage">
      <div className="container">
        <div className="results-header scroll-animate">
          <h1 className="res1">{t('results.title')}</h1>
          <p className="res2">{t('results.subtitle')}</p>
          <button className="admin-link-btn" onClick={() => navigate('/admin')}>
            <i className="fa-solid fa-user-shield"></i> Admin Panel
          </button>
        </div>
        <div className="results-grid scroll-animate">
          {results.length === 0 ? (
            <div className="empty-state">
              <i className="fa-solid fa-trophy"></i>
              <h3>Natijalar hali yo'q</h3>
              <p>Admin paneldan natijalar qo'shing</p>
            </div>
          ) : (
            results.map((item, index) => (
              <div
                key={item.id}
                className="result-card"
                onClick={() => setSelectedImg(item.img)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <img src={item.img} alt={`Result ${item.id}`} className="result-image" />
                <div className="result-overlay">
                  <i className="fa-solid fa-expand"></i>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedImg && (
        <div className="modal-overlay" onClick={() => setSelectedImg(null)}>
          <span className="close-btn" onClick={() => setSelectedImg(null)}>
            &times;
          </span>
          <img
            src={selectedImg}
            alt="Enlarged"
            className="modal-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default Results;