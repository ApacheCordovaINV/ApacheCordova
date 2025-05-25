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

let currentEditUserId = null; // Variable to store the ID of the user being edited

// Local array to hold users
let users = [];

// Initially display empty list
displayUsers(users);

// Function to show/hide the loading message (no real loading now)
function toggleLoading(show) {
    loadingMessage.classList.toggle('hidden', !show);
    userList.classList.toggle('hidden', show); // Hide the list while loading
}

// Function to display users in the list
function displayUsers(users) {
    loadingMessage.classList.add('hidden');
    userList.classList.remove('hidden');
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
userForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const userData = {
        id: currentEditUserId || generateUniqueId(),
        name: nameInput.value,
        idNumber: idInput.value,
        email: emailInput.value
    };

    if (currentEditUserId) { // Edit mode
        // Find index and update user
        const index = users.findIndex(u => u.id === currentEditUserId);
        if (index !== -1) {
            users[index] = userData;
            alert('User successfully updated.');
        } else {
            alert('User to edit not found.');
        }
    } else { // Create mode
        users.push(userData);
        alert('User successfully created.');
    }

    userForm.reset(); // Clear the form
    resetFormForCreation(); // Reset form to create mode
    displayUsers(users); // Refresh the user list
});

// Function to generate a unique ID (simple incremental or timestamp)
function generateUniqueId() {
    return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

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
function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }
    // Remove user from array
    users = users.filter(u => u.id !== id);
    alert('User successfully deleted.');
    displayUsers(users); // Refresh list
}
