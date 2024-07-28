import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/auth';

const register = async (user) => {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
};

const login = async (user) => {
    const response = await axios.post(`${API_URL}/login`, user);
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default authService;
