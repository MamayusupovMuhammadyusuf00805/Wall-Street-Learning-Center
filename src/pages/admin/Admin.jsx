import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const ADMIN_PASSWORD = 'wallstreet2026'; // Admin paroli

const initialCourses = [
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

const levelStyles = {
  "Beginner": { color: "#e6f9ed", tagColor: "#22c55e" },
  "Elementary": { color: "#e6fcf5", tagColor: "#0ca678" },
  "Pre-Intermediate": { color: "#e7f5ff", tagColor: "#228be6" },
  "Intermediate": { color: "#f3f0ff", tagColor: "#7950f2" },
  "Upper-Intermediate": { color: "#fff4ff", tagColor: "#d6336c" },
  "Advanced": { color: "#fff5f5", tagColor: "#fa5252" }
};

function Admin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' or 'results'
  
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem('results');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedResult, setSelectedResult] = useState(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isResultEditMode, setIsResultEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Parol noto\'g\'ri!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const openAddModal = () => {
    setSelectedCourse({ 
      id: Date.now(), 
      level: "Beginner", 
      title: "", 
      desc: "", 
      duration: "", 
      schedule: "" 
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (course) => {
    setSelectedCourse({ ...course });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCourse({ ...selectedCourse, [name]: value });
  };

  const saveCourse = () => {
    const styles = levelStyles[selectedCourse.level] || levelStyles["Beginner"];
    const finalCourse = { ...selectedCourse, ...styles };

    let updatedCourses;
    if (isEditMode) {
      updatedCourses = courses.map(c => c.id === finalCourse.id ? finalCourse : c);
    } else {
      updatedCourses = [...courses, finalCourse];
    }
    
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setIsModalOpen(false);
  };

  const deleteCourse = (id) => {
    if(window.confirm(t('about.delete') + "?")) {
      const updatedCourses = courses.filter(c => c.id !== id);
      setCourses(updatedCourses);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
    }
  };

  const openAddResultModal = () => {
    setSelectedResult({ 
      id: Date.now(), 
      name: "", 
      score: "", 
      img: "" 
    });
    setImagePreview(null);
    setIsResultEditMode(false);
    setIsResultModalOpen(true);
  };

  const openEditResultModal = (result) => {
    setSelectedResult({ ...result });
    setImagePreview(result.img);
    setIsResultEditMode(true);
    setIsResultModalOpen(true);
  };

  const handleResultInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedResult({ ...selectedResult, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setSelectedResult({ ...selectedResult, img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveResult = () => {
    if (!selectedResult.name || !selectedResult.score || !selectedResult.img) {
      alert("Barcha maydonlarni to'ldiring!");
      return;
    }

    let updatedResults;
    if (isResultEditMode) {
      updatedResults = results.map(r => r.id === selectedResult.id ? selectedResult : r);
    } else {
      updatedResults = [...results, selectedResult];
    }
    
    setResults(updatedResults);
    localStorage.setItem('results', JSON.stringify(updatedResults));
    setIsResultModalOpen(false);
    setImagePreview(null);
  };

  const deleteResult = (id) => {
    if(window.confirm("Natijani o'chirmoqchimisiz?")) {
      const updatedResults = results.filter(r => r.id !== id);
      setResults(updatedResults);
      localStorage.setItem('results', JSON.stringify(updatedResults));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <i className="fa-solid fa-shield-halved"></i>
              <h2>Admin Panel</h2>
              <p>Kurslarni boshqarish uchun parolni kiriting</p>
            </div>
            <form onSubmit={handleLogin} className="login-form">
              <div className="input-group">
                <i className="fa-solid fa-lock"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Parolni kiriting"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              <button type="submit" className="login-btn">
                <i className="fa-solid fa-right-to-bracket"></i>
                Kirish
              </button>
              <button 
                type="button" 
                className="back-btn"
                onClick={() => navigate('/about')}
              >
                <i className="fa-solid fa-arrow-left"></i>
                Orqaga
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <div className="admin-header-left">
            <i className="fa-solid fa-user-shield"></i>
            <div>
              <h1>Admin Panel</h1>
              <p>Kurslar va natijalarni boshqarish</p>
            </div>
          </div>
          <div className="admin-header-right">
            <button className="logout-btn" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i> Chiqish
            </button>
          </div>
        </div>

        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <i className="fa-solid fa-book"></i> Kurslar
          </button>
          <button 
            className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            <i className="fa-solid fa-trophy"></i> Natijalar
          </button>
        </div>

        {activeTab === 'courses' && (
          <>
            <div className="section-header">
              <h2>Kurslar</h2>
              <button className="add-btn" onClick={openAddModal}>
                <i className="fa-solid fa-plus"></i> Kurs qo'shish
              </button>
            </div>

            <div className="courses-grid">
              {courses.map((course) => (
                <div key={course.id} className="course-card">
                  <div className="course-card__header">
                    <span className="course-badge" style={{ backgroundColor: course.color, color: course.tagColor }}>
                      {t(`level.${course.level.toLowerCase().replace('-', '')}`)}
                    </span>
                    <div className="course-card__actions">
                      <button className="icon-btn edit" onClick={() => openEditModal(course)} title="Tahrirlash">
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button className="icon-btn delete" onClick={() => deleteCourse(course.id)} title="O'chirish">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  <h3 className="course-card__title">{course.title}</h3>
                  <p className="course-card__desc">{course.desc}</p>
                  <div className="course-card__footer">
                    <span><i className="fa-regular fa-clock"></i> {course.duration} hafta</span>
                    <span><i className="fa-solid fa-calendar-days"></i> {course.schedule}x/hafta</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'results' && (
          <>
            <div className="section-header">
              <h2>Natijalar</h2>
              <button className="add-btn" onClick={openAddResultModal}>
                <i className="fa-solid fa-plus"></i> Natija qo'shish
              </button>
            </div>

            <div className="results-grid-admin">
              {results.map((result) => (
                <div key={result.id} className="result-card-admin">
                  <img src={result.img} alt={result.name} className="result-img-admin" />
                  <div className="result-info-admin">
                    <h4>{result.name}</h4>
                    <p className="result-score">Ball: {result.score}</p>
                  </div>
                  <div className="result-actions-admin">
                    <button className="icon-btn edit" onClick={() => openEditResultModal(result)} title="Tahrirlash">
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button className="icon-btn delete" onClick={() => deleteResult(result.id)} title="O'chirish">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{isEditMode ? "Kursni tahrirlash" : "Yangi kurs qo'shish"}</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Kurs nomi</label>
                <input type="text" name="title" value={selectedCourse.title} onChange={handleInputChange} placeholder="Masalan: Everyday English A1" />
              </div>
              <div className="form-group">
                <label>Daraja</label>
                <select name="level" value={selectedCourse.level} onChange={handleInputChange}>
                  {Object.keys(levelStyles).map(lvl => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Tavsif</label>
                <textarea name="desc" rows="4" value={selectedCourse.desc} onChange={handleInputChange} placeholder="Kurs haqida qisqacha ma'lumot..."></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Davomiyligi (hafta)</label>
                  <input type="number" name="duration" value={selectedCourse.duration} onChange={handleInputChange} placeholder="12" />
                </div>
                <div className="form-group">
                  <label>Darslar/hafta</label>
                  <input type="number" name="schedule" value={selectedCourse.schedule} onChange={handleInputChange} placeholder="3" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                <i className="fa-solid fa-xmark"></i> Bekor qilish
              </button>
              <button className="btn-save" onClick={saveCourse}>
                <i className="fa-solid fa-check"></i> {isEditMode ? "Saqlash" : "Yaratish"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isResultModalOpen && (
        <div className="modal-overlay" onClick={() => setIsResultModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{isResultEditMode ? "Natijani tahrirlash" : "Yangi natija qo'shish"}</h2>
              <button className="close-btn" onClick={() => setIsResultModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Talaba ismi</label>
                <input 
                  type="text" 
                  name="name" 
                  value={selectedResult.name} 
                  onChange={handleResultInputChange} 
                  placeholder="Masalan: Alisher Valiyev" 
                />
              </div>
              <div className="form-group">
                <label>Ball (IELTS/CEFR)</label>
                <input 
                  type="text" 
                  name="score" 
                  value={selectedResult.score} 
                  onChange={handleResultInputChange} 
                  placeholder="Masalan: 7.5 yoki B2" 
                />
              </div>
              <div className="form-group">
                <label>Natija rasmi</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="file-input"
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setIsResultModalOpen(false)}>
                <i className="fa-solid fa-xmark"></i> Bekor qilish
              </button>
              <button className="btn-save" onClick={saveResult}>
                <i className="fa-solid fa-check"></i> {isResultEditMode ? "Saqlash" : "Yaratish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
