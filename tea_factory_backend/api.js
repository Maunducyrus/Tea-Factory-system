const API_URL = "http://127.0.0.1:8000/api"; // your Django backend URL

// Register User
async function registerUser(userData) {
    const response = await fetch(`${API_URL}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response.json();
}

// Login User
async function loginUser(credentials) {
    const response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

// Get Products
async function getProducts() {
    const response = await fetch(`${API_URL}/products/`);
    return response.json();
}

// Get Orders (Requires Authentication)
async function getOrders(token) {
    const response = await fetch(`${API_URL}/orders/`, {
        headers: { Authorization: `Token ${token}` },
    });
    return response.json();
}

// Place Order
async function placeOrder(orderData, token) {
    const response = await fetch(`${API_URL}/orders/`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Token ${token}` 
        },
        body: JSON.stringify(orderData),
    });
    return response.json();
}

// Logout User
function logoutUser() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
