let { allStreets } = window;
allStreets = JSON.parse(allStreets);

function prepareSubstrings(strings) {
  const substringsStore = {};
  for (let n = 0; n < strings.length; n++) {
    const string = strings[n];
    for (let i = 0; i < string.length; i++) {
      for (let j = i + 1; j <= string.length; j++) {
        const substring = string.substring(i, j).toLowerCase();
        if (substringsStore[substring]) {
          substringsStore[substring].push(string);
        } else {
          substringsStore[substring] = [string];
        }
      }
    }
  }
  return substringsStore;
}

const t0 = performance.now();
const substrings = prepareSubstrings(allStreets);
const t1 = performance.now();
console.log('time of preparing', t1 - t0, ' milliseconds.');

console.log(Object.keys(substrings).length);
const input = document.getElementById('streets-input');
const status = document.getElementById('status');
const results = document.getElementById('results');

input.addEventListener('input', (e) => {
  if (!e.target.value) {
    status.innerHTML = 'введите текст для поиска';
    results.innerHTML = '';
    return;
  }
  const t2 = performance.now();
  let streets = substrings[e.target.value.toLowerCase()];
  const t3 = performance.now();
  console.log('time of searching', t3 - t2, ' milliseconds.');
  if (streets && streets.length > 10) {
    streets = streets.slice(0, 10);
  }
  if (streets && streets.length) {
    results.innerHTML = '';
    for (let i = 0; i < streets.length; i++) {
      const newLi = document.createElement('li');
      newLi.innerHTML = streets[i];
      results.appendChild(newLi);
    }
  } else {
    status.innerHTML = 'нет результатов';
    results.innerHTML = '';
  }
});
