let products = JSON.parse(localStorage.getItem('myProducts')) || [];
let editIndex = -1; // -1 means we are adding a new product, not editing

const productList = document.getElementById('product-list');
const productCount = document.getElementById('product-count');

function renderDashboard() {
    productList.innerHTML = '';
    productCount.innerText = products.length;

    products.forEach((product, index) => {
        const row = `
            <tr>
                <td>${product.name}</td>
                <td><span class="category-tag">${product.category}</span></td>
                <td>$${Number(product.price).toLocaleString()}</td>
                <td>${product.stock}</td>
                <td>
                    <button onclick="editProduct(${index})" style="background:transparent; border:none; color:#3b82f6; cursor:pointer; margin-right:10px;">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onclick="deleteProduct(${index})" style="background:transparent; border:none; color:#ef4444; cursor:pointer;">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        productList.innerHTML += row;
    });
}

function toggleModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
    
    // If closing modal, reset edit state
    if (modal.style.display === 'none') {
        editIndex = -1;
        resetForm();
    }
}

// 1. Function to load product data into the Modal for editing
function editProduct(index) {
    editIndex = index; // Set the index to the product we want to edit
    const product = products[index];

    // Fill the inputs with current data
    document.getElementById('p-name').value = product.name;
    document.getElementById('p-cat').value = product.category;
    document.getElementById('p-price').value = product.price;
    document.getElementById('p-stock').value = product.stock;

    // Change Modal title and button text for better UX
    document.querySelector('#productModal h3').innerText = "Edit Product";
    document.querySelector('.add-btn').innerText = "Update Product";

    toggleModal();
}

// 2. Updated Save Function (Handles both Add and Update)
function saveCar() {
    // 1. Grab all input elements
    const inputs = {
        name: document.getElementById('p-name'),
        brand: document.getElementById('p-brand'),
        category: document.getElementById('p-cat'),
        price: document.getElementById('p-price'),
        stock: document.getElementById('p-stock'),
        image: document.getElementById('p-image')
    };

    const errorMsg = document.getElementById('error-message');
    let isValid = true;

    // 2. Simple Validation Loop
    // We check all fields except image (which can be optional)
    for (let key in inputs) {
        if (key !== 'image' && !inputs[key].value.trim()) {
            inputs[key].classList.add('input-error'); // Add red border
            isValid = false;
        } else {
            inputs[key].classList.remove('input-error');
        }
    }

    // 3. If not valid, stop here and show message
    if (!isValid) {
        errorMsg.style.display = 'block';
        return;
    }

    // 4. If valid, hide error message and proceed
    errorMsg.style.display = 'none';

    const carData = {
        name: inputs.name.value,
        brand: inputs.brand.value,
        category: inputs.category.value,
        price: inputs.price.value,
        stock: inputs.stock.value,
        image: inputs.image.value || 'https://via.placeholder.com/300x200?text=No+Image'
    };

    if (editIndex === -1) {
        carInventory.push(carData);
    } else {
        carInventory[editIndex] = carData;
        editIndex = -1;
    }

    localStorage.setItem('myProducts', JSON.stringify(carInventory));
    renderCars();
    toggleModal();
}

function resetForm() {
    document.getElementById('p-name').value = '';
    document.getElementById('p-cat').value = '';
    document.getElementById('p-price').value = '';
    document.getElementById('p-stock').value = '';
    document.querySelector('#productModal h3').innerText = "Add New Product";
    document.querySelector('.add-btn').innerText = "Save Product";
}

function deleteProduct(index) {
    if(confirm("Are you sure you want to delete this product?")) {
        products.splice(index, 1);
        localStorage.setItem('myProducts', JSON.stringify(products));
        renderDashboard();
    }
}

// Function to update the Stat Cards on the Dashboard
function updateDashboardStats() {
    const products = JSON.parse(localStorage.getItem('myProducts')) || [];
    const orders = JSON.parse(localStorage.getItem('myOrders')) || [];

    // 1. Calculate Total Revenue from all orders
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.price), 0);

    // 2. Update HTML elements by ID
    const revenueEl = document.getElementById('stat-revenue');
    const ordersEl = document.getElementById('stat-orders');
    const productCountEl = document.getElementById('product-count');

    if (revenueEl) revenueEl.innerText = `$${totalRevenue.toLocaleString()}`;
    if (ordersEl) ordersEl.innerText = orders.length;
    if (productCountEl) productCountEl.innerText = products.length;
}

// Call this whenever the Dashboard loads
document.addEventListener('DOMContentLoaded', updateDashboardStats);

renderDashboard();