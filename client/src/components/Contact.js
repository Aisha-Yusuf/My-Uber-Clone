import React from 'react';

function Contact() {
  
  const contactInfo = [
    { type: 'Email', value: 'info@uberclone.com' },
    { type: 'Phone', value: '+123 456 7890' },
    { type: 'Address', value: '123 Main Street, Nairobi, Kenya' },
  ];

  return (
    <div>
      <h2>Contact Information</h2>
      <p>You can reach our customer care services 24/7 on the hotline:</p>
      <p className="hotline">Hotline: +123 456 7890</p>
      <ul>
        {contactInfo.map((info, index) => (
          <li key={index}>
            <strong>{info.type}:</strong> {info.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contact;
