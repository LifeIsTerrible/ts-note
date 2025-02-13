const a: number = 1;

// 元组
type Tuple = [number, string];
const tuple: Tuple = [1, "1"];

// 枚举
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}

const color: Color = Color.Red;
console.log("color", color);

// 接口
interface Person {
  readonly name: string;
  age?: number;
}

interface Fn {
  (name: string): void;
}

const fn: Fn = (name) => {
  console.log("name", name);
};
fn("Dell");

// 索引签名
interface PersonMap {
  [prop: string]: Person;
  [prop: symbol]: string;
}

const person: Person = {
  name: "jack",
  age: 1,
};

// extends ?  类型的if else
type IsTwo<T> = T extends 2 ? true : false;
type TwoType = IsTwo<2>;
type ThreeType = IsTwo<3>;

// infer 推断类型
type First<T extends unknown[]> = T extends [infer U, ...any[]] ? U : never;
type FirstType = First<[1, 2, 3]>;

// keyof 获取对象的键 
// as 类型转换
type ObjPerson<T> = {
  // [K in keyof T]: T[K];
  // [K in keyof T]: [K, T[K]];
  // 映射类型
  [K in keyof T as `${K & string}${K & string}`]: [K, T[K]];
};

type PersonType = ObjPerson<Person>;
const personType: PersonType = {
  namename: ["name", "lisa"],
};

// never、unknown、void、any
// never 永远不会返回值 通常用于抛出异常
// unknown 未知类型 通常用于函数参数
// void 无返回值 通常用于函数返回值
// any 任意类型 通常用于兼容老代码

// never
function throwError(): never {
  throw new Error("error");
}

// unknown void
function fnUnknown(value: unknown): void {
  if (typeof value === "string") {
    console.log("value", value);
  }
}
fnUnknown("1");