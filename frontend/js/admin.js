// Admin Dashboard Script

// Function to get all users
function getUsers() {
    fetch('/api/admin/users')
        .then(response => response.json())
        .then(data => {
            const usersTable = document.getElementById('users-table');
            usersTable.innerHTML = ''; // Clear existing table rows

            data.users.forEach(user => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>
                        <button onclick="blockUser('${user.id}')">Block</button>
                        <button onclick="unblockUser('${user.id}')">Unblock</button>
                        <button onclick="deleteUser('${user.id}')">Delete</button>
                    </td>
                `;
                usersTable.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}


// Function to delete a user
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/api/admin/delete/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('User deleted successfully');
                getUsers(); // Refresh user list
            } else {
                alert('Failed to delete user');
            }
        })
        .catch(error => console.error('Error deleting user:', error));
    }
}

// Function to get all blogs
function getBlogs() {
    fetch('/api/admin/blogs')
        .then(response => response.json())
        .then(data => {
            const blogsTable = document.getElementById('blogs-table');
            blogsTable.innerHTML = ''; // Clear existing table rows

            data.blogs.forEach(blog => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${blog.title}</td>
                    <td>${blog.author}</td>
                    <td>${blog.date}</td>
                    <td>
                        <button onclick="editBlog('${blog.id}')">Edit</button>
                        <button onclick="deleteBlog('${blog.id}')">Delete</button>
                    </td>
                `;
                blogsTable.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching blogs:', error));
}

// Function to edit a blog
function editBlog(blogId) {
    const newTitle = prompt('Enter new blog title');
    const newContent = prompt('Enter new blog content');

    if (newTitle && newContent) {
        fetch(`/api/admin/blogs/${blogId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: newTitle,
                content: newContent,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Blog updated successfully');
                getBlogs(); // Refresh blog list
            } else {
                alert('Failed to update blog');
            }
        })
        .catch(error => console.error('Error editing blog:', error));
    }
}

// Function to delete a blog
function deleteBlog(blogId) {
    if (confirm('Are you sure you want to delete this blog?')) {
        fetch(`/api/admin/blogs/${blogId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Blog deleted successfully');
                getBlogs(); // Refresh blog list
            } else {
                alert('Failed to delete blog');
            }
        })
        .catch(error => console.error('Error deleting blog:', error));
}
}

// Function to get all internships
function getInternships() {
    fetch('/api/admin/internships')
        .then(response => response.json())
        .then(data => {
            const internshipsTable = document.getElementById('internships-table');
            internshipsTable.innerHTML = ''; // Clear existing table rows

            data.internships.forEach(internship => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${internship.title}</td>
                    <td>${internship.company}</td>
                    <td>${internship.location}</td>
                    <td>${internship.status}</td>
                    <td>
                        <button onclick="approveInternship('${internship.id}')">Approve</button>
                        <button onclick="rejectInternship('${internship.id}')">Reject</button>
                    </td>
                `;
                internshipsTable.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching internships:', error));
}

// Function to approve an internship
function approveInternship(internshipId) {
    fetch(`/api/admin/internships/approve/${internshipId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Internship approved');
            getInternships(); // Refresh internships list
        } else {
            alert('Failed to approve internship');
        }
    })
    .catch(error => console.error('Error approving internship:', error));
}

// Function to reject an internship
function rejectInternship(internshipId) {
    fetch(`/api/admin/internships/reject/${internshipId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Internship rejected');
            getInternships(); // Refresh internships list
        } else {
            alert('Failed to reject internship');
        }
    })
    .catch(error => console.error('Error rejecting internship:', error));
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    getUsers();
    getBlogs();
    getInternships();
});
