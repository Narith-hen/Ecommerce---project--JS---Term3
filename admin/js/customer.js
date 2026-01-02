let customers = JSON.parse(localStorage.getItem('carShopCustomers')) || [];

function saveToStorage() {
    localStorage.setItem('carShopCustomers', JSON.stringify(customers));
}

// Modal Toggle
function toggleCustomerModal() {
    const modal = document.getElementById('customerModal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}
// Open modal and fill with current data
function openEditModal(id) {
    const customer = customers.find(c => c.id === id);
    if (customer) {
        document.getElementById('edit-c-id').value = customer.id;
        document.getElementById('edit-c-name').value = customer.name;
        document.getElementById('edit-c-phone').value = customer.phone;
        document.getElementById('edit-c-email').value = customer.email;
        // Use interest or role depending on how your data is saved
        document.getElementById('edit-c-interest').value = customer.interest || customer.role || "Customer";
        
        toggleEditModal();
    }
}

// Save the updated information
function updateCustomer() {
    const id = parseInt(document.getElementById('edit-c-id').value);
    const index = customers.findIndex(c => c.id === id);

    if (index !== -1) {
        customers[index].name = document.getElementById('edit-c-name').value;
        customers[index].phone = document.getElementById('edit-c-phone').value;
        customers[index].email = document.getElementById('edit-c-email').value;
        customers[index].interest = document.getElementById('edit-c-interest').value;
        // Also update role if you are using that field for the tag
        customers[index].role = document.getElementById('edit-c-interest').value;

        saveToStorage();
        renderCustomers();
        toggleEditModal();
    }
}
// Save New Customer
function saveNewCustomer() {
    const name = document.getElementById('c-name').value;
    const phone = document.getElementById('c-phone').value;
    const email = document.getElementById('c-email').value;
    const password = document.getElementById('c-password').value; // New logic

    if(!name || !password) {
        alert("Name and Password are required!");
        return;
    }

    const newCustomer = {
        id: Date.now(),
        name,
        phone,
        email,
        password // Saving the password string
    };

    // Save to your localStorage logic...
    customers.push(newCustomer);
    localStorage.setItem('myCustomers', JSON.stringify(customers));
    renderCustomers();
    toggleCustomerModal();
}

// Updated renderCustomers function to include the Edit Button
function renderCustomers() {
    const customerList = document.getElementById('customer-list');
    const totalDisplay = document.getElementById('customer-total');
    if (!customerList) return;

    // Use global variable
    customerList.innerHTML = '';
    if (totalDisplay) totalDisplay.innerText = customers.length;

    customers.forEach(customer => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="user-avatar">${customer.name ? customer.name.charAt(0) : 'U'}</div>
                    <div>
                        <strong>${customer.name}</strong><br>
                    </div>
                </div>
            </td>
            <td>${customer.email}</td>
            <td><span class="interest-tag">${customer.interest || customer.role || 'Customer'}</span></td>
            <td><span class="status-badge active">${customer.status || 'Active'}</span></td>
            <td>
                <button class="delete-btn" onclick="deleteCustomer(${customer.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        customerList.appendChild(tr);
    });
}

function deleteCustomer(id) {
    if(confirm("Permanently remove this customer?")) {
        customers = customers.filter(c => c.id !== id);
        saveToStorage();
        renderCustomers();
    }
}

function contactCustomer(email) {
    window.location.href = `mailto:${email}?subject=Exclusive Car Offer`;
}

document.addEventListener('DOMContentLoaded', renderCustomers);