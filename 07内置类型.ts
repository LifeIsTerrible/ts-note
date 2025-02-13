type Func = (a: number, b: string) => boolean;

type ParamsRes = Parameters<Func>;
type ReturnRes = ReturnType<Func>;

type Person = {
  name: string;
  age: number;
};

function hello(this: Person) {
  console.log(this.name);
}

type GetHelloThis = ThisParameterType<typeof hello>;

class PersonClass {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// InstanceType 获取构造函数类型的实例类型
type GetClass = InstanceType<typeof PersonClass>;
// ConstructorParameters 获取构造函数类型的参数类型
type GetClassRes = ConstructorParameters<typeof PersonClass>;

type Teacher = {
  name: string;
  age?: number;
  teach(): void;
};

type PickAge = Pick<Teacher, "age">;
type PartialTeacher = Partial<Teacher>;
type RequiredTeacher = Required<PartialTeacher>;
type ReadonlyTeacher = Readonly<Teacher>;
type RecordTeacher = Record<"name" | "age", "jack">;
type OmitTeacher = Omit<Teacher, "age">;

type All = "name" | "age";
type ExcludeRes = Exclude<All, "name">;
type ExtractRes = Extract<All, "name">;

type NonNullableRes = NonNullable<null | undefined>;

type AwaitedRes = Awaited<Promise<Promise<string>>>;
