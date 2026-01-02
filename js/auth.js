let generatedCode = "";

// --- 1. Navigation Helpers ---
function hideAll() {
    document.querySelectorAll('.card').forEach(card => card.classList.add('hidden'));
}

function showRoleSelection() {
    hideAll();
    document.getElementById("rolePage").classList.remove("hidden");
}

function showCreateAccount() {
    hideAll();
    document.getElementById("createAccountPage").classList.remove("hidden");
    
    // NEW: Check if we should show the admin phone field
    const role = localStorage.getItem("userRole");
    const phoneField = document.getElementById("adminPhoneField");
    if (role === 'admin') {
        phoneField.classList.remove("hidden");
    } else {
        phoneField.classList.add("hidden");
    }
}

function showLogin() {
    hideAll();
    document.getElementById("loginPage").classList.remove("hidden");
}

// Clears all input fields (useful when switching roles or pages)
function resetForms() {
    document.querySelectorAll('input').forEach(input => input.value = "");
}

function setRole(role) {
    localStorage.setItem("userRole", role);
    resetForms();
    showLogin();
}

// --- 2. Admin Loader Function ---
function handleAdminClick(event) {
    event.preventDefault();
    const loader = document.getElementById('loaderOverlay');
    if (loader) loader.classList.remove('hidden');

    // Simulated verification delay before redirecting to Admin Login
    setTimeout(() => {
        window.location.href = "../admin/login.html";
    }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {

    // --- 3. LOGIN LOGIC ---
    document.getElementById("loginBtn")?.addEventListener("click", () => {
        const emailInput = document.getElementById("loginEmail").value.trim().toLowerCase();
        const passInput = document.getElementById("loginPass").value;
        const role = localStorage.getItem("userRole");

        // Load existing users
        const customers = JSON.parse(localStorage.getItem('carShopCustomers')) || [];

        if (role === 'admin') {
            // Internal Admin Check
            if (emailInput === "admin@auto.com" && passInput === "admin123") {
                alert("Admin Access Granted");
                // Redirect to admin dashboard
                window.location.href = "../admin.html";
            } else {
                alert("Invalid Admin Credentials!");
            }
        } else {
            // Find user in the Customer Directory
            const userMatch = customers.find(c => c.email.toLowerCase() === emailInput && c.password === passInput);

            if (userMatch) {
                alert(`Welcome back, ${userMatch.name}!`);
                localStorage.setItem("loggedInUser", JSON.stringify(userMatch));
                window.location.href = "../index.html";
            } else {
                alert("Account not found. Please check your credentials or create an account.");
            }
        }
    });

    // --- 4. REGISTRATION (Triggers OTP) ---
    document.getElementById("regContinueBtn")?.addEventListener("click", () => {
        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const pass = document.getElementById("regPass").value;
        const verify = document.getElementById("regVerify").value;

        // Validation
        if (!name || !email || pass.length < 6) {
            alert("Please fill all fields. Password must be at least 6 characters.");
            return;
        }

        if (pass !== verify) {
            alert("Passwords do not match!");
            return;
        }

        // Generate 6-digit OTP
        generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

        hideAll();
        document.getElementById("verifyPage").classList.remove("hidden");

        // Simulate sending email
        setTimeout(() => alert("Your AutoDrive Verification Code: " + generatedCode), 500);
    });

    // --- 5. VERIFY & SAVE TO LOCALSTORAGE ---
    document.getElementById("verifyBtn")?.addEventListener("click", () => {
        const enteredCode = document.getElementById("otpInput").value;

        if (enteredCode === generatedCode) {
            let customers = JSON.parse(localStorage.getItem('carShopCustomers')) || [];
            const role = localStorage.getItem("userRole");

            // NEW: Capture the phone number from the input field
            const phoneInput = document.getElementById("regPhone").value.trim();

            const newUser = {
                id: Date.now(),
                name: document.getElementById("regName").value,
                email: document.getElementById("regEmail").value.toLowerCase(),
                password: document.getElementById("regPass").value,
                // Link the phone number here so it appears in Admin
                phone: phoneInput || "No Phone Provided",
                role: role,
                status: "Lead", // Default status for Admin tracking
                joinDate: new Date().toLocaleDateString()
            };

            customers.push(newUser);
            localStorage.setItem('carShopCustomers', JSON.stringify(customers));

            alert("Account created! Admin can now see your phone number: " + newUser.phone);
            showLogin();
        } else {
            alert("Invalid Code.");
        }
    });
});

// Helper function to toggle password visibility
function togglePassword(id) {
    const field = document.getElementById(id);
    if (field) {
        field.type = field.type === "password" ? "text" : "password";
    }
}