const obj = {
  key: "value",
  name: "홍길동",
  age: 18,
};

console.log(obj["key"]);
console.log(obj["name"]);
console.log(obj.name);
console.log(obj.height);

Object.keys(obj);
console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.entries(obj));

// for (const element of obj) {
//   console.log(element);
// }

for (const key in obj) {
  const element = obj[key];
  console.log(element);
}

Object.keys(obj).forEach((el) => console.log(el));
console.log();

Object.values(obj).forEach((el) => console.log(el));
console.log();

Object.entries(obj).forEach((el) => console.log(el));
console.log();

const person = {
  name: "철수",
  age: 18,
  greet: function () {
    console.log("안녕하세요");
  },
  hello() {
    console.log("hello");
  },
};

console.log(person.name);
person.greet();
person.hello();

console.log(typeof ["a", "b", "c"]);
