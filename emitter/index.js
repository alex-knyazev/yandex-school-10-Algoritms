const AMOUNT_HANDLERS = 1000000;
const EVENT_NAMES = [
  'buy', 
  'sell', 
  'rent', 
  'donate', 
  'destroy',
  'steal',
];

const emitter = {
  events: {},

  on: (event, handler) => {
    if (emitter.events[event]) {
      emitter.events[event].add(handler);
    } else {
      emitter.events[event] = new Set();
      emitter.events[event].add(handler);
    } 
  },

  off: (event, handler) => {
    emitter.events[event].delete(handler);
  },

  emit: (event) => {
    emitter.events[event].forEach((value, handler) => {
      handler();
    });
  },
};

const handlers = [];
for (let i = 0; i < AMOUNT_HANDLERS; i++) {
  handlers.push(() => i ** 2);
}

// регистрируем обработчики на события
const registerResults = [];
for (let i = 0; i < handlers.length; i++) {
  for (let j = 0; j < EVENT_NAMES.length; j++) {
    const t0 = performance.now();
    emitter.on(EVENT_NAMES[j], handlers[i]);
    const t1 = performance.now();
    registerResults.push(t1 - t0);
  }
}
const averageRegisterTime = findAverage(registerResults);
logTime(averageRegisterTime, 'average time of handler registration');


// вызываем события
const executeResults = [];
for (let i = 0; i < EVENT_NAMES.length; i++) {
  const t0 = performance.now();
  emitter.emit(EVENT_NAMES[i]);
  const t1 = performance.now();
  executeResults.push(t1 - t0);
}
const averageExecutingTime = findAverage(executeResults);
logTime(averageExecutingTime, 'average time of event execution');


// отписываемся от событий
const unregisterResults = [];
for (let i = 0; i < handlers.length; i++) {
  for (let j = 0; j < EVENT_NAMES.length; j++) {
    const t0 = performance.now();
    emitter.off(EVENT_NAMES[j], handlers[i]);
    const t1 = performance.now();
    unregisterResults.push(t1 - t0);
  }
}
const averageUnregisterTime = findAverage(unregisterResults);
logTime(averageUnregisterTime, 'average time of event unregistration');

function logTime(time, text) {
  const timeByFormat = time.toFixed(3);
  console.log(`${timeByFormat} ms - ${text}`);
}

function findAverage(array) {
  return array.reduce((prev, curr) => prev + curr) / array.length;
}

