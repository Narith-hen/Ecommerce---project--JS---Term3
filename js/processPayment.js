/**
 * 1. LOAD DATA ON START
 */
function loadCheckoutData() {
    const container = document.getElementById('checkout-items');
    const totalDisplay = document.getElementById('final-total');
    let cart = JSON.parse(localStorage.getItem('susuCart')) || [];

    if (cart.length === 0) {
        container.innerHTML = "<p>No cars selected.</p>";
        return;
    }

    let subtotal = 0;
    container.innerHTML = cart.map(car => {
        subtotal += car.price;
        return `
            <div class="summary-item">
                <span>${car.name} (${car.year})</span>
                <span>$${car.price.toLocaleString()}</span>
            </div>
        `;
    }).join('');

    // Adding Fees
    const finalTotal = subtotal + 450 + 1200;
    totalDisplay.innerText = `$${finalTotal.toLocaleString()}`;
}

/**
 * 2. PAYMENT METHOD SELECTION
 */
function selectPaymentMethod(element, type) {
    // 1. Remove 'active' class from all methods
    const methods = document.querySelectorAll('.method');
    methods.forEach(m => m.classList.remove('active'));
    
    // 2. Add 'active' class to the clicked element
    element.classList.add('active');

    // 3. Select the card details section
    const cardSection = document.getElementById('card-details-section');
    
    // 4. Show/Hide based on the 'type' parameter passed in the HTML
    if (type === 'card') {
        cardSection.style.display = 'block'; 
    } else {
        cardSection.style.display = 'none'; 
    }
}

/**
 * 3. PROCESS PAYMENT & VALIDATION
 */
function processPayment() {
    // 1. Reset Errors
    const inputs = document.querySelectorAll('input');
    const errorSpans = document.querySelectorAll('.error-msg');
    inputs.forEach(input => input.classList.remove('invalid', 'shake'));
    errorSpans.forEach(span => span.style.display = 'none');

    let isFormValid = true;

    // 2. Form Values
    const nameValue = document.getElementById('fullName').value.trim();
    const emailValue = document.getElementById('email').value.trim();

    // 3. Validation
    if (nameValue.length < 2) {
        showInputError(document.getElementById('fullName'), "nameError", "Full Name is required");
        isFormValid = false;
    }

    if (!validateEmail(emailValue)) {
        showInputError(document.getElementById('email'), "emailError", "Valid email is required");
        isFormValid = false;
    }

    // 4. Card Validation (only if visible)
    const cardSection = document.getElementById('card-details-section');
    if (cardSection.style.display !== 'none') {
        const cardInput = document.getElementById('cardNumber');
        if (cardInput.value.replace(/\s/g, '').length < 16) {
            showInputError(cardInput, "cardError", "Enter 16-digit card number");
            isFormValid = false;
        }
    }

    if (!isFormValid) return;

    // 5. SUCCESS FLOW: START PROCESSING
    const loading = document.getElementById('loading-overlay');
    const modal = document.getElementById('success-modal');

    loading.style.display = 'flex';

    setTimeout(() => {
        // --- KEY IMPROVEMENT: SAVE TO LOCALSTORAGE FOR ADMIN ---
        const cart = JSON.parse(localStorage.getItem('susuCart')) || [];
        const existingOrders = JSON.parse(localStorage.getItem('myOrders')) || [];

        // Create the order object
        const newOrder = {
            id: Math.floor(1000 + Math.random() * 9000), // Random Order ID
            customerName: nameValue,
            customerEmail: emailValue,
            // Join car names if there are multiple
            name: cart.map(item => item.name).join(", "), 
            price: cart.reduce((total, item) => total + item.price, 0) + 1650, // Price + Fees
            date: new Date().toLocaleDateString('en-GB'), // Format: DD/MM/YYYY
            status: "Completed"
        };

        // Add to the admin's list
        existingOrders.push(newOrder);
        localStorage.setItem('myOrders', JSON.stringify(existingOrders));

        // 6. UI Updates
        loading.style.display = 'none';
        modal.style.display = 'flex';
        
        // Clear the cart so they don't pay twice
        localStorage.removeItem('susuCart'); 
    }, 2000);
}

// Helpers
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showInputError(element, spanId, message) {
    element.classList.add('invalid', 'shake');
    const errorSpan = document.getElementById(spanId);
    if (errorSpan) {
        errorSpan.innerText = message;
        errorSpan.style.display = 'block';
    }
}

function closeModalAndRedirect() {
    window.location.href = "../index.html";
}

// Start
window.onload = loadCheckoutData;