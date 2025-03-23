document.addEventListener("DOMContentLoaded", function () {
    const API_BASE_URL = "http://127.0.0.1:8000/api";
    const token = localStorage.getItem("token");
    const orderTableBody = document.getElementById("orderTableBody");
    
    if (!token) {
        window.location.href = "index.html"; // Redirect to the main page if not logged in
    }

    // Fetch and display dashboard overview data
    async function fetchDashboardData() {
        try {
            const response = await fetch(`${API_BASE_URL}/dashboard/`, {
                headers: { "Authorization": `Token ${token}` }
            });
            const data = await response.json();

            //Debugging
        if (data.length > 0) {
            console.log("Sample order data:", data[0]);
        }

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

       // Fetch and display orders
       async function fetchOrders() {
        try {
            const response = await fetch(`${API_BASE_URL}/orders/`, {
                headers: { "Authorization": `Token ${token}` }
            });
            const data = await response.json();
            renderOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    function renderOrders(orders) {
        orderTableBody.innerHTML = "";
        orders.forEach(order => {
            // Handle different possible field names
            const customerName = order.customer_name || "N/A";
            const teaType = order.tea_type || order.product_name || order.product || "N/A";
            const quantity = order.quantity || order.quantity_kg || "0";
            const status = order.status || "pending";

            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${order.customer_name}</td>
                <td>${order.product}</td>
                <td>${order.quantity} Kg</td>
                <td>
                    <select class="form-select status-select" data-id="${order.id}">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${order.id}">Delete</button>
                </td>
            `;
            orderTableBody.appendChild(newRow);
        });

        // Add event listeners to status selects
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', async function() {
                const orderId = this.getAttribute('data-id');
                const newStatus = this.value;
                
                try {
                    await fetch(`${API_BASE_URL}/orders/${orderId}/`, {
                        method: "PATCH",
                        headers: { 
                            "Authorization": `Token ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ status: newStatus })
                    });
                    
                    // Refresh dashboard data after status change
                    fetchDashboardData();
                } catch (error) {
                    console.error("Error updating order status:", error);
                }
            });
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async function() {
                if (confirm("Are you sure you want to delete this order?")) {
                    const orderId = this.getAttribute('data-id');
                    
                    try {
                        await fetch(`${API_BASE_URL}/orders/${orderId}/`, {
                            method: "DELETE",
                            headers: { "Authorization": `Token ${token}` }
                        });
                        
                        // Refresh orders and dashboard data
                        fetchOrders();
                        fetchDashboardData();
                    } catch (error) {
                        console.error("Error deleting order:", error);
                    }
                }
            });
        });
    }
    
    // Initialize the dashboard
    fetchDashboardData();
    fetchOrders();

    // Logout functionality
    document.getElementById("logoutBtn").addEventListener("click", function () {
        fetch(`${API_BASE_URL}/logout/`, {
            method: "POST",
            headers: { "Authorization": `Token ${token}` }
        }).then(() => {
            localStorage.removeItem("token");
            window.location.href = "index.html"; // Redirect to index page after logout
        }).catch(error => console.error("Logout error:", error));
    });
});
