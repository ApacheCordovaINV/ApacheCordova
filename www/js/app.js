

// Constants for DOM elements
const userForm = document.getElementById('userForm');
const userIdInput = document.getElementById('userId');
const nameInput = document.getElementById('name');
const idInput = document.getElementById('idNumber');
const emailInput = document.getElementById('email');
const submitButton = document.getElementById('submitButton');
const cancelEditButton = document.getElementById('cancelEditButton');
const userList = document.getElementById('userList');
const loadingMessage = document.getElementById('loadingMessage');

// Base URL for your .NET API
const API_BASE_URL = 'http://localhost:5224/api/user'; // Make sure this URL is correct

let currentEditUserId = null; // Variable to store the ID of the user being edited

fetchUsers();

// Function to show/hide the loading message
function toggleLoading(show) {
    loadingMessage.classList.toggle('hidden', !show);
    userList.classList.toggle('hidden', show); // Hide the list while loading
}

// Function to fetch and display users
async function fetchUsers() {
    toggleLoading(true); // Show loading message
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        alert('Error loading users. Please check the backend and your connection.');
        userList.innerHTML = '<li class="error-message">Error loading users.</li>';
    } finally {
        toggleLoading(false); // Hide loading message
    }
}

// Function to display users in the list
function displayUsers(users) {
    userList.innerHTML = ''; // Clear the existing list
    if (users.length === 0) {
        userList.innerHTML = '<li>No registered users.</li>';
        return;
    }

    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.dataset.id = user.id;

        listItem.innerHTML = `
            <div class="user-info">
                <strong>${user.name}</strong>
                <span>ID: ${user.idNumber}</span>
                <span>Email: ${user.email}</span>
            </div>
            <div class="user-actions">
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </div>
        `;

        // Edit button event
        const editButton = listItem.querySelector('.edit-button');
        editButton.addEventListener('click', () => editUser(user));

        // Delete button event
        const deleteButton = listItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => deleteUser(user.id));

        userList.appendChild(listItem);
    });
}

// Form submit event (Create/Save Changes)
userForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const userData = {
        Name: nameInput.value,
        IdNumber: idInput.value,
        Email: emailInput.value
    };

    let response;
    try {
        if (currentEditUserId) { // Edit mode
            userData.id = currentEditUserId;
            response = await fetch(`${API_BASE_URL}/${currentEditUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }
            alert('User successfully updated.');
        } else { // Create mode
            response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }
            alert('User successfully created.');
        }

        userForm.reset(); // Clear the form
        resetFormForCreation(); // Reset form to create mode
        fetchUsers(); // Reload the user list
    } catch (error) {
        console.error('Error saving user:', error);
        alert(`Error saving user: ${error.message}`);
    }
});

// Function to load a user's data into the form for editing
function editUser(user) {
    currentEditUserId = user.id;
    userIdInput.value = user.id;
    nameInput.value = user.name;
    idInput.value = user.idNumber;
    emailInput.value = user.email;

    submitButton.textContent = 'Save Changes';
    cancelEditButton.classList.remove('hidden'); // Show cancel button
}

// Cancel edit button event
cancelEditButton.addEventListener('click', () => {
    resetFormForCreation();
});

// Function to reset form to create mode
function resetFormForCreation() {
    currentEditUserId = null;
    userForm.reset();
    userIdInput.value = '';
    submitButton.textContent = 'Create User';
    cancelEditButton.classList.add('hidden'); // Hide cancel button
}

// Function to delete a user
async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        alert('User successfully deleted.');
        fetchUsers(); // Reload the list
    } catch (error) {
        console.error('Error deleting user:', error);
        alert(`Error deleting user: ${error.message}`);
    }
}
