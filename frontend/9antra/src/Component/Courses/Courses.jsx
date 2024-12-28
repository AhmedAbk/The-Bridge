import React, { useEffect, useState } from 'react';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error loading data:', error));
  }, []);

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Découvrez nos cours</h2>
        <button>Voir plus</button>
      </div>

      <div className="course-grid">
        {courses.map((course, index) => (
          <div key={index} className="course-card">
            <div>
              <img src={course.image} alt={course.title} />
            </div>
            <div>
              <h3>{course.title}</h3>
              <p>{course.price} / Mois</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
