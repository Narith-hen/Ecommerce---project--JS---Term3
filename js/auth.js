let generatedCode = "";

// Navigation
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

// Validation Message Helper
function updateUI(inputElement, isValid) {
    let msg = inputElement.nextElementSibling;
    if (!msg || !msg.classList.contains('status-msg')) {
        msg = document.createElement('div');
        msg.classList.add('status-msg');
        inputElement.parentNode.insertBefore(msg, inputElement.nextSibling);
    }
    msg.innerText = isValid ? "Correct" : "Incorrect";
    msg.style.color = isValid ? "#008a00" : "#c40000";
}

document.addEventListener("DOMContentLoaded", () => {
    
    // --- LOGIN LOGIC ---
    document.getElementById("loginBtn")?.addEventListener("click", () => {
        const email = document.getElementById("loginEmail").value;
        const role = localStorage.getItem("userRole");
        
        if (email) {
            // Redirect based on role selection
            if (role === 'admin') {
                window.location.href = "pages/dashboard.html"; 
            } else {
                window.location.href = "index.html";
            }
        } else {
            alert("Please fill in credentials");
        }
    });

    // --- REGISTRATION CONTINUE (Step 1) ---
    document.getElementById("regContinueBtn")?.addEventListener("click", () => {
        const name = document.getElementById("regName").value;
        const email = document.getElementById("regEmail").value;

        if (!name || !email) {
            alert("Please fill in your name and email");
            return;
        }

        // Generate and show code
        generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        hideAll();
        document.getElementById("verifyPage").classList.remove("hidden");
        setTimeout(() => alert("Your code: " + generatedCode), 1000);
    });

    // --- VERIFY & SAVE TO ADMIN LIST (Step 2) ---
    document.getElementById("verifyBtn")?.addEventListener("click", () => {
        const enteredCode = document.getElementById("otpInput").value;

        if (enteredCode === generatedCode) {
            // 1. Get current customers from LocalStorage
            let customers = JSON.parse(localStorage.getItem('carShopCustomers')) || [];
            
            // 2. Create the new customer object
            const newCustomer = {
                id: Date.now(),
                name: document.getElementById("regName").value,
                email: document.getElementById("regEmail").value,
                phone: "No Phone", 
                interest: "New Sign-up", 
                status: "Lead" // This makes them show up in the Admin list as a Lead
            };

            // 3. Add to list and save back to LocalStorage
            customers.push(newCustomer);
            localStorage.setItem('carShopCustomers', JSON.stringify(customers));

            alert("Account Created successfully!");
            
            // 4. Redirect based on role
            const role = localStorage.getItem("userRole");
            if (role === 'admin') {
                window.location.href = "pages/dashboard.html";
            } else {
                window.location.href = "index.html";
            }
        } else {
            alert("Wrong Code. Please try again.");
        }
    });
});