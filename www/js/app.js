
(function() {
    'use strict';

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

    let currentEditUserId = null; 


    let users = [];


    function toggleLoading(show) {
        if (loadingMessage && userList) {
            loadingMessage.classList.toggle('hidden', !show);
            userList.classList.toggle('hidden', show); 
        }
    }


    function displayUsers(users) {
        if (!userList || !loadingMessage) return; 

        loadingMessage.classList.add('hidden');
        userList.classList.remove('hidden');
        userList.innerHTML = ''; 
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

  
            const editButton = listItem.querySelector('.edit-button');
            editButton.addEventListener('click', () => editUser(user));

     
            const deleteButton = listItem.querySelector('.delete-button');
            deleteButton.addEventListener('click', () => deleteUser(user.id));

            userList.appendChild(listItem);
        });
    }


    function generateUniqueId() {
        return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    }


    function editUser(user) {
        if (!userIdInput || !nameInput || !idInput || !emailInput || !submitButton || !cancelEditButton) return;
        
        currentEditUserId = user.id;
        userIdInput.value = user.id;
        nameInput.value = user.name;
        idInput.value = user.idNumber;
        emailInput.value = user.email;

        submitButton.textContent = 'Save Changes';
        cancelEditButton.classList.remove('hidden');
    }


    function resetFormForCreation() {
        currentEditUserId = null;
        if (userForm) userForm.reset();
        if (userIdInput) userIdInput.value = '';
        if (submitButton) submitButton.textContent = 'Create User';
        if (cancelEditButton) cancelEditButton.classList.add('hidden'); 
    }


    function deleteUser(id) {
        if (!confirm('Are you sure you want to delete this user?')) {
            return;
        }
 
        users = users.filter(u => u.id !== id);
        alert('User successfully deleted.');
        displayUsers(users); 
    }

    function createItem(item) {
        const items = getAllItems();
        item.id = item.id || Date.now();
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        return item;
    }


    function getAllItems() {
        const items = localStorage.getItem('items');
        return items ? JSON.parse(items) : [];
    }

    function getItemById(id) {
        const items = getAllItems();
        return items.find(item => item.id === parseInt(id));
    }

    function updateItem(id, updates) {
        const items = getAllItems();
        const index = items.findIndex(item => item.id === parseInt(id));
        
        if (index !== -1) {
            items[index] = { ...items[index], ...updates };
            localStorage.setItem('items', JSON.stringify(items));
            return items[index];
        }
        return null;
    }

    function deleteItem(id) {
        const items = getAllItems();
        const filteredItems = items.filter(item => item.id !== parseInt(id));
        
        if (filteredItems.length < items.length) {
            localStorage.setItem('items', JSON.stringify(filteredItems));
            return true;
        }
        return false;
    }


    if (typeof window !== 'undefined') {
        window.createItem = createItem;
        window.getAllItems = getAllItems;
        window.getItemById = getItemById;
        window.updateItem = updateItem;
        window.deleteItem = deleteItem;
    }

    if (typeof document !== 'undefined') {

        if (userList) {
            displayUsers(users);
        }


        if (userForm) {
            userForm.addEventListener('submit', (event) => {
                event.preventDefault();

                const userData = {
                    id: currentEditUserId || generateUniqueId(),
                    name: nameInput.value,
                    idNumber: idInput.value,
                    email: emailInput.value
                };

                if (currentEditUserId) { 
                    
                    const index = users.findIndex(u => u.id === currentEditUserId);
                    if (index !== -1) {
                        users[index] = userData;
                        alert('User successfully updated.');
                    } else {
                        alert('User to edit not found.');
                    }
                } else { 
                    users.push(userData);
                    alert('User successfully created.');
                }

                userForm.reset(); 
                resetFormForCreation();
                displayUsers(users); 
            });
        }

        if (cancelEditButton) {
            cancelEditButton.addEventListener('click', () => {
                resetFormForCreation();
            });
        }
    }
})();