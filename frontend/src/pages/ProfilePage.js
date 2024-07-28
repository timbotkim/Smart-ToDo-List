import React, { useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [profile, setProfile] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:5002/api/users/profile', profile)
            .then(response => {
                alert('Profile updated successfully');
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={profile.password}
                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                required
            />
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default ProfilePage;
