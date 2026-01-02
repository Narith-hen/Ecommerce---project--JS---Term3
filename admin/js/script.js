// --- Data State ---
let products = JSON.parse(localStorage.getItem('myProducts')) || [];
let editIndex = -1; // -1 = Adding, otherwise = Index of product being edited

// --- DOM Elements ---
const productListBody = document.getElementById('product-list');

/**
 * 1. Renders the Main Dashboard Stats
 */
function updateDashboardStats() {
    const orders = JSON.parse(localStorage.getItem('myOrders')) || [];
    const products = JSON.parse(localStorage.getItem('myProducts')) || []; // Ensure products are loaded

    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.price || 0), 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const activeCustomers = new Set(orders.map(o => o.customerName)).size;

    // ADD CHECKS: Only update if the element actually exists on the current page
    const elRev = document.getElementById('stat-revenue');
    const elOrd = document.getElementById('stat-orders');
    const elCount = document.getElementById('product-count');
    const elCust = document.getElementById('stat-customers');

    if (elRev) elRev.innerText = `$${totalRevenue.toLocaleString()}`;
    if (elOrd) elOrd.innerText = totalOrders;
    if (elCount) elCount.innerText = totalProducts;
    if (elCust) elCust.innerText = activeCustomers;
}

/**
 * 2. Renders the Product Table
 */
function renderProductTable() {
    if (!productListBody) return;
    productListBody.innerHTML = '';

    if (products.length === 0) {
        productListBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No vehicles in fleet.</td></tr>';
        return;
    }

    products.forEach((product, index) => {
        const row = `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${product.image || 'https://via.placeholder.com/40'}" style="width: 40px; height: 30px; object-fit: cover; border-radius: 4px;">
                        <div>
                            <strong>${product.name}</strong><br>
                            <small style="color: #64748b;">${product.brand || 'AutoDrive'}</small>
                        </div>
                    </div>
                </td>
                <td><span class="status-badge" style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${product.category}</span></td>
                <td>$${Number(product.price).toLocaleString()}</td>
                <td>${product.stock} Units</td>
                <td>
                    <button onclick="editProduct(${index})" style="background:none; border:none; color:#3b82f6; cursor:pointer; font-size: 1.1rem;">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onclick="deleteProduct(${index})" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size: 1.1rem; margin-left: 10px;">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        productListBody.innerHTML += row;
    });
}

/**
 * 3. Save / Update Product Logic
 */
function saveProduct() {
    const name = document.getElementById('p-name').value;
    const brand = document.getElementById('p-brand').value;
    const category = document.getElementById('p-cat').value;
    const price = document.getElementById('p-price').value;
    const stock = document.getElementById('p-stock').value;
    const image = document.getElementById('p-image').value;

    if (!name || !price) {
        alert("Please enter at least the Car Model and Price.");
        return;
    }

    const carData = { name, brand, category, price, stock, image };

    if (editIndex === -1) {
        products.push(carData);
    } else {
        products[editIndex] = carData;
        editIndex = -1;
    }

    localStorage.setItem('myProducts', JSON.stringify(products));
    
    // Refresh UI
    toggleModal();
    renderProductTable();
    updateDashboardStats();
}

/**
 * 4. Helper Functions
 */
function toggleModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
    if (modal.style.display === 'none') resetForm();
}

function editProduct(index) {
    editIndex = index;
    const p = products[index];
    
    document.getElementById('p-name').value = p.name;
    document.getElementById('p-brand').value = p.brand;
    document.getElementById('p-cat').value = p.category;
    document.getElementById('p-price').value = p.price;
    document.getElementById('p-stock').value = p.stock;
    document.getElementById('p-image').value = p.image;

    document.querySelector('#productModal h3').innerText = "Edit Vehicle";
    toggleModal();
}

function deleteProduct(index) {
    if (confirm("Permanently remove this vehicle from fleet?")) {
        products.splice(index, 1);
        localStorage.setItem('myProducts', JSON.stringify(products));
        renderProductTable();
        updateDashboardStats();
    }
}

function resetForm() {
    editIndex = -1;
    document.querySelectorAll('.modal-content input').forEach(i => i.value = '');
    document.querySelector('#productModal h3').innerText = "Add New Vehicle";
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    updateDashboardStats();
    renderProductTable();
});

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('inventoryChart').getContext('2d');
    
    // Create a gradient for the bars/lines
    const blueGradient = ctx.createLinearGradient(0, 0, 0, 400);
    blueGradient.addColorStop(0, 'rgba(59, 130, 246, 1)');
    blueGradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');

    const inventoryChart = new Chart(ctx, {
        type: 'bar', // or 'line' for the wave look in your reference
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Stock Level',
                data: [65, 59, 80, 81, 56, 95],
                backgroundColor: blueGradient,
                borderColor: '#3b82f6',
                borderWidth: 2,
                borderRadius: 5,
                barPercentage: 0.5,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false } // Hide legend for cleaner look
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }, // Subtle dark grid
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                }
            }
        }
    });
});