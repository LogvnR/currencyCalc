const logvn = 'b0bd94d1da01efa433b37b7b';
const mainForm = document.querySelector('.mainForm');
const fromOption = document.querySelector('#fromOptions');
const toOption = document.querySelector('#toOptions');
const result = document.querySelector('.resultsText');
const fromResult = document.querySelector('.fromResultsText');
const toResult = document.querySelector('.toResultsText');
const valInput = document.querySelector('#fromInput');
const reset = document.querySelector('.reset');

// ===== Rounding Function =====
function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
// ===== Style Changes =====
function errorStyle(input) {
  input.style.border = '2px solid Red';
}

function normalStyle(input) {
  input.style.border = '1px solid Black';
}

// ===== Main User Submit =====
mainForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const input = valInput.value;
  if (
    fromOption.value === 'NONE' ||
    input === '' ||
    toOption.value === 'NONE'
  ) {
    result.innerText = 'Please Fill Out Options';
    errorStyle(fromOption);
    errorStyle(toOption);
    errorStyle(valInput);
  } else {
    const aquiredCurrency = await requestCurrency(
      fromOption.value,
      toOption.value
    );

    fromResult.textContent = `${input} ${fromOption.value}`;
    result.innerText = 'is';
    toResult.textContent = `${resultFormat(aquiredCurrency, input)} ${
      toOption.value
    }`;

    normalStyle(fromOption);
    normalStyle(toOption);
    normalStyle(valInput);
    // ===== Console Logs
    console.log(`From: ${fromOption.value}`);
    console.log(`To: ${toOption.value}`);
    console.log(`Input Value: ${input}`);
    console.log(
      `${input} ${fromOption.value} is ${resultFormat(
        aquiredCurrency,
        input
      )} ${toOption.value}`
    );
  }
});

// ===== Data Rounding =====
const resultFormat = (aqCurrency, inputVal) => {
  return round(aqCurrency * inputVal, 2);
};

// ===== API Call =====
const requestCurrency = async (from, to) => {
  try {
    const res = await axios.get(
      `https://v6.exchangerate-api.com/v6/b0bd94d1da01efa433b37b7b/pair/${from}/${to}`
    );
    return res.data.conversion_rate;
  } catch (e) {
    console.log(e);
  }
};

// ===== Reset Button =====
reset.addEventListener('click', function () {
  fromOption.value = 'NONE';
  toOption.value = 'NONE';
  valInput.value = '';
  fromResult.innerText = '';
  result.innerText = 'Results';
  toResult.innerText = '';
  normalStyle(fromOption);
  normalStyle(toOption);
  normalStyle(valInput);
});
