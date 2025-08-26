const input = document.getElementById('inputValue');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const result = document.getElementById('result');
const unitBadge = document.getElementById('unitBadge');
const convertBtn = document.getElementById('convertBtn');
const errorMsg = document.getElementById('errorMsg');
const swapBtn = document.getElementById('swapBtn');

function showError(msg) {
  errorMsg.style.display = 'block';
  errorMsg.textContent = msg;
}
function clearError() {
  errorMsg.style.display = 'none';
  errorMsg.textContent = '';
}
function round(v) {
  return Math.round(v * 100) / 100;
}

function toKelvin(value, unit) {
  if (unit === 'C') return value + 273.15;
  if (unit === 'F') return (value - 32) * 5/9 + 273.15;
  return value;
}
function fromKelvin(kelvin, unit) {
  if (unit === 'C') return kelvin - 273.15;
  if (unit === 'F') return (kelvin - 273.15) * 9/5 + 32;
  return kelvin;
}

function unitLabel(u) {
  if (u === 'C') return '°C';
  if (u === 'F') return '°F';
  return 'K';
}

function convert() {
  clearError();
  const raw = input.value.trim();
  if (raw === '') { showError('Please enter a temperature value.'); return; }
  const parsed = Number(raw);
  if (!isFinite(parsed)) { showError('Please enter a valid number.'); return; }

  if (fromUnit.value === toUnit.value) {
    result.textContent = round(parsed);
    unitBadge.textContent = unitLabel(toUnit.value);
    return;
  }

  const kelvin = toKelvin(parsed, fromUnit.value);
  const converted = fromKelvin(kelvin, toUnit.value);

  result.textContent = round(converted);
  unitBadge.textContent = unitLabel(toUnit.value);
}

convertBtn.addEventListener('click', convert);
input.addEventListener('keydown', e => { if (e.key === 'Enter') convert(); });
swapBtn.addEventListener('click', () => {
  const temp = fromUnit.value;
  fromUnit.value = toUnit.value;
  toUnit.value = temp;
  convert();
});
unitBadge.textContent = unitLabel(toUnit.value);
input.addEventListener('input', () => { if (errorMsg.style.display === 'block') clearError(); });
