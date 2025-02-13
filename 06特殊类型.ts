// IsAny
type IsAny<T> = 0 extends 1 & T ? true : false;

type IsAnyRes = IsAny<any>;
type IsAnyRes2 = IsAny<number>;

// isEquals
type IsEquals<T, U> = [T] extends [U]
  ? [U] extends [T]
    ? true
    : false
  : false;

type IsEqualsRes = IsEquals<number, number>;
type IsEqualsRes2 = IsEquals<number, string>;

// IsNotEquals
type IsNotEquals<T, U> = [T] extends [U]
  ? [U] extends [T]
    ? false
    : true
  : true;

type IsNotEqualsRes = IsNotEquals<number, number>;
type IsNotEqualsRes2 = IsNotEquals<number, string>;

// IsUnion 是否是联合类型
type IsUnion<T, U = T> = T extends T ? ([U] extends [T] ? false : true) : false;
type IsUnionRes = IsUnion<number | string>;
type IsUnionRes2 = IsUnion<number>;

// IsTuple 是否是元组，元组的length是数字字面量，而数组的length是number类型
type IsTuple<T> = T extends unknown[]
  ? IsNotEquals<T["length"], number>
  : false;

type IsTupleRes = IsTuple<[1, 2, 3]>;
type IsTupleRes2 = IsTuple<string[]>;

// GetOptions 获取索引类型中的可选的key
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type GetOptions<T> = {
  [K in keyof T as {} extends MyPick<T, K> ? K : never]: T[K];
};

type GetOptionsRes = GetOptions<{ name: string; age?: number }>;

// GetRequired 获取索引类型中的必选的key
type GetRequired<T> = {
  [K in keyof T as {} extends MyPick<T, K> ? never : K]: T[K];
};
type GetRequiredRes = GetRequired<{ name: string; age?: number }>;

// RemoveIndexSignature 移除索引签名
type Dong = {
  [key: string]: any;
  sleep(): void;
};
type RemoveIndexSignature<T> = {
  [K in keyof T as K extends `${infer S}` ? S : never]: T[K];
};
type RemoveIndexSignatureRes = RemoveIndexSignature<Dong>;

// as const 保留字面量类型，转为readonly

const arr1 = [1, 2, 3] as const;

const obj1 = { name: "jack", age: 18 } as const;

// 添加readonly才能保留字面量类型
type ReserverArr<Arr> = Arr extends readonly [infer F, ...infer R]
  ? [...ReserverArr<R>, F]
  : [];

type ReserverArrRes = ReserverArr<typeof arr1>;

// UnionToIntersection 联合类型转交叉类型
// type Func = (x: number) => unknown | ((x: string) => unknown);
// type FuncParams = Func extends (x: infer P) => unknown ? P : never;

type UnionToIntersection<T> = (
  T extends any ? (x: T) => unknown : never
) extends (x: infer U) => unknown
  ? U
  : never;

type UnionToIntersectionRes = UnionToIntersection<number | string>;
