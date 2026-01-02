// 1. DATA CONNECTION: Load from Admin's LocalStorage
function getInventory() {
    const storedProducts = localStorage.getItem('myProducts');
    return storedProducts ? JSON.parse(storedProducts) : [];
}

// 2. Selectors
const allCheckbox = document.getElementById('all-categories');
const categoryFilters = document.querySelectorAll('.category-filter');
const priceSlider = document.getElementById('price-slider');
const priceDisplay = document.getElementById('price-display');
const grid = document.getElementById('product-grid');

// 3. MASTER FILTER FUNCTION
function updateFilterResults() {
    const carInventory = getInventory(); // Fetch fresh data from Admin
    
    // Show loading skeleton
    grid.innerHTML = `
        <div class="skeleton skeleton-card"></div>
        <div class="skeleton skeleton-card"></div>
        <div class="skeleton skeleton-card"></div>
        <div class="skeleton skeleton-card"></div>
    `;

    setTimeout(() => {
        const maxPrice = parseInt(priceSlider.value);
        const checkedCategories = Array.from(categoryFilters)
            .filter(i => i.checked)
            .map(i => i.value);

        const filteredCars = carInventory.filter(car => {
            const matchesPrice = Number(car.price) <= maxPrice;
            const matchesCategory = allCheckbox.checked || 
                                    checkedCategories.length === 0 || 
                                    checkedCategories.includes(car.category);
            return matchesPrice && matchesCategory;
        });

        renderFilteredCars(filteredCars);
    }, 400); 
}

// 4. RENDERING FUNCTION
function renderFilteredCars(dataToDisplay) {
    if (!grid) return;

    if (dataToDisplay.length === 0) {
        grid.innerHTML = `<p style="padding: 20px; grid-column: 1/-1; text-align: center;">No cars found matching your criteria.</p>`;
        return;
    }

    grid.innerHTML = dataToDisplay.map((car, index) => `
        <div class="product-card" onclick="showCarDetails(${index})">
            <div class="product-image">
                <img src="${car.image}" alt="${car.name}" onerror="this.src='https://via.placeholder.com/300x200'">
                <span class="category-tag">${car.category}</span>
            </div>
            <div class="product-info">
                <p class="brand">${car.brand || car.category}</p>
                <h3 class="product-title">${car.name}</h3>
                <p class="price">$${Number(car.price).toLocaleString()}</p>
                <p class="stock-text" style="font-size: 12px; color: ${car.stock <= 2 ? '#ef4444' : '#64748b'}">
                    Availability: ${car.stock} units
                </p>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${index})">
                    <i class="fas fa-shopping-cart"></i> Add to Inquiry
                </button>
            </div>
        </div>
    `).join('');
}

// 5. CART / INQUIRY LOGIC
function addToCart(index) {
    const carInventory = getInventory();
    let cart = JSON.parse(localStorage.getItem('susuCart')) || [];
    const car = carInventory[index];
    
    if (car) {
        cart.push(car);
        localStorage.setItem('susuCart', JSON.stringify(cart));
        updateCartCount();
        showCustomAlert(car.name);
    }
}

function showCustomAlert(carName) {
    const alertBox = document.getElementById('custom-alert');
    const nameSpan = document.getElementById('alert-car-name');
    if (alertBox && nameSpan) {
        nameSpan.innerText = carName;
        alertBox.classList.add('show');
        setTimeout(() => alertBox.classList.remove('show'), 3000);
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('susuCart')) || [];
    const countElements = document.querySelectorAll('.cart-count');
    countElements.forEach(el => el.innerText = cart.length);
}

// 6. MODAL LOGIC
function showCarDetails(index) {
    const carInventory = getInventory();
    const car = carInventory[index];
    const modal = document.getElementById('carModal');
    const detailsContainer = document.getElementById('modal-details');

    if (!car || !modal) return;

    detailsContainer.innerHTML = `
        <div class="modal-grid" style="display: flex; gap: 20px; flex-wrap: wrap;">
            <img src="${car.image}" alt="${car.name}" class="modal-img" style="flex: 1; min-width: 250px; border-radius: 12px;">
            <div class="modal-info" style="flex: 1; min-width: 250px;">
                <h2 style="margin-bottom: 10px;">${car.name}</h2>
                <p style="color: #64748b; margin-bottom: 5px;">Brand: <strong>${car.brand || 'N/A'}</strong></p>
                <p>Category: <strong>${car.category}</strong></p>
                <p class="modal-price" style="font-size: 28px; color: #3b82f6; font-weight: 700; margin: 15px 0;">
                    $${Number(car.price).toLocaleString()}
                </p>
                <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <p>✨ Premium Inspection Guarantee</p>
                    <p>🕒 Immediate Inventory Availability</p>
                </div>
                <button class="add-to-cart-btn" style="width: 100%;" onclick="addToCart(${index})">Inquire Now</button>
            </div>
        </div>
    `;
    modal.style.display = "block";
}

// 7. EVENT LISTENERS
priceSlider.addEventListener('input', (e) => {
    priceDisplay.innerText = `$${parseInt(e.target.value).toLocaleString()}`;
    updateFilterResults();
});

allCheckbox.addEventListener('change', () => {
    if (allCheckbox.checked) {
        categoryFilters.forEach(cb => cb.checked = false);
    }
    updateFilterResults();
});

categoryFilters.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) allCheckbox.checked = false;
        updateFilterResults();
    });
});

// Modal Close logic
const modalElement = document.getElementById('carModal');
const closeBtnElement = document.querySelector('.close-button');
if (closeBtnElement) closeBtnElement.onclick = () => modalElement.style.display = "none";
window.onclick = (event) => { if (event.target == modalElement) modalElement.style.display = "none"; };

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateFilterResults();
    updateCartCount();
});