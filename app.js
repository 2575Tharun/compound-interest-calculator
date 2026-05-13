let chart

function calculateInvestment() {

    const principal =
        Number(document.getElementById('principal').value)

    const annualRate =
        Number(document.getElementById('rate').value)

    const years =
        Number(document.getElementById('years').value)

    const monthlyContribution =
        Number(document.getElementById('monthly').value)

    const monthlyRate = annualRate / 12 / 100

    let total = principal

    const labels = []
    const values = []

    for(let year = 1; year <= years; year++) {

        for(let month = 1; month <= 12; month++) {

            total += monthlyContribution

            total *= (1 + monthlyRate)
        }

        labels.push(`Year ${year}`)
        values.push(total.toFixed(2))
    }

    const invested =
        principal + (monthlyContribution * 12 * years)

    const profit = total - invested

    document.getElementById('futureValue').innerText =
        `₹${total.toFixed(2)}`

    document.getElementById('invested').innerText =
        `₹${invested.toFixed(2)}`

    document.getElementById('profit').innerText =
        `₹${profit.toFixed(2)}`

    renderChart(labels, values)
}

function renderChart(labels, values) {

    const ctx =
        document.getElementById('growthChart')

    if(chart) {
        chart.destroy()
    }

    chart = new Chart(ctx, {
        type:'line',
        data:{
            labels:labels,
            datasets:[{
                label:'Investment Growth',
                data:values,
                borderColor:'#60a5fa',
                backgroundColor:'rgba(96,165,250,0.2)',
                tension:0.4,
                fill:true
            }]
        },
        options:{
            responsive:true,
            maintainAspectRatio:false,
            plugins:{
                legend:{
                    labels:{
                        color:'white'
                    }
                }
            },
            scales:{
                x:{
                    ticks:{
                        color:'white'
                    },
                    grid:{
                        color:'rgba(255,255,255,0.1)'
                    }
                },
                y:{
                    ticks:{
                        color:'white'
                    },
                    grid:{
                        color:'rgba(255,255,255,0.1)'
                    }
                }
            }
        }
    })
}
