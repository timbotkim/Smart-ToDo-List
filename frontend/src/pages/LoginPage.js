import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        axios.post('http://localhost:5002/api/auth/login', { email, password })
            .then(response => {
                // Store the JWT token in local storage
                localStorage.setItem('token', response.data.token);
                // Redirect to dashboard
                navigate('/dashboard');
            })
            .catch(err => {
                const errorMessage = err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : 'Login failed';
                setError(errorMessage);
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LoginPage;
