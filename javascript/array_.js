const array = ["a", "b", "c"];

console.log(array[0]);
console.log(array[-1]);
console.log(array[10]);

array[0] = "d";

console.log(array);

for (let index = 0; index < array.length; index++) {
  const element = array[index];
  console.log(element);
}

console.log();

for (const element of array) {
  console.log(element);
}

console.log();

array.forEach((el, index, array) => {
  console.log(el, index, array);
  console.log(`${index}번째 값 : ${el}`);
});
