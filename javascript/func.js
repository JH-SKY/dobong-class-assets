console.log(add(1, 2));
// console.log(multiply(1, 2));
// console.log(substact(1, 2));

function add(a, b) {
  return a + b;
}

const multiply = function (a, b) {
  return a * b;
};

const substact = (a, b) => {
  return a - b;
};

console.log(add(1, 2));
console.log(multiply(1, 2));
console.log(substact(1, 2));

const func = (a) => a * 2;

console.log(func(3));

const func2 = (a, b, c) => {
  console.log(a);
  console.log(b);
};

func2();
func2(1, 2, 3, 4, 5, 6, 7);

// 기본값 가능.
const func3 = (a = 10, b = 20) => {
  return a + b;
};

const sum = (...numbers) => {
  console.log(numbers);
};

sum(1, 2, 3, 4, 5, 6);
