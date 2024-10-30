document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("moodChart").getContext("2d");
    const moodChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{
                label: "Humor",
                data: [3, 2, 4, 5, 3],
                borderColor: "#5c2eb6",
                fill: true,
                backgroundColor: "rgba(92, 46, 182, 0.2)",
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});