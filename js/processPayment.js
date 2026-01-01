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
    // 1. Get the ACTIVE method element
    const activeMethodElement = document.querySelector('.method.active');
    
    // 2. Reset Errors (same as your current code)
    const inputs = document.querySelectorAll('input');
    const errorSpans = document.querySelectorAll('.error-msg');
    inputs.forEach(input => input.classList.remove('invalid', 'shake'));
    errorSpans.forEach(span => span.style.display = 'none');

    let isFormValid = true;

    // 3. Contact Validation
    const nameInput = document.getElementById('fullName');
    if (nameInput.value.trim().length < 2) {
        showInputError(nameInput, "nameError", "Full Name is required");
        isFormValid = false;
    }

    const emailInput = document.getElementById('email');
    if (!validateEmail(emailInput.value)) {
        showInputError(emailInput, "emailError", "Valid email is required");
        isFormValid = false;
    }

    // 4. IMPROVED CARD VALIDATION CHECK
    // Instead of checking text, we check if the Card Section is currently visible
    const cardSection = document.getElementById('card-details-section');
    
    if (cardSection.style.display !== 'none') {
        const cardInput = document.getElementById('cardNumber');
        const expiryInput = document.getElementById('expiry');
        const cvvInput = document.getElementById('cvv');

        if (cardInput.value.replace(/\s/g, '').length < 16) {
            showInputError(cardInput, "cardError", "Enter 16-digit card number");
            isFormValid = false;
        }
        if (expiryInput.value.length < 5) {
            expiryInput.classList.add('invalid', 'shake');
            isFormValid = false;
        }
        if (cvvInput.value.length < 3) {
            cvvInput.classList.add('invalid', 'shake');
            isFormValid = false;
        }
    }

    // 5. Finalize if valid
    if (!isFormValid) return;

    const loading = document.getElementById('loading-overlay');
    const modal = document.getElementById('success-modal');

    loading.style.display = 'flex';

    setTimeout(() => {
        loading.style.display = 'none';
        modal.style.display = 'flex';
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