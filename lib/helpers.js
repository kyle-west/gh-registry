// use a function generator to map an iterator over the array items
const iterationScheduler = (arr) => (function* () { yield* arr; })()

module.exports = {
  iterationScheduler
}