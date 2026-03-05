if (true) {
  console.log("실행됨!");
}

if (10 < 3) {
  console.log("실행 안됨");
} else if (10 > 3) {
  console.log("실행됨!");
}

let isOdd;

const x = 7;

if (x % 2 === 0) {
  isOdd = true;
} else if (x % 2 === 1) {
  isOdd = false;
}

console.log(isOdd);

// 삼항 연산자로
const isOdd2 = x % 2 === 0 ? "짝수" : "홀수";
console.log(isOdd2);
