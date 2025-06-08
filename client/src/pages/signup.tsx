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
  const navigate = useNavigate();

  const [register, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      const token = data.register.token;
      localStorage.setItem('token', token);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    },
    onError: () => {
      setError('Signup error: Email já em uso ou dados inválidos.');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    await register({ variables: { username, email, password } });
  };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      <p>
        Já tem uma conta? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
