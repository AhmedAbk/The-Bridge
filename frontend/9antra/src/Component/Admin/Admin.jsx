import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Admin() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && editId) {
        const response = await axios.put(`http://localhost:5000/api/courses/${editId}`, formData);
        setCourses(courses.map(course => course._id === editId ? response.data : course));
        toast.success('Course updated successfully!');
      } else {
        const response = await axios.post('http://localhost:5000/api/courses', formData);
        setCourses([...courses, response.data]);
        toast.success('Course added successfully!');
      }
      setFormData({ title: '', price: '', image: '' });
      setIsEditing(false);
      setEditId(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving course:', error);
      toast.error('Error saving course. Please try again.');
    }
  };

  const handleEdit = (course) => {
    setIsEditing(true);
    setEditId(course._id);
    setFormData({
      title: course.title,
      price: course.price,
      image: course.image
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://localhost:5000/api/courses/${id}`);
        setCourses(courses.filter(course => course._id !== id));
        toast.success('Course deleted successfully!');
      } catch (error) {
        console.error('Error deleting course:', error);
        toast.error('Error deleting course. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', price: '', image: '' });
    setIsEditing(false);
    setEditId(null);
    setShowModal(false);
  };

  return (
    <div className="admin-container">
      <nav className="navbar">
        <img src="https://9antra.tn/content/images/LogoBridge.png" alt="Logo" className="logo" />
        <h1>Course Management</h1>
      </nav>

      <div className="sidebar">
        <button onClick={() => setShowModal(true)}>Add Course</button>
      </div>

      <div className="courses-list">
        <h2>Available Courses</h2>
        <div className="courses-grid">
          {courses.map((course) => (
            <div className="course-card" key={course._id}>
              <img src={course.image} alt={course.title} className="course-image" />
              <h3>{course.title}</h3>
              <p>{course.price} DT/Month</p>
              <div className="course-actions">
                <button onClick={() => handleEdit(course)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(course._id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className={`modal ${showModal ? 'show' : ''}`}>
          <div className="modal-content">
            <button className="modal-close" onClick={handleCancel}>
              &times;
            </button>
            <h2>{isEditing ? 'Edit Course' : 'Add New Course'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Course Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="price"
                  placeholder="Course Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-buttons">
                <button type="submit">{isEditing ? 'Update Course' : 'Add Course'}</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Admin;
