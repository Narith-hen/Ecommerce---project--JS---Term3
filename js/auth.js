let generatedCode = "";

// --- Navigation Helpers ---
function hideAll() {
    document.querySelectorAll('.card').forEach(card => card.classList.add('hidden'));
}

function showRoleSelection() { hideAll(); document.getElementById("rolePage").classList.remove("hidden"); }
function showCreateAccount() { hideAll(); document.getElementById("createAccountPage").classList.remove("hidden"); }
function showLogin() { hideAll(); document.getElementById("loginPage").classList.remove("hidden"); }

function setRole(role) {
    localStorage.setItem("userRole", role);
    showLogin();
}

// --- NEW: Admin Loader Function ---
// This handles the "I am an Admin" button on your first card
function handleAdminClick(event) {
    event.preventDefault();
    const loader = document.getElementById('loaderOverlay');
    if (loader) loader.classList.remove('hidden');

    // Simulated verification delay
    setTimeout(() => {
        // Path should lead to your admin folder
        window.location.href = "../admin/login.html"; 
    }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LOGIN LOGIC ---
    document.getElementById("loginBtn")?.addEventListener("click", () => {
        const emailInput = document.getElementById("loginEmail").value.trim().toLowerCase();
        const passInput = document.getElementById("loginPass").value;
        const role = localStorage.getItem("userRole");

        const customers = JSON.parse(localStorage.getItem('carShopCustomers')) || [];

        if (role === 'admin') {
            // Internal Admin Check
            if (emailInput === "admin@auto.com" && passInput === "admin123") {
                window.location.href = "pages/dashboard.html";
            } else {
                alert("Invalid Admin Credentials!");
            }
        } else {
            // Find user in the "Customer Directory"
            const userMatch = customers.find(c => c.email.toLowerCase() === emailInput && c.password === passInput);

            if (userMatch) {
                alert(`Welcome back, ${userMatch.name}!`);
                localStorage.setItem("loggedInUser", JSON.stringify(userMatch));
                // Use relative path to go up one folder to reach root index
                window.location.href = "../index.html"; 
            } else {
                alert("Account not found.");
            }
        }
    });

    // --- 2. REGISTRATION ---
    document.getElementById("regContinueBtn")?.addEventListener("click", () => {
        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const pass = document.getElementById("regPass").value;
        const verify = document.getElementById("regVerify").value;

        if (!name || !email || pass.length < 6) {
            alert("Please fill all fields. Password must be 6+ characters.");
            return;
        }

        if (pass !== verify) {
            alert("Passwords do not match!");
            return;
        }

        generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        hideAll();
        document.getElementById("verifyPage").classList.remove("hidden");
        setTimeout(() => alert("Your verification code: " + generatedCode), 500);
    });

    // --- 3. VERIFY & SAVE ---
    document.getElementById("verifyBtn")?.addEventListener("click", () => {
        const enteredCode = document.getElementById("otpInput").value;

        if (enteredCode === generatedCode) {
            let customers = JSON.parse(localStorage.getItem('carShopCustomers')) || [];
            const emailValue = document.getElementById("regEmail").value.toLowerCase();
            
            if (customers.find(c => c.email.toLowerCase() === emailValue)) {
                alert("This email is already registered!");
                showCreateAccount();
                return;
            }

            const newCustomer = {
                id: Date.now(),
                name: document.getElementById("regName").value,
                email: emailValue,
                password: document.getElementById("regPass").value,
                phone: "No Phone Set", 
                interest: "Website Sign-up", 
                status: "Lead" 
            };

            customers.push(newCustomer);
            localStorage.setItem('carShopCustomers', JSON.stringify(customers));

            alert("Account created successfully!");
            showLogin(); 
        } else {
            alert("Invalid Verification Code.");
        }
    });
});