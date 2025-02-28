document.addEventListener("DOMContentLoaded", function () {
    const orderForm = document.querySelector(".order-form");
    const searchInput = document.getElementById("searchOrder");
    const orderTable = document.querySelector(".order-table tbody");

    // ✅ ORDER FORM VALIDATION & ALERT
    orderForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page refresh

        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("customerPhone").value.trim();
        const teaType = document.getElementById("teaType").value;
        const quantity = document.getElementById("quantity").value.trim();

        if (name === "" || phone === "" || teaType === "" || quantity === "") {
            alert("Please fill in all fields before placing your order.");
            return;
        }

        // ✅ Display confirmation message
        alert(`Order placed successfully!\n\nName: ${name}\nTea Type: ${teaType}\nQuantity: ${quantity} Kg`);

        // ✅ Add new order to the table
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${teaType}</td>
            <td>${quantity} Kg</td>
            <td><span class="badge bg-warning">Pending</span></td>
            <td><button class="btn btn-danger btn-sm cancel-btn">Cancel</button></td>
        `;

        orderTable.appendChild(newRow);
        orderForm.reset();
    });

    // ✅ ORDER SEARCH FUNCTION
    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase();
        const rows = orderTable.getElementsByTagName("tr");

        for (let row of rows) {
            const name = row.cells[0]?.textContent.toLowerCase() || "";
            row.style.display = name.includes(searchText) ? "" : "none";
        }
    });

    // ✅ ORDER CANCELLATION FEATURE
    orderTable.addEventListener("click", function (event) {
        if (event.target.classList.contains("cancel-btn")) {
            const row = event.target.closest("tr");
            row.cells[3].innerHTML = '<span class="badge bg-danger">Cancelled</span>';
            event.target.remove(); // Remove cancel button
        }
    });
});
