// 1. Data remains the same
const carProducts = [
    { id: 1, name: "Tesla Model 3 Performance", price: 45000, category: "Electric", year: 2023, mileage: "12,000 km", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600", rating: 4.9 },
    { id: 2, name: "BMW M4 Competition", price: 78000, category: "Sports", year: 2022, mileage: "8,500 km", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600", rating: 4.8 },
    { id: 3, name: "Range Rover Sport", price: 79000, category: "SUV", year: 2024, mileage: "1,200 km", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600", rating: 4.7 },
    { id: 4, name: "Audi Q8 e-tron", price: 88000, category: "SUV", year: 2024, mileage: "1,300 km", image: "https://www.topgear.com/sites/default/files/2024/02/11426-0K2A6582.jpg?w=1290&h=726", rating: 4.7 },
    { id: 5, name: "Volvo XC90", price: 90000, category: "SUV", year: 2024, mileage: "1,100 km", image: "https://www.topgear.com/sites/default/files/2024/02/294655_XC90_Recharge_T8_AWD_Denim_Blue.jpg?w=1290&h=726", rating: 4.7 },
    { id: 6, name: "Bentley Bentayga", price: 98000, category: "SUV", year: 2025, mileage: "1,180 km", image: "https://www.topgear.com/sites/default/files/2024/02/Bentayga%20on%20road%20-%205.jpg?w=1290&h=726", rating: 4.3 },
];

// 2. Selectors
const allCheckbox = document.getElementById('all-categories');
const categoryFilters = document.querySelectorAll('.category-filter');
const priceSlider = document.getElementById('price-slider');
const priceDisplay = document.getElementById('price-display');
const grid = document.getElementById('product-grid');

// 3. MASTER FILTER FUNCTION
function updateFilterResults() {
    const grid = document.getElementById('product-grid');
    
    // 1. Show the "Flow" (Skeletons) first
    grid.innerHTML = `
        <div class="skeleton skeleton-card"></div>
        <div class="skeleton skeleton-card"></div>
        <div class="skeleton skeleton-card"></div>
        <div class="skeleton skeleton-card"></div>
    `;

    // 2. Wait a tiny bit (simulating loading) then show results
    setTimeout(() => {
        const maxPrice = parseInt(priceSlider.value);
        const checkedCategories = Array.from(categoryFilters)
            .filter(i => i.checked)
            .map(i => i.value);

        const filteredCars = carProducts.filter(car => {
            const matchesPrice = car.price <= maxPrice;
            const matchesCategory = allCheckbox.checked || 
                                    checkedCategories.length === 0 || 
                                    checkedCategories.includes(car.category);
            return matchesPrice && matchesCategory;
        });

        renderFilteredCars(filteredCars);
    }, 400); // 400ms is the "sweet spot" for a fast feel
}

// 4. RENDERING FUNCTION (Fixed to allow clicking for details)
function renderFilteredCars(dataToDisplay) {
    if (!grid) return;

    if (dataToDisplay.length === 0) {
        grid.innerHTML = `<p style="padding: 20px;">No cars found matching your criteria.</p>`;
        return;
    }

    grid.innerHTML = dataToDisplay.map(car => `
        <div class="product-card" onclick="showCarDetails(${car.id})">
            <div class="product-image">
                <img src="${car.image}" alt="${car.name}">
            </div>
            <div class="product-info">
                <p class="brand">${car.category}</p>
                <h3 class="product-title">${car.name}</h3>
                <p class="price">$${car.price.toLocaleString()}</p>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${car.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// 5. CART LOGIC (Crucial for the 🛒 to work)
function addToCart(carId) {
    let cart = JSON.parse(localStorage.getItem('susuCart')) || [];
    const car = carProducts.find(c => c.id === carId);
    
    if (car) {
        cart.push(car);
        localStorage.setItem('susuCart', JSON.stringify(cart));
        updateCartCount();
        
        // --- NEW CUSTOM ALERT LOGIC ---
        showCustomAlert(car.name);
    }
}

function showCustomAlert(carName) {
    const alertBox = document.getElementById('custom-alert');
    const nameSpan = document.getElementById('alert-car-name');
    
    nameSpan.innerText = carName;
    alertBox.classList.add('show');

    // Hide it automatically after 3 seconds
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('susuCart')) || [];
    const countElement = document.querySelector('.cart-count');
    if (countElement) countElement.innerText = cart.length;
}

// 6. MODAL LOGIC
function showCarDetails(carId) {
    const car = carProducts.find(c => c.id === carId);
    const modal = document.getElementById('carModal');
    const detailsContainer = document.getElementById('modal-details');

    if (!car || !modal) return;

    detailsContainer.innerHTML = `
        <div class="modal-grid">
            <img src="${car.image}" alt="${car.name}" class="modal-img" style="width:100%">
            <div class="modal-info">
                <h2>${car.name}</h2>
                <p>Category: <strong>${car.category}</strong></p>
                <p>Year: ${car.year} | Mileage: ${car.mileage}</p>
                <p class="modal-price" style="font-size: 24px; color: #ff4500;">$${car.price.toLocaleString()}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${car.id})">Inquire Now</button>
            </div>
        </div>
    `;
    modal.style.display = "block";
}

// 7. EVENT LISTENERS
priceSlider.addEventListener('input', (e) => {
    priceDisplay.innerText = `$${parseInt(e.target.value).toLocaleString()}`;
    updateFilterResults(); // Fixed name
});

allCheckbox.addEventListener('change', () => {
    if (allCheckbox.checked) {
        categoryFilters.forEach(cb => cb.checked = false);
    }
    updateFilterResults();
});

categoryFilters.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            allCheckbox.checked = false;
        }
        updateFilterResults();
    });
});

// Modal Close logic
const modalElement = document.getElementById('carModal');
const closeBtnElement = document.querySelector('.close-button');

if (closeBtnElement) {
    closeBtnElement.onclick = () => modalElement.style.display = "none";
}

window.onclick = (event) => {
    if (event.target == modalElement) {
        modalElement.style.display = "none";
    }
};

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    updateFilterResults();
    updateCartCount();
});