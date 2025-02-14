// 判断A 是否为 B的子类型： A 包含B所有的属性，并且更加具体

// 例子：

type Person = {
  name: string;
  age: number;
};

type Student = {
  name: string;
  age: number;
  hobby: string;
};

// Student 就是 Person 的子类型

// 协变：子类型可以赋值为父类型

let person: Person = {
  name: "lisa",
  age: 12,
};

let student: Student = {
  name: "jack",
  age: 15,
  hobby: "coding",
};

person = student; // 协变
// student = person;

// 逆变：父类型可以赋值为子类型
let logPerson: (p: Person) => void;

logPerson = (p: Person) => {
  console.log("p", p);
};

let logStudent: (s: Student) => void;

logStudent = (s: Student) => {
  console.log("s", s);
};

logStudent = logPerson // 函数参数逆变
// logPerson = logStudent // 函数参数就只支持逆变，子类型赋值给父类型就会报错：