// src/components/Contact.jsx
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: ''
    });
  };

  return (
    <div className="contact">
      <div className="container">
        <h1 className="page-title">
          <i className="fas fa-envelope"></i> Contact Us
        </h1>
        
        <div className="card">
          <p>We're here to help! Reach out to us with any questions, feedback, or concerns.</p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px', 
            marginTop: '30px' 
          }}>
            <div>
              <h3>Contact Information</h3>
              <div style={{ marginTop: '20px' }}>
                <p><strong><i className="fas fa-map-marker-alt"></i> Address:</strong></p>
                <p>123 Green Street<br />Eco City, EC 12345<br />Country</p>
                
                <p style={{ marginTop: '20px' }}><strong><i className="fas fa-phone"></i> Phone:</strong></p>
                <p>+1 (555) 123-4567<br />Mon-Fri: 8am-8pm EST</p>
                
                <p style={{ marginTop: '20px' }}><strong><i className="fas fa-envelope"></i> Email:</strong></p>
                <p>info@greenmart.com<br />support@greenmart.com</p>
                
                <p style={{ marginTop: '20px' }}><strong><i className="fas fa-clock"></i> Business Hours:</strong></p>
                <p>Monday - Friday: 8:00 AM - 8:00 PM<br />Saturday: 9:00 AM - 6:00 PM<br />Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
            
            <div>
              <h3>Send Us a Message</h3>
              <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '15px' }}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginTop: '5px' }}
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginTop: '5px' }}
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginTop: '5px' }}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Issue">Order Issue</option>
                    <option value="Product Feedback">Product Feedback</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginTop: '5px' }}
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-paper-plane"></i> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

