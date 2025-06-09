import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';
import './css/loginsignup.css';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate();

  const [signup, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      console.log('Signup successful:', data);
      localStorage.setItem('token', data.signup.token);
      localStorage.setItem('isLoggedIn', 'true');
      setSuccessMessage('User created successfully! Redirecting...');
      navigate('/login');
      
      // Espera 2 segundos e redireciona
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    },
    onError: (error) => {
      console.error('Signup error:', error);
      setError(error.message || 'Signup failed');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log('Submit clicked', { username, email, password });
  setError('');
  setSuccessMessage('');

  if (!username || !email || !password) {
    setError('Please fill in all fields.');
    return;
  }

  signup({ variables: { username, email, password } });
};



  return (
    <div className="login-container">
      <h2>Signup</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
