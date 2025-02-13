// 数组
let arr: number[] = [1, 2, 3];

type Push<T extends unknown[], E> = [...T, E];

type PushRes = Push<[1, 2, 3], "a">;
const push: PushRes = [1, 2, 3, "a"];

// 字符串
type Capital<S extends string> = S extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : S;

type CapitalRes = Capital<"hello">;

// 函数
type AddParamsType<F extends Function, P> = F extends (
  ...args: infer A
) => infer R
  ? (...args: [...A, P]) => R
  : never;

type AddParamsTypeRes = AddParamsType<(a: number) => number, string>;

// 索引类型

// 1. Key 大写
type UppercaseKeys<T> = {
  [K in keyof T as Uppercase<K & string>]: T[K];
};

type UppercaseKeysRes = UppercaseKeys<{ name: string; age: number }>;

// 2. ToReadonly
type ToReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
type ToReadonlyRes = ToReadonly<{ name: string; age: number }>;

// 3. ToMutable
type ToMutable<T> = {
  -readonly [K in keyof T]: T[K];
};
type ToMutableRes = ToMutable<{ readonly name: string; age: number }>;

// 4. ToPartial
type ToPartial<T> = {
  [K in keyof T]?: T[K];
};
type ToPartialRes = ToPartial<{ name: string; age: number }>;

// 5. FilterByValueType
type FilterByValueType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};
type FilterByValueTypeRes = FilterByValueType<
  { name: string; age: number },
  number
>;
