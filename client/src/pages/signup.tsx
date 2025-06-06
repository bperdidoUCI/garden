import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './css/loginsignup.css';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setErrorMessage('The passwords do not match!');
      return;
    }
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  };
  return (
    <div className="signup-container">
      <h2>Registration</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Register</button>
      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}
