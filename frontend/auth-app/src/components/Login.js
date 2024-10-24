import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_BASE_API; // Replace with your base URL

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage('Please fill in all fields.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post(`${baseUrl}/login`, { email, password });
            const { token, profileImageUrl } = response.data;

            // Store token and profile image URL in localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('profileImageUrl', profileImageUrl);

            setLoading(false);

            // Set authentication status to true in the parent component
            setIsAuthenticated(true); // Update authentication state

            // Redirect to profile page immediately after login
            navigate('/profile', { replace: true });
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Login failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="login-container form-container">
            <form onSubmit={handleLogin} className="form-content">
                <h2>Login</h2>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {message && <p className="error">{message}</p>}
                <p className="signup-link">
                    Don't have an account?{' '}
                    <button type="button" onClick={() => navigate('/signup')}>
                        Sign Up
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;
