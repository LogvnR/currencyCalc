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
function errorStyle(input1, input2, input3) {
  input1.style.border = '2px solid Red';
  input2.style.border = '2px solid Red';
  input3.style.border = '2px solid Red';
}

function normalStyle(input1, input2, input3) {
  input1.style.border = '1px solid Black';
  input2.style.border = '1px solid Black';
  input3.style.border = '1px solid Black';
}

// ===== Form Resets =====

function userInputReset(input1, input2, input3) {
  input1.value = 'NONE';
  input2.value = '';
  input3.value = 'NONE';
}

function resultsReset(input1, input2, input3) {
  input1.innerText = '';
  input2.innerText = 'Results';
  input3.innerText = '';
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
    errorStyle(fromOption, toOption, valInput);
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

    normalStyle(fromOption, toOption, valInput);
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
      `https://v6.exchangerate-api.com/v6/${logvn}/pair/${from}/${to}`
    );
    return res.data.conversion_rate;
  } catch (e) {
    console.log(e);
  }
};

// ===== Reset Button =====
reset.addEventListener('click', function () {
  userInputReset(fromOption, valInput, toOption);
  resultsReset(fromResult, result, toResult);
  normalStyle(fromOption, toOption, valInput);
});
