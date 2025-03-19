document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });

            if (response.ok) {
                alert("Registration successful! Please log in.");
                window.location.href = "login.html";
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An error occurred. Please try again later.");
        }
    });
});
