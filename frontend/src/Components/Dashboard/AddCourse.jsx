import React, { useState } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    startDate: '',
    price: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null); // New state for PDF
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', courseData.name);
    formData.append('description', courseData.description);
    formData.append('startDate', courseData.startDate);
    formData.append('price', courseData.price);
    if (imageFile) formData.append('image', imageFile);
    if (pdfFile) formData.append('file', pdfFile); // Append PDF as 'file'

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${BACKEND_URL}/api/courses`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        let errorMessage = 'Failed to add course';
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) errorMessage = errorData.message;
        } catch {
          console.warn('No JSON body in error response');
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setSuccessMessage('Course added successfully!');

      // Reset form
      setCourseData({ name: '', description: '', startDate: '', price: '' });
      setImageFile(null);
      setPdfFile(null);
      e.target.reset();

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred');
      setTimeout(() => setErrorMessage(''), 5000); 
    }
  };

  return (
    <div className="add-course">
      <h2>Add New Course</h2>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Name</label>
          <input type="text" name="name" value={courseData.name} onChange={handleChange} required className="form-control" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={courseData.description} onChange={handleChange} required className="form-control" rows="3"></textarea>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Start Date</label>
            <input type="date" name="startDate" value={courseData.startDate} onChange={handleChange} required className="form-control" />
          </div>

          <div className="form-group col-md-6">
            <label>Price (LKR)</label>
            <input type="number" name="price" value={courseData.price} onChange={handleChange} required className="form-control" min="0" step="0.01" />
          </div>
        </div>

        <div className="form-group">
          <label>Course Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" />
        </div>

        <div className="form-group">
          <label>Course PDF Resource</label>
          <input type="file" accept="application/pdf" onChange={handlePdfChange} className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
