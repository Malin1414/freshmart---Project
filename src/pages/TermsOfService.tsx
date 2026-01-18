import React from 'react';

const TermsOfService = () => {
  return (
    <div className="terms-of-service">
      <div className="container">
        <h1 className="page-title">
          <i className="fas fa-file-contract"></i> Terms of Service
        </h1>
        
        <div className="card">
          <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>
            Last Updated: November 15, 2023
          </p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using GreenMart's services, you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our services.
          </p>
          
          <h2>2. Account Registration</h2>
          <p>
            To use certain features, you must register for an account. You agree to provide accurate 
            information and keep your account credentials secure. You are responsible for all activities 
            under your account.
          </p>
          
          <h2>3. Ordering and Payment</h2>
          <p>
            All orders are subject to product availability. Prices are subject to change without notice. 
            We accept various payment methods as indicated during checkout. Your order is confirmed once 
            payment is processed.
          </p>
          
          <h2>4. Delivery</h2>
          <p>
            We deliver to addresses within our service areas. Delivery times are estimates and not guaranteed. 
            You must be available to receive your delivery at the specified address.
          </p>
          
          <h2>5. Returns and Refunds</h2>
          <p>
            If you receive damaged or incorrect items, please contact us within 24 hours of delivery. 
            We offer refunds or replacements at our discretion. Perishable items are generally not returnable 
            unless they arrive damaged.
          </p>
          
          <h2>6. User Conduct</h2>
          <p>
            You agree not to misuse our services, including attempting to gain unauthorized access, 
            interfering with service functionality, or using the service for any illegal purpose.
          </p>
          
          <h2>7. Intellectual Property</h2>
          <p>
            All content on our platform, including text, graphics, logos, and software, is the property 
            of GreenMart or its licensors and is protected by copyright laws.
          </p>
          
          <h2>8. Limitation of Liability</h2>
          <p>
            GreenMart shall not be liable for any indirect, incidental, special, or consequential damages 
            arising from your use of our services.
          </p>
          
          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of our services after 
            changes constitutes acceptance of the new terms.
          </p>
          
          <h2>10. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of the jurisdiction 
            where GreenMart is registered.
          </p>
          
          <h2>11. Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us at 
            <strong> legal@greenmart.com</strong> or through our <a href="/contact">Contact page</a>.
          </p>
          
          <div style={{ 
            marginTop: '30px', 
            padding: '15px', 
            backgroundColor: 'var(--background)', 
            borderRadius: '8px',
            borderLeft: '4px solid var(--primary-green)'
          }}>
            <p><strong>Note:</strong> This is a simplified version for demonstration purposes. 
            For a complete legal document, please consult with legal professionals.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
