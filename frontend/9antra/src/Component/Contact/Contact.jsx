import React from 'react';
import './Contact.css'; 

const Contact = () => {
  return ( 
    <section className="contact-section">
      <h2>Contactez-nous</h2>
      <form className="contact-form">
        <input type="text" placeholder="Nom" />
        <input type="email" placeholder="Email" />
        <textarea placeholder="Message" rows="4"></textarea>
        <button type="submit">Envoyer le message</button>
      </form>
    </section>
  );
};

export default Contact;
