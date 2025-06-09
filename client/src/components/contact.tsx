// src/components/contactcard.tsx
import './css/contact.css';
import { useState } from 'react';
import Footer from './footer';
import emailjs from 'emailjs-com';

// Pegando as variáveis do .env (lembre de prefixar com VITE_)
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

// Inicializa EmailJS só uma vez fora do componente
emailjs.init(PUBLIC_KEY);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill all the fields.');
      return;
    }

    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      message: formData.message,
      to_email: import.meta.env.VITE_EMAILJS_TO_EMAIL
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('Thank you for your message!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setStatus(`There was an issue sending your message: ${err.text || err.message || JSON.stringify(err)}`);
      });

  };

  return (
    <div className="contact-container">
      <main className="contact-main">
        <section className="contact-section">
          <h2 className="title-main1">Contact Us</h2>
          <p>We'd love to hear from you! Please fill out the form below to get in touch with us.</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">Send Message</button>
          </form>

          {status && <p className="form-status">{status}</p>}
        </section>
      </main>
      <Footer />
    </div>
  );
}
