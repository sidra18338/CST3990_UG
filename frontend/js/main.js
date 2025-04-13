// main.js - Main application functionalities

import { loginUser, logoutUser, isAuthenticated, getCurrentUser } from './auth.js';

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    loginUser(email, password)
        .then(data => {
            if (data.token) {
                window.location.href = 'student-dashboard.html'; // Redirect based on role
            }
        })
        .catch(error => {
            alert('Login failed: ' + error.message);
        });
});

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    logoutUser();
    window.location.href = 'login.html'; // Redirect to login page
});

// Check if user is authenticated and show relevant info
if (isAuthenticated()) {
    const user = getCurrentUser();
    if (user.role === 'student') {
        document.getElementById('studentLinks').style.display = 'block';
    } else if (user.role === 'employer') {
        document.getElementById('employerLinks').style.display = 'block';
    }
} else {
    // Optionally redirect to login if the user is not authenticated
    window.location.href = 'login.html';
}

// Export functions for use in other parts of the app
export { loginUser, logoutUser, isAuthenticated, getCurrentUser };
