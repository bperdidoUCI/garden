// SignUp.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

        // Registration simulation (saving data in localStorage)
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/dashboard'); // Redirects to the Dashboard after registration
    };

    return (
        <div className="signup-container">
            <h2>Registration</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSignUp}>Register</button>
            <p>
                Already have an account? <a href="/login">Sign in</a>
            </p>
        </div>
    );
}