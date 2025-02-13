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
