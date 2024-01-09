import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function ContactPage() {
  const [state, handleSubmit] = useForm("mdoqnlgq"); // Replace with your actual Formspree form ID
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission locally
    console.log('Form submitted locally:', { name, email, company, phone, message });
    // You can add further local actions if needed
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Contact</h2>
      <form onSubmit={state.submitWithRedirect || handleLocalSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Your Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Your Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pattern=".*@.*"
              title="Enter a valid email address containing '@'"
              required
            />
          </div>

          <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Your Phone Number:
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit phone number"
              />
            </div>

        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Company Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message:
          </label>
          <textarea
            className="form-control"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary" disabled={state.submitting}>
          {state.submitting ? 'Submitting...' : 'Submit'}
        </button>

        {state.succeeded && <p>Thanks for Browsing!</p>}

        <ValidationError 
          prefix="Form submission" 
          field="general"
          errors={state.errors}
        />
      </form>
    </div>
  );
}