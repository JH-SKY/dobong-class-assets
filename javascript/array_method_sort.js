// sort

// // python
// lst = [
//     [1, 2],
//     [5, 1],
//     [3, 4],
//     [4, 0]
// ]
// lst.sort()

// lst.sort(key=lambda x : x[1])

// def func(x):
//     return x[1]
// lst.sort(key=func)

const numbers = [1, 5, 2, 7, 4, 3];

console.log(numbers.sort());

// numbers.sort((a, b) => {
//     return 양수 -> a가 뒤야.
//     return 음수 -> b가 뒤야.
// })

const sortedNumbers = numbers.sort((a, b) => {
  return a - b;
});
console.log(sortedNumbers);

const sortedNumbers2 = numbers.sort((a, b) => {
  return b - a;
});
console.log(sortedNumbers2);
