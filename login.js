document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent form from submitting the traditional way
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        try {
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });
            
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token); // Store token
                alert("Login successful!");
                window.location.href = "dashboard.html"; // Redirect to dashboard
            } else {
                alert("Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred. Please try again later.");
        }
    });
});
