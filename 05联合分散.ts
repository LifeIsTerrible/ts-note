// 条件类型的分发特性
type Union = "a" | "b" | "c";

type UpperUnion<I extends string> = I extends "a" ? Uppercase<I> : I;
type UpperUnionRes = UpperUnion<Union>;

type Camelcase<Str extends string> =
  Str extends `${infer F}_${infer U}${infer R}`
    ? `${Lowercase<F>}${Uppercase<U>}${Camelcase<R>}`
    : Str;

type CamelcaseRes = Camelcase<"hello_world">;

type CamelcaseArr<Arr extends unknown[]> = Arr extends [infer F, ...infer R]
  ? [Camelcase<F & string>, ...CamelcaseArr<R>]
  : [];

type CamelcaseArrRes = CamelcaseArr<["hello_world", "jack_rose"]>;

// 数组的联合类型
// type UnionArr = ["a", "b", "c"][number];
type BEM<
  T extends string,
  U extends string[],
  R extends string[]
> = `${T}__${U[number]}--${R[number]}`;

type BEMRes = BEM<"button", ["primary", "secondary"], ["hover", "active"]>;
