import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        axios.post('http://localhost:5002/api/auth/register', { email, password })
            .then(response => {
                setSuccess('Registration successful! Redirecting to login...');
                // Redirect to login page after a short delay
                setTimeout(() => {
                    navigate('/login');
                }, 2000); // 2 seconds delay
            })
            .catch(err => {
                const errorMessage = err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : 'Registration failed';
                setError(errorMessage);
            });
    };

    return (
        <div>
            <h2>Register</h2>
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
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default RegisterPage;
