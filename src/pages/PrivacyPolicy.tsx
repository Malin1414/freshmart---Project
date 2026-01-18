// src/components/PrivacyPolicy.jsx
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <div className="container">
        <h1 className="page-title">
          <i className="fas fa-shield-alt"></i> Privacy Policy
        </h1>
        
        <div className="card">
          <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>
            Last Updated: November 15, 2023
          </p>
          
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, 
            place an order, or contact us. This may include:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
            <li>Personal information (name, email address, phone number)</li>
            <li>Delivery address and billing information</li>
            <li>Payment information (processed securely by our payment partners)</li>
            <li>Communication preferences</li>
          </ul>
          
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
            <li>Process and deliver your orders</li>
            <li>Communicate with you about orders, products, services, and promotions</li>
            <li>Improve our services and develop new features</li>
            <li>Prevent fraud and enhance security</li>
            <li>Comply with legal obligations</li>
          </ul>
          
          <h2>3. Information Sharing</h2>
          <p>
            We do not sell your personal information to third parties. We may share your information with:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
            <li>Service providers who help us operate our business</li>
            <li>Delivery partners to fulfill your orders</li>
            <li>Legal authorities when required by law</li>
          </ul>
          
          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal 
            information against unauthorized access, alteration, disclosure, or destruction.
          </p>
          
          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
          </ul>
          
          <h2>6. Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your browsing experience, analyze 
            site traffic, and personalize content. You can control cookies through your browser settings.
          </p>
          
          <h2>7. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at 
            <strong> privacy@greenmart.com</strong> or through our <a href="/contact">Contact page</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;


