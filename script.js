const currecyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currecyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


// fetch exchange rates and update the DOM
function calculate() {
    const currency_one = currecyEl_one.value;
    const currency_two = currecyEl_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency_two];

            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        });
}

// Event listeners
currecyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currecyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currecyEl_one.value;
    currecyEl_one.value = currecyEl_two.value;
    currecyEl_two.value = temp;
    calculate();
})

calculate();