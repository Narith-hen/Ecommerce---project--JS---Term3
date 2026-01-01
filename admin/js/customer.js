let customers = JSON.parse(localStorage.getItem('carShopCustomers')) || [
    { id: 1, name: "Sok Rathana", phone: "012-345-678", email: "rathana@example.com", interest: "Luxury Sedan", status: "Active" },
    { id: 2, name: "Vannak Khemera", phone: "099-888-777", email: "vannak@example.com", interest: "Electric SUV", status: "Active" },
    { id: 3, name: "Chan Leakhena", phone: "010-222-333", email: "leak@example.com", interest: "SUV", status: "Lead" }
];

function saveToStorage() {
    localStorage.setItem('carShopCustomers', JSON.stringify(customers));
}

// Modal Toggle
function toggleCustomerModal() {
    const modal = document.getElementById('customerModal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

// Save New Customer
function saveNewCustomer() {
    const name = document.getElementById('c-name').value;
    const phone = document.getElementById('c-phone').value;
    const email = document.getElementById('c-email').value;
    const interest = document.getElementById('c-interest').value;

    if (!name || !phone || !email) {
        alert("Please fill all fields");
        return;
    }

    const newCustomer = {
        id: Date.now(),
        name,
        phone,
        email,
        interest,
        status: "Lead"
    };

    customers.push(newCustomer);
    saveToStorage();
    renderCustomers();
    toggleCustomerModal();
    
    // Clear form
    document.getElementById('c-name').value = '';
    document.getElementById('c-phone').value = '';
    document.getElementById('c-email').value = '';
}

function renderCustomers() {
    const customerList = document.getElementById('customer-list');
    const totalDisplay = document.getElementById('customer-total');
    
    if (!customerList) return;
    
    customerList.innerHTML = '';
    totalDisplay.innerText = customers.length;

    customers.forEach(customer => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="user-avatar">${customer.name.charAt(0)}</div>
                    <div>
                        <strong>${customer.name}</strong><br>
                        <small style="color: #64748b;">${customer.phone}</small>
                    </div>
                </div>
            </td>
            <td>${customer.email}</td>
            <td><span class="interest-tag">${customer.interest}</span></td>
            <td><span class="status-badge ${customer.status.toLowerCase()}">${customer.status}</span></td>
            <td>
                <button class="edit-btn" onclick="contactCustomer('${customer.email}')"><i class="fa-solid fa-envelope"></i></button>
                <button class="delete-btn" onclick="deleteCustomer(${customer.id})"><i class="fa-solid fa-trash"></i></button>
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