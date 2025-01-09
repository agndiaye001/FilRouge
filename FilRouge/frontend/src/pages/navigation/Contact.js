// Contact.js
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    alert('Message envoyé!');
  };

  return (
    <div>
      <Navbar />
      <main>
        <h2>Contactez-nous</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label>Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
