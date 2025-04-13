// student.js - Student-related functionalities

import { isAuthenticated, getCurrentUser } from './auth.js';

// Function to view available internships
function viewInternships() {
    fetch('http://localhost:5000/api/internships')
        .then(response => response.json())
        .then(data => {
            console.log('Available Internships:', data);
            // Update the UI here with internships
        })
        .catch(error => {
            console.error('Error viewing internships:', error);
            alert('Failed to load internships');
        });
}

// Function to apply for an internship
function applyForInternship(internshipId) {
    const user = getCurrentUser();
    if (user.role !== 'student') {
        alert('Access denied! Only students can apply for internships.');
        return;
    }

    const token = localStorage.getItem('authToken');
    
    fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            internshipId
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Application submitted successfully') {
            alert('You have applied for the internship');
            // You can update the UI to show application status
        } else {
            alert('Error applying for internship');
        }
    })
    .catch(error => {
        console.error('Error applying for internship:', error);
        alert('Failed to apply for internship');
    });
}

// Function to view the student profile
function viewProfile() {
    const user = getCurrentUser();
    const token = localStorage.getItem('authToken');
    
    fetch(`http://localhost:5000/api/users/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Student Profile:', data);
        // You can update the UI with the student's profile information
    })
    .catch(error => {
        console.error('Error viewing profile:', error);
        alert('Failed to fetch profile');
    });
}

// Export functions for use in other parts of the app
export { viewInternships, applyForInternship, viewProfile };
