// 1. 递归复用 Promise类型
type PromiseValue<T extends Promise<unknown>> = T extends Promise<infer R>
  ? R extends Promise<unknown>
    ? PromiseValue<R>
    : R
  : never;
type PromiseValueRes = PromiseValue<Promise<Promise<string>>>;

// 数组

// reserver
type ReserverArr<Arr extends unknown[]> = Arr extends [infer F, ...infer R]
  ? [...ReserverArr<R>, F]
  : [];

type ReserverArrRes = ReserverArr<[1, 2, 3]>;

// includes
type isEquals<T, U> = [T] extends [U]
  ? [U] extends [T]
    ? true
    : false
  : false;

type Includes<T, U> = T extends [infer F, ...infer R]
  ? isEquals<F, U> extends true
    ? true
    : Includes<R, U>
  : false;

type IncludesRes = Includes<[1, 2, 3], 1>;
type IncludesRes2 = Includes<[1, 2, 3], 4>;

// 字符串

// string union
type StringToUnion<T extends string> = T extends `${infer F}${infer R}`
  ? F | StringToUnion<R>
  : never;

type StringToUnionRes = StringToUnion<"hello">;

// 对象

// 1. DeepReadonly
type DeepReadonly<T extends Record<string, any>> = {
  readonly [K in keyof T]: T[K] extends Record<string, any>
    ? T[K] extends Function
      ? T[K]
      : DeepReadonly<T[K]>
    : T[K];
};

const obj = {
  name: "xiaoming",
  age: 18,
  info: {
    address: "beijing",
    getAge() {
      return this.age;
    },
  },
};

type DeepReadonlyRes = DeepReadonly<typeof obj>;