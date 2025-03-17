import { baseUrl } from "./baseUrl.js";

const loginButton = document.getElementById("login-button");
const authModal = document.getElementById("auth-modal");
const closeModal = document.getElementById("close-modal");
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const signupTab = document.getElementById("signup-tab");
const loginTab = document.getElementById("login-tab");
const responseMessage = document.getElementById("responseMessage");

// Toggle between Signup and Login
signupTab.addEventListener("click", () => {
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    signupForm.style.display = "block";
    loginForm.style.display = "none";
    responseMessage.textContent = "";
    clearFields();
});

loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    responseMessage.textContent = "";
    clearFields();
});

// Show modal
loginButton.addEventListener("click", () => {
    authModal.style.display = "block";
    document.body.classList.add("modal-open"); 
});

// Hide modal
closeModal.addEventListener("click", () => {
    authModal.style.display = "none";
    document.body.classList.remove("modal-open"); 
    clearFields();
});

// Clear input fields
function clearFields() {
    document.querySelectorAll("input").forEach(input => (input.value = ""));
}

// Handle Signup
signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("signup-email").value.trim();
    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    // Check for empty fields
    if (!email || !username || !password) {
        responseMessage.textContent = "All fields are required!";
        responseMessage.style.color = "red";
        return;
    }

    try {
        responseMessage.textContent = "Signing up...";
        responseMessage.style.color = "blue";

        const res = await fetch(`${baseUrl}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, username, password }),
        });

        const data = await res.json();

        if (res.ok) {
            responseMessage.textContent = "Signup successful! Please log in.";
            responseMessage.style.color = "green";
            setTimeout(() => {
                loginTab.click(); 
            }, 1500); 
        } else {
            responseMessage.textContent = data.message || "Signup failed!";
            responseMessage.style.color = "red";
        }
    } catch (error) {
        responseMessage.textContent = "An error occurred. Please try again.";
        responseMessage.style.color = "red";
        console.error("Error:", error);
    }
});

// Handle Login
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    // Check for empty fields
    if (!email || !password) {
        responseMessage.textContent = "All fields are required!";
        responseMessage.style.color = "red";
        return;
    }

    try {
        responseMessage.textContent = "Logging in...";
        responseMessage.style.color = "blue";

        const res = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            responseMessage.textContent = "Login successful!";
            responseMessage.style.color = "green";
            setTimeout(() => {
                authModal.style.display = "none"; 
                document.body.classList.remove("modal-open"); 
                clearFields();
            }, 1500); 
        } else {
            responseMessage.textContent = data.message || "Login failed!";
            responseMessage.style.color = "red";
        }
    } catch (error) {
        responseMessage.textContent = "An error occurred. Please try again.";
        responseMessage.style.color = "red";
        console.error("Error:", error);
    }
});
