const rates = {};

function setEchangeRate(rate, sourceCurrency, targetCurrency) {
  if (rates[sourceCurrency] === undefined) {
    rates[sourceCurrency] = {};
  }

  if (rates[targetCurrency] === undefined) {
    rates[targetCurrency] = {};
  }

  rates[sourceCurrency][targetCurrency] = rate;
  rates[targetCurrency][sourceCurrency] = 1 / rate;
}

function getExchangerate(sourceCurrency, targetCurrency) {
  return rates[sourceCurrency][targetCurrency];
}

function convertToCurrency(value, sourceCurrency, targetCurrency) {
  const exchangeRate = getExchangerate(sourceCurrency, targetCurrency);
  return value * exchangeRate;
}

function formatValueForDisplay(value) {
  return value.toFixed(2);
}

function printForeignValues(value, sourceCurrency) {
  console.log(`The value of ${value} ${sourceCurrency} is:`);

  for (const targetCurrency in rates[sourceCurrency]) {
    const convertedValue = convertToCurrency(value, sourceCurrency, targetCurrency);
    const displayValue = formatValueForDisplay(convertedValue);
    console.log(`- ${convertedValue} ${targetCurrency}`);
  }
}

setEchangeRate(0.88, 'USD', 'EUR');
setEchangeRate(107.4, 'USD', 'JPY');
printForeignValues(10, 'EUR');
