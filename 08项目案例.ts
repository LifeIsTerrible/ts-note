type ParseQueryString<S extends string> =
  S extends `${infer Key}=${infer Value}&${infer Rest}`
    ? { [k in Key]: Value } & ParseQueryString<Rest>
    : S extends `${infer Key}=${infer Value}`
    ? { [k in Key]: Value }
    : {};

function parseQueryString<S extends string>(queryStr: S): ParseQueryString<S>;
function parseQueryString(queryStr: string) {
  if (!queryStr || !queryStr.length) {
    return {};
  }
  const queryObj: Record<string, any> = {};
  const items = queryStr.split("&");
  items.forEach((item) => {
    const [key, value] = item.split("=");
    if (queryObj[key]) {
      if (Array.isArray(queryObj[key])) {
        queryObj[key].push(value);
      } else {
        queryObj[key] = [queryObj[key], value];
      }
    } else {
      queryObj[key] = value;
    }
  });
  return queryObj;
}

const res = parseQueryString("a=1&b=2&c=3");

type PromiseInstance = {
  all<T extends unknown[] | []>(
    values: T
  ): Promise<{
    [K in keyof T]: Awaited<T[K]>;
  }>;
};

const promiseInstance: PromiseInstance = {
  all(values) {
    return Promise.all(values);
  },
};

promiseInstance.all([Promise.resolve(1), Promise.resolve("2")]).then((res) => {
  console.log(res);
});

// Currying function Type
type CurriedFunc<Params, Return> = Params extends [infer Arg, ...infer Rest]
  ? (arg: Arg) => CurriedFunc<Rest, Return>
  : never;

type CurryingFunc<Func> = Func extends (...args: infer Params) => infer Return
  ? CurriedFunc<Params, Return>
  : never;

type Func = (...args: any[]) => any;

function currying<Func>(fn: Func): CurryingFunc<Func>;

function currying(fn: Func) {
  return function curried(...args: unknown[]) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2: unknown[]) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

const func = (a: string, b: number, c: boolean) => {};
const curryingRes = currying(func);
