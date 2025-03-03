document.addEventListener("DOMContentLoaded", function () {
    // Initialize Chart.js for Monthly Sales Trends
    const ctx = document.getElementById("salesChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
                {
                    label: "Total Sales (Kg)",
                    data: [1200, 900, 750, 1300, 1100, 1400],
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true },
            },
        },
    });

    // Search Report Function
    document.getElementById("searchReport").addEventListener("input", function () {
        let searchText = this.value.toLowerCase();
        let rows = document.querySelectorAll("#salesTable tbody tr");

        rows.forEach(row => {
            let rowData = row.textContent.toLowerCase();
            row.style.display = rowData.includes(searchText) ? "" : "none";
        });
    });
});

// Export to CSV
function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    let rows = document.querySelectorAll("table tr");

    rows.forEach(row => {
        let rowData = [];
        row.querySelectorAll("th, td").forEach(cell => rowData.push(cell.innerText));
        csvContent += rowData.join(",") + "\n";
    });

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tea_factory_report.csv");
    document.body.appendChild(link);
    link.click();
}

// Export to PDF
function exportToPDF() {
    let element = document.getElementById("reports");
    if (element) {
        html2pdf(element);
    } else {
        console.log("Reports section not found for PDF export.")
    }
    
}
