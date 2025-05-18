let editId = null;

// Toggle customer form visibility
function toggleCustomerForm(show = null) {
    const formContainer = document.getElementById('customerFormContainer');
    if (show === true) {
        formContainer.style.display = 'block';
    } else if (show === false) {
        formContainer.style.display = 'none';
    } else {
        formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
    }
}

//Show feedback messages
function showMessage(text, type = 'success') {
    let msgBox = document.getElementById('dashboardMsg');
    if (!msgBox) {
        msgBox = document.createElement('div');
        msgBox.id = 'dashboardMsg';
        msgBox.className = `alert alert-${type} text-center mt-3`;
        msgBox.style.maxWidth = '500px';
        msgBox.style.margin = 'auto';
        document.body.prepend(msgBox);
    }
    msgBox.innerText = text;
    msgBox.classList.remove('d-none');
    setTimeout(() => {
        msgBox.remove();
    }, 1500);
}

// Add or Update Customer
document.getElementById('customerForm').addEventListener('submit', e => {
    e.preventDefault();

    const data = {
        name: document.getElementById('cname').value,
        email: document.getElementById('cemail').value,
        phone: document.getElementById('cphone').value,
        address: document.getElementById('caddress').value
    };

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `../php/customers.php?id=${editId}` : '../php/customers.php';

    fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(() => {
        showMessage(editId ? "Customer updated!" : "Customer added!");
        document.getElementById('customerForm').reset();
        toggleCustomerForm(false);
        editId = null;
        loadCustomers();
    })
    .catch(err => showMessage("Error saving customer: " + err.message, 'danger'));
});

// Load and display 5 customers
function loadCustomers() {
    fetch('../php/customers.php')
        .then(res => res.json())
        .then(data => {
            const tableBody = document.getElementById('customerTableBody');
            const top5 = data.slice(0, 5);
            tableBody.innerHTML = top5.map(c => `
                <tr>
                    <td>${c.name}</td>
                    <td>${c.email}</td>
                    <td>${c.phone}</td>
                    <td>${c.address}</td>
                    <td>
                        <button class="btn btn-sm btn-warning me-1" onclick='editCustomer(${JSON.stringify(c)})'>Edit</button>
                        <button class="btn btn-sm btn-danger" onclick='deleteCustomer(${c.id})'>Delete</button>
                    </td>
                </tr>
            `).join('');
        })
        .catch(err => showMessage("Failed to fetch customers: " + err.message, 'danger'));
}

// Delete Customer
function deleteCustomer(id) {
    if (confirm("Are you sure you want to delete this customer?")) {
        fetch(`../php/customers.php?id=${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            showMessage("Customer deleted.");
            loadCustomers();
        })
        .catch(err => showMessage("Failed to delete: " + err.message, 'danger'));
    }
}

// Edit Customer - fill form
function editCustomer(customer) {
    editId = customer.id;
    document.getElementById('cname').value = customer.name;
    document.getElementById('cemail').value = customer.email;
    document.getElementById('cphone').value = customer.phone;
    document.getElementById('caddress').value = customer.address;

    toggleCustomerForm(true);

    document.getElementById('customerFormContainer').scrollIntoView({ behavior: 'smooth' });
}

// Load users 
function loadUsers() {
    fetch('../php/users.php')
        .then(res => res.json())
        .then(data => {
            const userList = document.getElementById('userList');
            userList.innerHTML = data.map(u => `
                <div class="col-md-6 col-lg-4 mb-3">
                    <div class="card shadow-sm border-0 bg-light dark-mode:bg-dark text-dark dark-mode:text-light">
                        <div class="card-body d-flex align-items-center">
                            <div class="me-3">
                                <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; font-size: 1.5rem;">
                                    <i class="bi bi-person-circle"></i>
                                </div>
                            </div>
                            <div>
                                <h6 class="mb-0">${u.name}</h6>
                                <small class="text-muted">${u.email}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        })
        .catch(err => showMessage("Failed to fetch users: " + err.message, 'danger'));
}

// Handle contact form
document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();

    const contactData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    fetch('../php/contact.php', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData)
    })
    .then(() => {
        showMessage("Message sent!");
        document.getElementById('contactForm').reset();
    })
    .catch(err => showMessage("Failed to send message: " + err.message, 'danger'));
});

// Load data on page load
window.addEventListener('DOMContentLoaded', () => {
    loadCustomers();
    loadUsers();
    toggleCustomerForm(false); 
});
