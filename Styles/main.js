document.addEventListener("DOMContentLoaded", function () {
    const orderForm = document.querySelector(".order-form");
    const orderTable = document.querySelector(".order-table tbody");
    
    const API_BASE_URL = "http://127.0.0.1:8000/api";
    
    // Only run order table code if we're on the dashboard page

    // if (orderTable) {
    //     async function fetchOrders() {
    //         try {
    //             const response = await fetch(`${API_BASE_URL}/orders/`);
    //             const data = await response.json();
    //             renderOrders(data);
    //         } catch (error) {
    //             console.error("Error fetching orders:", error);
    //         }
    //     }
        
    //     function renderOrders(orders) {
    //         orderTable.innerHTML = "";
    //         orders.forEach(order => {
    //             const newRow = document.createElement("tr");
    //             newRow.innerHTML = `
    //                 <td>${order.customer_name}</td>
    //                 <td>${order.tea_type}</td>
    //                 <td>${order.quantity} Kg</td>
    //                 <td><span class="badge bg-warning">${order.status}</span></td>
    //                 <td><button class="btn btn-danger btn-sm cancel-btn" data-id="${order.id}">Cancel</button></td>
    //             `;
    //             orderTable.appendChild(newRow);
    //         });
    //     }
        
        // Only add event listeners if elements exist

    //     if (searchInput) {
    //         searchInput.addEventListener("input", function () {
    //             const searchText = searchInput.value.toLowerCase();
    //             const rows = orderTable.getElementsByTagName("tr");
    //             for (let row of rows) {
    //                 const name = row.cells[0]?.textContent.toLowerCase() || "";
    //                 row.style.display = name.includes(searchText) ? "" : "none";
    //             }
    //         });
    //     }
        
    //     orderTable.addEventListener("click", async function (event) {
    //         if (event.target.classList.contains("cancel-btn")) {
    //             const orderId = event.target.getAttribute("data-id");
    //             try {
    //                 await fetch(`${API_BASE_URL}/orders/${orderId}/`, {
    //                     method: "DELETE"
    //                 });
    //                 alert("Order cancelled successfully.");
    //                 fetchOrders();
    //             } catch (error) {
    //                 console.error("Error cancelling order:", error);
    //             }
    //         }
    //     });
        
    //     fetchOrders();
    // }
    
    // Order form submission - keep this on the main page
    if (orderForm) {
        orderForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const name = document.getElementById("customerName").value.trim();
            const phone = document.getElementById("customerPhone").value.trim();
            const teaType = document.getElementById("teaType").value;
            const quantity = document.getElementById("quantity").value.trim();
            
            if (!name || !phone || !teaType || !quantity) {
                alert("Please fill in all fields before placing your order.");
                return;
            }
            
            try {
                // Add console logs to debug
                console.log("Sending order data:", {
                    customer_name: name,
                    phone_number: phone,
                    tea_type: teaType,
                    quantity: quantity
                });

                const response = await fetch(`${API_BASE_URL}/orders/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        customer_name: name,
                        phone_number: phone,
                        tea_type: teaType,
                        quantity: quantity
                    })
                });
                const data = await response.json();
                alert("Order placed successfully!");
                orderForm.reset();
            } catch (error) {
                console.error("Error placing order:", error);
            }
        });
    }
});


// document.addEventListener("DOMContentLoaded", function () {
//     const orderForm = document.querySelector(".order-form");
//     const searchInput = document.getElementById("searchOrder");
//     const orderTable = document.querySelector(".order-table tbody");

//     const API_BASE_URL = "http://127.0.0.1:8000/api";

//     async function fetchOrders() {
//         try {
//             const response = await fetch(`${API_BASE_URL}/orders/`);
//             const data = await response.json();
//             renderOrders(data);
//         } catch (error) {
//             console.error("Error fetching orders:", error);
//         }
//     }

//     function renderOrders(orders) {
//         orderTable.innerHTML = "";
//         orders.forEach(order => {
//             const newRow = document.createElement("tr");
//             newRow.innerHTML = `
//                 <td>${order.customer_name}</td>
//                 <td>${order.tea_type}</td>
//                 <td>${order.quantity} Kg</td>
//                 <td><span class="badge bg-warning">${order.status}</span></td>
//                 <td><button class="btn btn-danger btn-sm cancel-btn" data-id="${order.id}">Cancel</button></td>
//             `;
//             orderTable.appendChild(newRow);
//         });
//     }

//     orderForm.addEventListener("submit", async function (event) {
//         event.preventDefault();
//         const name = document.getElementById("customerName").value.trim();
//         const phone = document.getElementById("customerPhone").value.trim();
//         const teaType = document.getElementById("teaType").value;
//         const quantity = document.getElementById("quantity").value.trim();

//         if (!name || !phone || !teaType || !quantity) {
//             alert("Please fill in all fields before placing your order.");
//             return;
//         }

//         try {
//             const response = await fetch(`${API_BASE_URL}/orders/`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     customer_name: name,
//                     phone_number: phone,
//                     tea_type: teaType,
//                     quantity: quantity
//                 })
//             });
//             const data = await response.json();
//             alert("Order placed successfully!");
//             fetchOrders();
//             orderForm.reset();
//         } catch (error) {
//             console.error("Error placing order:", error);
//         }
//     });

//     searchInput.addEventListener("input", function () {
//         const searchText = searchInput.value.toLowerCase();
//         const rows = orderTable.getElementsByTagName("tr");
//         for (let row of rows) {
//             const name = row.cells[0]?.textContent.toLowerCase() || "";
//             row.style.display = name.includes(searchText) ? "" : "none";
//         }
//     });

//     orderTable.addEventListener("click", async function (event) {
//         if (event.target.classList.contains("cancel-btn")) {
//             const orderId = event.target.getAttribute("data-id");
//             try {
//                 await fetch(`${API_BASE_URL}/orders/${orderId}/`, {
//                     method: "DELETE"
//                 });
//                 alert("Order cancelled successfully.");
//                 fetchOrders();
//             } catch (error) {
//                 console.error("Error cancelling order:", error);
//             }
//         }
//     });

//     fetchOrders();
// });

