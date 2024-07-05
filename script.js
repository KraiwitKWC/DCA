let chart;  // เพิ่มตัวแปรนี้เพื่อเก็บกราฟ

document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const monthlyInvestment = parseFloat(document.getElementById('principal').value);
    const annualRate = parseFloat(document.getElementById('rate').value) / 100;
    const years = parseInt(document.getElementById('years').value);
    const monthlyRate = annualRate / 12;

    let dataPoints = [];
    let labels = [];
    let totalAmount = 0;

    for (let year = 1; year <= years; year++) {
        for (let month = 1; month <= 12; month++) {
            totalAmount += monthlyInvestment;
            totalAmount += totalAmount * monthlyRate;
        }
        dataPoints.push(totalAmount.toFixed(2));
        labels.push(`Year ${year}`);
    }

    displayResults(dataPoints, labels);
});

function displayResults(dataPoints, labels) {
    const ctx = document.getElementById('resultsChart').getContext('2d');
    
    if (chart) {
        chart.destroy();  // ทำลายกราฟเก่าถ้ามีอยู่
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Investment Value (THB)',
                data: dataPoints,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
