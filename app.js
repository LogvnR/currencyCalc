const logvn = 'b0bd94d1da01efa433b37b7b';
const mainForm = document.querySelector('.mainForm');
const fromOption = document.querySelector('#fromOptions');
const toOption = document.querySelector('#toOptions');
const result = document.querySelector('.resultsText');
const fromResult = document.querySelector('.fromResultsText');
const toResult = document.querySelector('.toResultsText');
const valInput = document.querySelector('#fromInput');
const reset = document.querySelector('.reset');

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

mainForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const input = valInput.value;
  if (
    fromOption.value === 'NONE' ||
    input === '' ||
    toOption.value === 'NONE'
  ) {
    result.innerText = 'Please Fill Out Options';
    fromOption.style.border = '2px solid Red';
    toOption.style.border = '2px solid Red';
    valInput.style.border = '2px solid Red';
  } else {
    const aquiredCurrency = await requestCurrency(
      fromOption.value,
      toOption.value
    );
    // const fromTxt
    // const toTxt =
    fromResult.textContent = `${input} ${fromOption.value}`;
    result.innerText = 'is';
    toResult.textContent = `${resultFormat(aquiredCurrency, input)} ${
      toOption.value
    }`;

    fromOption.style.border = '1px solid Black';
    toOption.style.border = '1px solid Black';
    valInput.style.border = '1px solid Black';
    // ===== Console Logs
    console.log(fromOption.value);
    console.log(toOption.value);
    console.log(input);
    console.log(
      `${input} ${fromOption.value} is ${resultFormat(
        aquiredCurrency,
        input
      )} ${toOption.value}`
    );
  }
});

const resultFormat = (aqCurrency, inputVal) => {
  return round(aqCurrency * inputVal, 2);
};

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

reset.addEventListener('click', function () {
  fromOption.value = 'NONE';
  toOption.value = 'NONE';
  valInput.value = '';
  fromResult.innerText = '';
  result.innerText = 'Results';
  toResult.innerText = '';
  fromOption.style.border = '1px solid Black';
  toOption.style.border = '1px solid Black';
  valInput.style.border = '1px solid Black';
});
