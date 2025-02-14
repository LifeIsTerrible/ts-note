// abcEfg => abc-efg

type CamelCaseToKebabCase<S extends string> =
  S extends `${infer First}${infer Rest}`
    ? `${First extends Lowercase<First>
        ? `${First}${CamelCaseToKebabCase<Rest>}`
        : `-${Lowercase<First>}${CamelCaseToKebabCase<Rest>}`}`
    : S;

type CamelCaseToKebabCaseRes = CamelCaseToKebabCase<"abcEfg">;

type Person = {
  name: string;
  age: number;
  address: string;
  phone: string;
};

type Copy<T> = {
  [K in keyof T]: T[K];
};

type PartialObjectPropByKeys<T, K extends keyof T> = Copy<
  Partial<Pick<T, Extract<keyof T, K>>> & Omit<T, K>
>;

type PartialObjectPropByKeysRes = PartialObjectPropByKeys<
  Person,
  "name" | "address"
>;

// infer extends 语法
type TestLast<Arr extends unknown[]> = Arr extends [
  ...infer Rest,
  infer Last extends string // extends string 限制了 Last 的类型
]
  ? `${Last}`
  : never;

enum Code {
  A = 1,
  B = 2,
  C = "c",
}

type EnumRes = `${Code}`;

type Str2Num<T> = T extends `${infer N extends number}` ? N : T;
type EnumRes2 = Str2Num<EnumRes>;

// 函数重载的三种方式

// 1. 通过函数名的重载
function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a: any, b: any) {
  return a + b;
}

const res = add(1, 2);
const res2 = add("1", "2");

interface Func {
  (a: number, b: number): number;
  (a: string, b: string): string;
}

const add2: Func = (a: any, b: any) => {
  return a + b;
};

const res3 = add2(1, 2);
const res4 = add2("1", "2");

type Func2 = ((a: number, b: number) => number) &
  ((a: string, b: string) => string);

const add3: Func2 = (a: any, b: any) => {
  return a + b;
};

const res5 = add3(1, 2);
const res6 = add3("1", "2");

// Join
declare function Join<Separator extends string>(
  s: Separator
): <Items extends string[]>(...args: Items) => JoinType<Items, Separator>;

type JoinType<
  Items extends string[],
  Separator extends string,
  Result extends string = ""
> = Items extends [infer First extends string, ...infer Rest extends string[]]
  ? JoinType<Rest, Separator, `${Result}${Separator}${First}`>
  : DeleteFirstChar<Result>;

type DeleteFirstChar<S extends string> = S extends `${infer _}${infer Rest}`
  ? Rest
  : S;

const join = Join("-")("a", "b", "c");

// Defaultize
type One = {
  aaa: 111;
  bbb: 222;
};

type Two = {
  bbb: 222;
  ccc: 333;
};

type Defaultize<
  T extends Record<string, any>,
  D extends Record<string, any>
> = Pick<T, Exclude<keyof T, keyof D>> &
  Partial<Pick<T, Extract<keyof T, keyof D>>> &
  Partial<Pick<D, Exclude<keyof D, keyof T>>>;

type DefaultizeRes = Copy<Defaultize<One, Two>>;
