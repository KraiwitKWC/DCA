let chart;  
let popupChart;

document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const monthlyInvestment = parseFloat(document.getElementById('principal').value);
    const annualRate = parseFloat(document.getElementById('rate').value) / 100;
    const years = parseInt(document.getElementById('years').value);
    const monthlyRate = annualRate / 12;
    const bankRate = 0.015 / 12;
    const investmentRate = 0.06 / 12;

    let dataPointsUser = [];
    let dataPointsBank = [];
    let dataPointsInvestment = [];
    let labels = ['0']; // เพิ่มปีที่ 0
    let totalAmountUser = 0;
    let totalAmountBank = 0;
    let totalAmountInvestment = 0;

    for (let year = 1; year <= years; year++) {
        for (let month = 1; month <= 12; month++) {
            totalAmountUser += monthlyInvestment;
            totalAmountUser += totalAmountUser * monthlyRate;

            totalAmountBank += monthlyInvestment;
            totalAmountBank += totalAmountBank * bankRate;

            totalAmountInvestment += monthlyInvestment;
            totalAmountInvestment += totalAmountInvestment * investmentRate;
        }
        dataPointsUser.push(totalAmountUser.toFixed(2));
        dataPointsBank.push(totalAmountBank.toFixed(2));
        dataPointsInvestment.push(totalAmountInvestment.toFixed(2));
        labels.push(`Year ${year}`);
    }

    displayResults(dataPointsUser, dataPointsBank, dataPointsInvestment, labels);
    setupPopup(dataPointsUser, dataPointsBank, dataPointsInvestment, labels);

    // แสดงปุ่ม Show Detailed Graph
    document.getElementById('showPopup').style.display = 'block';
});

function displayResults(dataPointsUser, dataPointsBank, dataPointsInvestment, labels) {
    const ctx = document.getElementById('resultsChart').getContext('2d');
    
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Total Investment Value (THB) - User Rate',
                    data: dataPointsUser,
                    borderColor: 'rgba(75, 192, 75, 1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Total Investment Value (THB) - Bank Rate 1.5%',
                    data: dataPointsBank,
                    borderColor: 'rgba(128, 0, 128, 1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Total Investment Value (THB) - Investment Rate 6%',
                    data: dataPointsInvestment,
                    borderColor: 'rgba(0, 0, 255, 1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Years'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Investment Value (THB)'
                    }
                }
            }
        }
    });
}

function setupPopup(dataPointsUser, dataPointsBank, dataPointsInvestment, labels) {
    const popup = document.getElementById('popup');
    const showPopupButton = document.getElementById('showPopup');
    const closeButton = document.querySelector('.close');

    showPopupButton.onclick = function() {
        popup.style.display = 'flex';

        const popupCtx = document.getElementById('popupChart').getContext('2d');
        if (popupChart) {
            popupChart.destroy();
        }

        popupChart = new Chart(popupCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Investment Value (THB) - User Rate',
                        data: dataPointsUser,
                        borderColor: 'rgba(75, 192, 75, 1)',
                        borderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Total Investment Value (THB) - Bank Rate 2%',
                        data: dataPointsBank,
                        borderColor: 'rgba(128, 0, 128, 1)',
                        borderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Total Investment Value (THB) - Investment Rate 6%',
                        data: dataPointsInvestment,
                        borderColor: 'rgba(0, 0, 255, 1)',
                        borderWidth: 2,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Years'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Investment Value (THB)'
                        }
                    }
                }
            }
        });
    };

    closeButton.onclick = function() {
        popup.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style
        }
    }
}