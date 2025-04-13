// API.js - Handling all backend API calls for Campus to Career

const BASE_URL = 'http://localhost:5000/api'; 

// Function to get all users
function getUsers() {
    return fetch(`${BASE_URL}/admin/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Add Authorization if needed, e.g., token or session ID
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then(response => response.json())
    .catch(error => console.error('Error fetching users:', error));
}


// Function to delete a user
function deleteUser(userId) {
    return fetch(`${BASE_URL}/admin/delete/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then(response => response.json())
    .catch(error => console.error('Error deleting user:', error));
}

// Function to get all blogs
function getBlogs() {
    return fetch(`${BASE_URL}/admin/blogs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then(response => response.json())
    .catch(error => console.error('Error fetching blogs:', error));
}

// Function to add a new blog
function addBlog(title, content) {
    return fetch(`${BASE_URL}/admin/blogs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ title, content })
    })
    .then(response => response.json())
    .catch(error => console.error('Error adding blog:', error));
}

// Function to edit a blog
function editBlog(blogId, title, content) {
    return fetch(`${BASE_URL}/admin/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ title, content })
    })
    .then(response => response.json())
    .catch(error => console.error('Error editing blog:', error));
}

// Function to delete a blog
function deleteBlog(blogId) {
    return fetch(`${BASE_URL}/admin/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then(response => response.json())
    .catch(error => console.error('Error deleting blog:', error));
}

// Function to get all internships
function getInternships() {
    return fetch(`${BASE_URL}/admin/internships`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then(response => response.json())
    .catch(error => console.error('Error fetching internships:', error));
}

// Function to approve an internship
function approveInternship(internshipId) {
    return fetch(`${BASE_URL}/admin/internships/approve/${internshipId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then(response => response.json())
    .catch(error => console.error('Error approving internship:', error));
}

// Function to reject an internship
function rejectInternship(internshipId) {
    return fetch(`${BASE_URL}/admin/internships/reject/${internshipId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then(response => response.json())
    .catch(error => console.error('Error rejecting internship:', error));
}

// Function to create a new internship
function createInternship(title, company, location, description) {
    return fetch(`${BASE_URL}/admin/internships`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ title, company, location, description })
    })
    .then(response => response.json())
    .catch(error => console.error('Error creating internship:', error));
}

export { 
    getUsers,  
    deleteUser, 
    getBlogs, 
    addBlog, 
    editBlog, 
    deleteBlog, 
    getInternships, 
    approveInternship, 
    rejectInternship, 
    createInternship 
};
