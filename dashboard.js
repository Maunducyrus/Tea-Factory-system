// dashboard.js

document.addEventListener("DOMContentLoaded", function () {
    const API_BASE_URL = "http://127.0.0.1:8000/api";
    const token = localStorage.getItem("token");
    
    if (!token) {
        window.location.href = "login.html"; // Redirect if not logged in
    }
    
    async function fetchDashboardData() {
        try {
            const response = await fetch(`${API_BASE_URL}/dashboard/`, {
                headers: { "Authorization": `Token ${token}` }
            });
            const data = await response.json();
            renderDashboard(data);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    }
    
    function renderDashboard(data) {
        document.getElementById("totalOrders").textContent = data.total_orders;
        document.getElementById("pendingOrders").textContent = data.pending_orders;
        document.getElementById("completedOrders").textContent = data.completed_orders;
        document.getElementById("totalRevenue").textContent = `Ksh ${data.total_revenue}`;
    }
    
    fetchDashboardData();
});
