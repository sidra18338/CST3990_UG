// employer.js - Employer-related functionalities

import { isAuthenticated, getCurrentUser } from './auth.js';

// Function to post a new internship
function postInternship(title, description, location, duration, stipend) {
    const user = getCurrentUser();
    if (user.role !== 'employer') {
        alert('Access denied! Only employers can post internships.');
        return;
    }

    const token = localStorage.getItem('authToken');
    
    fetch('http://localhost:5000/api/internships', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            title, description, location, duration, stipend
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data._id) {
            alert('Internship posted successfully!');
            // You can redirect or update UI here
        } else {
            alert('Error posting internship');
        }
    })
    .catch(error => {
        console.error('Error posting internship:', error);
        alert('Failed to post internship');
    });
}

// Function to view applications for posted internships
function viewApplications() {
    const user = getCurrentUser();
    if (user.role !== 'employer') {
        alert('Access denied! Only employers can view applications.');
        return;
    }

    const token = localStorage.getItem('authToken');
    
    fetch('http://localhost:5000/api/applications/employer', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Applications:', data);
        // You can update the UI here with the applications
    })
    .catch(error => {
        console.error('Error viewing applications:', error);
        alert('Failed to fetch applications');
    });
}

// Function to update internship details
function updateInternship(id, updatedData) {
    const user = getCurrentUser();
    if (user.role !== 'employer') {
        alert('Access denied! Only employers can update internships.');
        return;
    }

    const token = localStorage.getItem('authToken');
    
    fetch(`http://localhost:5000/api/internships/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
        if (data._id) {
            alert('Internship updated successfully!');
            // You can update the UI here
        } else {
            alert('Error updating internship');
        }
    })
    .catch(error => {
        console.error('Error updating internship:', error);
        alert('Failed to update internship');
    });
}

// Export the functions for use in other parts of the app
export { postInternship, viewApplications, updateInternship };
