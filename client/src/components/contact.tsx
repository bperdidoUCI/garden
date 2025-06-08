// src/components/contactcard.tsx
import './css/contact.css';
import { useState } from 'react';
import Footer from './footer';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple form validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill all the fields.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus('Thank you for your message!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('There was an issue sending your message.');
      }
    } catch (error) {
      console.log(error)
      setStatus('Error: Unable to send the message.');
    }
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
