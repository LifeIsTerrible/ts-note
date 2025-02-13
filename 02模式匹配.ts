type GetReulstValue<T> = T extends Promise<infer Value> ? Value : never;

type Result = GetReulstValue<Promise<"stack">>;

// 推导数组
type PopArr<T extends unknown[]> = T extends []
  ? []
  : T extends [...infer Rest, unknown]
  ? Rest
  : never;

type PRes = PopArr<[1, 2, 3]>;
type PRes1 = PopArr<["a", "b"]>;

// 字符串
type StartWith<T extends string, P extends string> = T extends `${P}${string}`
  ? true
  : false;
type StartWithRes = StartWith<"lisa and jack", "jack">;

// 函数
type GetFnParams<Fn extends Function> = Fn extends (
  ...args: infer Args
) => unknown
  ? Args
  : never;
type GetFnParamsRes = GetFnParams<(name: string, age: number) => void>;

type GetFnReturnType<F extends Function> = F extends (
  ...args: unknown[]
) => infer R
  ? R
  : never;
type GetFnReturnTypeRes = GetFnReturnType<() => number>;

// 构造器
interface Person {
  name: string;
}

interface PersonInstance {
  new (name: string): Person;
}

type GetPersonInstanceType<PersonInstance extends new (...args: any) => any> =
  PersonInstance extends new (args: any) => infer P ? P : never;
type GetPersonInstanceTypeRes = GetPersonInstanceType<PersonInstance>;

type GetPropsRef<T> = "ref" extends keyof T
  ? T extends { ref?: infer V | undefined }
    ? V
    : never
  : never;
type GetPropsRefRes = GetPropsRef<{ ref: "hello"; name: "jack" }>;
