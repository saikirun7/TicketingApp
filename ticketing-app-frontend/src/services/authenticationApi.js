import axios from 'axios';

const baseURL = 'http://localhost:8087/auth/user';

const authenticationApi = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const login = async (credentials) => {
    try {
        const response = await authenticationApi.post('/login', credentials);
        return response.data;
    } catch (error) {
        // You can handle errors here
        throw error;
    }
};

const register = async (userData) => {
    try {
        const response = await authenticationApi.post('/register', userData);
        return response.data;
    } catch (error) {
        // You can handle errors here
        throw error;
    }
};

export function setToken(token) {
    localStorage.setItem('jwtToken', token);
}

export function getToken() {
    return localStorage.getItem('jwtToken');
}

export function removeToken() {
    localStorage.removeItem('jwtToken');
}

export function setRole(role) {
    localStorage.setItem('userRole', role);
}

export function getRole() {
    return localStorage.getItem('userRole');
}

export function removeRole() {
    localStorage.removeItem('userRole');
}

export function setId(id) {
    localStorage.setItem('userId', id);
}

export function getId() {
    return localStorage.getItem('userId');
}

export function removeId() {
    localStorage.removeItem('userId');
}

export function tokenExpired(token) {
    if (token === null) {
        return true;
    }
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
}

export { login, register };
