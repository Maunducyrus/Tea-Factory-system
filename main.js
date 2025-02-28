document.addEventListener("DOMContentLoaded", function () {
    // Get references to form, search input, and order table
    const orderForm = document.querySelector(".order-form");
    const searchInput = document.getElementById("searchOrder");
    const orderTable = document.querySelector(".order-table tbody");

    // ✅ ORDER FORM VALIDATION & ALERT
    orderForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page refresh when submitting the form

        // Get user input values
        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("customerPhone").value.trim();
        const teaType = document.getElementById("teaType").value;
        const quantity = document.getElementById("quantity").value.trim();

        // Validate that all fields are filled
        if (name === "" || phone === "" || teaType === "" || quantity === "") {
            alert("⚠️ Please fill in all fields before placing your order.");
            return; // Stop function execution if any field is empty
        }

        // Display confirmation alert to the user
        alert(`✅ Order placed successfully!\n\n📌 Name: ${name}\n📌 Tea Type: ${teaType}\n📌 Quantity: ${quantity} Kg`);

        // ✅ ADD NEW ORDER TO THE TABLE
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${teaType}</td>
            <td>${quantity} Kg</td>
            <td><span class="badge bg-warning">Pending</span></td>
            <td><button class="btn btn-danger btn-sm cancel-btn">Cancel</button></td>
        `;

        orderTable.appendChild(newRow); // Append new order to table
        orderForm.reset(); // Clear form fields after submission
    });

    // ✅ ORDER SEARCH FUNCTION (Live Filtering)
    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase(); // Convert search input to lowercase
        const rows = orderTable.getElementsByTagName("tr"); // Get all rows in the table

        for (let row of rows) {
            const name = row.cells[0]?.textContent.toLowerCase() || ""; // Get the first cell (customer name)
            row.style.display = name.includes(searchText) ? "" : "none"; // Show/hide rows based on search input
        }
    });

    // ✅ ORDER CANCELLATION FEATURE
    orderTable.addEventListener("click", function (event) {
        // Check if the clicked element is a "Cancel" button
        if (event.target.classList.contains("cancel-btn")) {
            const row = event.target.closest("tr"); // Get the row that contains the clicked button
            row.cells[3].innerHTML = '<span class="badge bg-danger">Cancelled</span>'; // Update status to "Cancelled"
            event.target.remove(); // Remove the "Cancel" button after clicking
        }
    });
});
