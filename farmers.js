document.addEventListener("DOMContentLoaded", function () {
    const farmerForm = document.getElementById("farmerForm");
    const farmerTableBody = document.getElementById("farmerTableBody");
    const searchInput = document.getElementById("searchFarmer");
    const farmerSelect = document.getElementById("farmerSelect");
    const supplyForm = document.getElementById("supplyForm");

    let farmers = [];
    let editingIndex = null;

    // Function to add or update a farmer
    function addFarmer(name, phone, location, capacity) {
        const newFarmer = {
            name,
            phone,
            location,
            capacity,
            totalSupply: 0,
            payment: 0
        };

        if (editingIndex !== null) {
            farmers[editingIndex] = newFarmer;
            editingIndex = null;
        } else {
            farmers.push(newFarmer);
        }

        updateTable();
        updateFarmerDropdown();
        farmerForm.reset();
    }

    // Function to update the table
    function updateTable() {
        farmerTableBody.innerHTML = "";

        farmers.forEach((farmer, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${farmer.name}</td>
                <td>${farmer.phone}</td>
                <td>${farmer.location}</td>
                <td>${farmer.capacity} Kg</td>
                <td>${farmer.totalSupply} Kg</td>
                <td>Ksh ${farmer.payment.toFixed(2)}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Remove</button>
                </td>
            `;
            farmerTableBody.appendChild(row);
        });
    }

    // Function to update dropdown
    function updateFarmerDropdown() {
        farmerSelect.innerHTML = "";
        farmers.forEach((farmer, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = farmer.name;
            farmerSelect.appendChild(option);
        });
    }

    // Handle Farmer Registration
    farmerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("farmerName").value.trim();
        const phone = document.getElementById("farmerPhone").value.trim();
        const location = document.getElementById("farmerLocation").value.trim();
        const capacity = document.getElementById("teaCapacity").value.trim();

        if (name === "" || phone === "" || location === "" || capacity === "") {
            alert("⚠️ Please fill in all fields before registering.");
            return;
        }

        addFarmer(name, phone, location, capacity);
    });

    // Handle Tea Supply Logging
    supplyForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const farmerIndex = farmerSelect.value;
        const supplyQuantity = parseFloat(document.getElementById("supplyQuantity").value.trim());

        if (farmerIndex === "" || isNaN(supplyQuantity) || supplyQuantity <= 0) {
            alert("⚠️ Please enter valid supply details.");
            return;
        }

        farmers[farmerIndex].totalSupply += supplyQuantity;
        farmers[farmerIndex].payment += supplyQuantity * 50;

        updateTable();
        supplyForm.reset();
    });

    // Handle Farmer Search
    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase();
        document.querySelectorAll("#farmerTableBody tr").forEach(row => {
            const name = row.cells[0].textContent.toLowerCase();
            const location = row.cells[2].textContent.toLowerCase();
            row.style.display = name.includes(searchText) || location.includes(searchText) ? "" : "none";
        });
    });

    // Handle Edit & Delete Actions
    farmerTableBody.addEventListener("click", function (event) {
        const index = event.target.dataset.index;

        if (event.target.classList.contains("edit-btn")) {
            document.getElementById("farmerName").value = farmers[index].name;
            document.getElementById("farmerPhone").value = farmers[index].phone;
            document.getElementById("farmerLocation").value = farmers[index].location;
            document.getElementById("teaCapacity").value = farmers[index].capacity;

            editingIndex = index;
        }

        if (event.target.classList.contains("delete-btn")) {
            // Show confirmation dialog before deleting
            const confirmDelete = confirm(`🚨 Are you sure you want to delete ${farmers[index].name}?`);
            if (confirmDelete) {
                farmers.splice(index, 1);
                updateTable();
                updateFarmerDropdown();
            }
        }
    });
});
