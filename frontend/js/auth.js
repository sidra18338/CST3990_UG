// auth.js - Handling all authentication-related API calls and user state management

// Define the base URL for the API (update according to your actual backend API URL)
const BASE_URL = 'http://localhost:5000/api';

// Function to register a new user
function registerUser(name, email, password, role) {
    return fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // If registration is successful, store token and user data
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            return data;
        } else {
            throw new Error(data.message || 'Registration failed');
        }
    })
    .catch(error => console.error('Error registering user:', error));
}

// Function to log in a user
function loginUser(email, password) {
    return fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // If login is successful, store token and user data
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            return data;
        } else {
            throw new Error(data.message || 'Login failed');
        }
    })
    .catch(error => console.error('Error logging in user:', error));
}

// Function to log out the user
function logoutUser() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    // Optionally redirect to the login page after logout
    window.location.href = '/login.html';
}

// Function to check if the user is logged in
function isAuthenticated() {
    return !!localStorage.getItem('authToken');
}

// Function to get the current authenticated user
function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Function to verify the user's token on each request (optional)
function verifyToken() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        return Promise.reject('No token found');
    }

    return fetch(`${BASE_URL}/auth/verify`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(error => console.error('Error verifying token:', error));
}

// Export the authentication functions
export { registerUser, loginUser, logoutUser, isAuthenticated, getCurrentUser, verifyToken };
