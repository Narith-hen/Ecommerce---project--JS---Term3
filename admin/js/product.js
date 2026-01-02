// 1. Load data from LocalStorage
let carInventory = JSON.parse(localStorage.getItem('myProducts')) || [];
let editIndex = -1; 

const carListBody = document.getElementById('car-list-body');

// --- NEW: TOAST NOTIFICATION SYSTEM ---
function showToast(message, type = 'error') {
    const container = document.getElementById('toast-container');
    if (!container) return; // Ensure container exists in HTML

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    
    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 2. Render Function
function renderCars() {
    carListBody.innerHTML = '';
    
    // 1. Filter the inventory based on currentFilter
    const filteredInventory = currentFilter === 'All' 
        ? carInventory 
        : carInventory.filter(car => car.category === currentFilter);

    // 2. Loop through the filtered list instead of carInventory
    filteredInventory.forEach((car, index) => {
        // Find the actual index in the original carInventory for editing/deleting
        const originalIndex = carInventory.indexOf(car);
        
        const stockStatus = car.stock > 2 ? 'instock' : 'lowstock';
        const statusText = car.stock > 2 ? 'In Stock' : 'Low Stock';

        carListBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${car.image}" class="img-preview" onerror="this.src='https://via.placeholder.com/50'"></td>
                <td><strong>${car.name}</strong></td>
                <td>${car.brand}</td>
                <td>${car.category}</td>
                <td>$${Number(car.price).toLocaleString()}</td>
                <td>${car.stock}</td>
                <td><span class="badge ${stockStatus}">${statusText}</span></td>
                <td>
                    <button onclick="editCar(${originalIndex})"> <i class="fa-solid fa-pen-to-square"></i> </button>
                    <button onclick="deleteCar(${originalIndex})"> <i class="fa-solid fa-trash"></i> </button>
                </td>
            </tr>
        `;
    });
}


// 3. Updated Save Function with Validation & Toast
function updatePreview() {
    const url = document.getElementById('p-image').value;
    const preview = document.getElementById('p-preview');
    preview.src = url || 'https://via.placeholder.com/150x80?text=No+Image';
}

function saveCar() {
    const inputs = {
        name: document.getElementById('p-name'),
        brand: document.getElementById('p-brand'),
        category: document.getElementById('p-cat'),
        price: document.getElementById('p-price'),
        stock: document.getElementById('p-stock'),
        image: document.getElementById('p-image')
    };

    let isValid = true;
    let firstErrorField = null;

    // Reset styles
    Object.values(inputs).forEach(input => input.classList.remove('input-error'));

    // --- VALIDATION RULES ---
    
    // 1. Check Model Name
    if (!inputs.name.value.trim()) {
        inputs.name.classList.add('input-error');
        isValid = false;
        if (!firstErrorField) firstErrorField = inputs.name;
    }

    // 2. Check Brand
    if (!inputs.brand.value.trim()) {
        inputs.brand.classList.add('input-error');
        isValid = false;
        if (!firstErrorField) firstErrorField = inputs.brand;
    }

    // 3. Check Category
    if (inputs.category.value === "") {
        inputs.category.classList.add('input-error');
        isValid = false;
        if (!firstErrorField) firstErrorField = inputs.category;
    }

    // 4. Check Price (Must be positive)
    if (!inputs.price.value || parseFloat(inputs.price.value) <= 0) {
        inputs.price.classList.add('input-error');
        isValid = false;
        if (!firstErrorField) firstErrorField = inputs.price;
    }

    // 5. Check Stock (Cannot be empty)
    if (inputs.stock.value === "") {
        inputs.stock.classList.add('input-error');
        isValid = false;
        if (!firstErrorField) firstErrorField = inputs.stock;
    }

    // --- EXECUTION ---

    if (!isValid) {
        showToast("Please fill in all required fields correctly!", "error");
        if (firstErrorField) firstErrorField.focus(); // Jump to the error
        return;
    }

    const carData = {
        image: inputs.image.value || 'https://via.placeholder.com/300x200?text=No+Image',
        name: inputs.name.value.trim(),
        brand: inputs.brand.value.trim(),
        category: inputs.category.value,
        price: inputs.price.value,
        stock: inputs.stock.value
    };

    if (editIndex === -1) {
        carInventory.push(carData);
        showToast("Vehicle added successfully!", "success");
    } else {
        carInventory[editIndex] = carData;
        editIndex = -1;
        showToast("Vehicle updated successfully!", "success");
    }

    localStorage.setItem('myProducts', JSON.stringify(carInventory));
    renderCars();
    toggleModal();
}

// 4. Edit Function
window.editCar = function(index) {
    editIndex = index;
    const car = carInventory[index];

    document.getElementById('p-image').value = car.image;
    document.getElementById('p-name').value = car.name;
    document.getElementById('p-brand').value = car.brand;
    document.getElementById('p-cat').value = car.category;
    document.getElementById('p-price').value = car.price;
    document.getElementById('p-stock').value = car.stock;

    document.querySelector('.modal-content h3').innerText = "Edit Vehicle";
    document.querySelector('.add-btn').innerText = "Update Vehicle";

    toggleModal();
}
let currentFilter = 'All'; // Track which category is selected

function filterCars(category) {
    currentFilter = category;
    renderCars(); // Re-draw the table based on the filter
}

// 5. Delete Function with Toast
window.deleteCar = function(index) {
    if (confirm("Are you sure you want to remove this vehicle?")) {
        carInventory.splice(index, 1);
        localStorage.setItem('myProducts', JSON.stringify(carInventory));
        renderCars();
        showToast("Vehicle deleted.", "error");
    }
}

// 6. Modal Toggler
function toggleModal() {
    const modal = document.getElementById('productModal');
    const isOpening = (modal.style.display !== 'flex');
    
    modal.style.display = isOpening ? 'flex' : 'none';

    if (!isOpening) {
        editIndex = -1;
        document.querySelectorAll('.modal-content input').forEach(i => {
            i.value = '';
            i.classList.remove('input-error');
        });
        document.getElementById('p-cat').value = "";
        document.querySelector('.modal-content h3').innerText = "Add New Vehicle";
        document.querySelector('.add-btn').innerText = "Save Vehicle";
    }
}

window.createOrder = function(index) {
    let inventory = JSON.parse(localStorage.getItem('myProducts')) || [];
    let car = inventory[index];

    if (car.stock > 0) {
        // Reduce stock
        car.stock--;

        // Create the Order
        const newOrder = {
            id: Math.floor(1000 + Math.random() * 9000),
            carName: car.name,
            price: car.price,
            date: new Date().toLocaleDateString()
        };

        // Save Order
        let orders = JSON.parse(localStorage.getItem('myOrders')) || [];
        orders.push(newOrder);
        
        localStorage.setItem('myOrders', JSON.stringify(orders));
        localStorage.setItem('myProducts', JSON.stringify(inventory));

        alert("Order created! Stats updated.");
        location.reload(); // Refresh to see updated stock and dashboard stats
    } else {
        alert("Out of stock!");
    }
}

// Initial Load
renderCars();