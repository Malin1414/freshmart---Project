// src/components/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <h1 className="page-title">
          <i className="fas fa-info-circle"></i> About GreenMart
        </h1>
        
        <div className="card">
          <h2>Our Story</h2>
          <p>
            Founded in 2023, GreenMart was born from a simple idea: to make fresh, 
            high-quality groceries accessible to everyone with just a few clicks. 
            We believe that everyone deserves convenient access to nutritious food 
            without compromising on quality or sustainability.
          </p>
          
          <h2>Our Mission</h2>
          <p>
            To revolutionize grocery shopping by providing a seamless online experience 
            that saves time, reduces food waste, and supports sustainable farming practices. 
            We're committed to connecting communities with fresh, local produce and pantry essentials.
          </p>
          
          <h2>Why Choose GreenMart?</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px', 
            marginTop: '20px' 
          }}>
            <div className="feature">
              <h3><i className="fas fa-leaf" style={{ color: 'var(--primary-green)' }}></i> Fresh & Organic</h3>
              <p>We partner with local farmers to bring you the freshest organic produce available.</p>
            </div>
            <div className="feature">
              <h3><i className="fas fa-shipping-fast" style={{ color: 'var(--primary-green)' }}></i> Fast Delivery</h3>
              <p>Get your groceries delivered to your doorstep within 2 hours or schedule for later.</p>
            </div>
            <div className="feature">
              <h3><i className="fas fa-recycle" style={{ color: 'var(--primary-green)' }}></i> Sustainable Packaging</h3>
              <p>We use eco-friendly, biodegradable packaging to minimize our environmental impact.</p>
            </div>
            <div className="feature">
              <h3><i className="fas fa-hand-holding-usd" style={{ color: 'var(--primary-green)' }}></i> Best Prices</h3>
              <p>Competitive pricing with regular discounts and loyalty rewards for our customers.</p>
            </div>
          </div>
          
          <h2>Our Team</h2>
          <p>
            We're a diverse group of food enthusiasts, tech experts, and logistics professionals 
            working together to make grocery shopping easier for you. Our team is dedicated to 
            providing exceptional service and continuously improving your shopping experience.
          </p>
          
          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'var(--background)', borderRadius: '8px' }}>
            <h3>Our Values</h3>
            <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
              <li>Quality: We never compromise on the quality of our products</li>
              <li>Sustainability: We support eco-friendly practices and local farmers</li>
              <li>Customer Focus: Your satisfaction is our top priority</li>
              <li>Innovation: We constantly improve our technology and services</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

