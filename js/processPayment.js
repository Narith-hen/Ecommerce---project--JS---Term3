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

    const finalTotal = subtotal + 450 + 1200;
    totalDisplay.innerText = `$${finalTotal.toLocaleString()}`;
}

window.onload = loadCheckoutData;
const activeMethod = document.querySelector('.method.active').innerText.trim();

function processPayment() {
    // 1. Get the current payment method INSIDE the function
    const activeMethodElement = document.querySelector('.method.active');
    const activeMethod = activeMethodElement ? activeMethodElement.innerText.trim() : "Card";

    // 2. Reset all previous error states
    const inputs = document.querySelectorAll('input');
    const errorSpans = document.querySelectorAll('.error-msg');
    inputs.forEach(input => input.classList.remove('invalid', 'shake'));
    errorSpans.forEach(span => span.style.display = 'none');

    let isFormValid = true;

    // 3. Validate Contact Info
    const nameInput = document.getElementById('fullName');
    if (nameInput.value.trim().length < 2) {
        showInputError(nameInput, "nameError", "Full Name is required");
        isFormValid = false;
    }

    const emailInput = document.getElementById('email');
    if (!validateEmail(emailInput.value)) {
        showInputError(emailInput, "emailError", "Please enter a valid email address");
        isFormValid = false;
    }

    // 4. Validate Card Info
    if (activeMethod === "Card") {
        const cardInput = document.getElementById('cardNumber');
        const expiryInput = document.getElementById('expiry');
        const cvvInput = document.getElementById('cvv');

        if (cardInput.value.replace(/\s/g, '').length < 16) {
            showInputError(cardInput, "cardError", "Enter a valid 16-digit card number");
            isFormValid = false;
        }

        if (expiryInput.value.length < 5) {
            // Highlighting the box even if there isn't a specific span for expiry
            expiryInput.classList.add('invalid', 'shake');
            isFormValid = false;
        }

        if (cvvInput.value.length < 3) {
            cvvInput.classList.add('invalid', 'shake');
            isFormValid = false;
        }
    }

    if (!isFormValid) return;

    // 5. SUCCESS FLOW
    const loading = document.getElementById('loading-overlay');
    const modal = document.getElementById('success-modal');

    loading.style.display = 'flex';

    setTimeout(() => {
        loading.style.display = 'none';
        modal.style.display = 'flex';
        localStorage.removeItem('susuCart');
    }, 2000);
}

// Helper: Email Regex (Fixed to use your helper)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}


// Support function for visual errors
function showInputError(element, spanId, message) {
    element.classList.add('invalid', 'shake');
    const errorSpan = document.getElementById(spanId);
    if (errorSpan) {
        errorSpan.innerText = message;
        errorSpan.style.display = 'block';
    }
}

// Helper: Visual feedback for errors
function highlightError(element) {
    element.style.borderColor = "#ff4500";
    element.focus();
    setTimeout(() => { element.style.borderColor = "#ddd"; }, 3000);
}

function closeModalAndRedirect() {
    window.location.href = "../index.html";
}

function selectPaymentMethod(element, type) {
    // 1. Highlight the selected box
    const methods = document.querySelectorAll('.method');
    methods.forEach(m => m.classList.remove('active'));
    element.classList.add('active');

    // 2. Show or Hide the Card Input section
    const cardSection = document.getElementById('card-details-section');
    
    if (type === 'card') {
        cardSection.style.display = 'block'; // Show Visa/Mastercard fields
    } else {
        cardSection.style.display = 'none';  // Hide them for PayPal/Bank
    }
}