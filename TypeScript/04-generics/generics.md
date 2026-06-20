# 04 — Generics

## What Is It?

Generics let you write functions, types, and classes that work over *many* types while still being type-safe. Instead of writing `identity(x: string): string` and `identity(x: number): number`, you write one function that adapts to whatever type is passed in.

Think of `<T>` as a type variable — a placeholder that gets filled in at the call site.

```typescript
function identity<T>(x: T): T {
  return x;
}

identity("hello");  // T = string, returns string
identity(42);       // T = number, returns number
identity(true);     // T = boolean, returns boolean
```

Without generics, you'd use `any` — and lose all type information on the return value.

---

## Generic Functions

```typescript
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const name = first(["aman", "priya"]);  // name: string | undefined
const score = first([95, 87, 100]);     // score: number | undefined
```

TS infers `T` from the argument — you rarely need to specify it explicitly.

When to specify explicitly:

```typescript
// TS can't infer T when there's no argument to derive it from
function createArray<T>(length: number, fill: T): T[] {
  return Array(length).fill(fill);
}

createArray(3, 0);       // T inferred as number → [0, 0, 0]
createArray<string>(3, "x"); // explicit → ["x", "x", "x"]
```

---

## Generic Constraints (`extends`)

Constrain `T` to only types that have certain properties:

```typescript
function getLength<T extends { length: number }>(x: T): number {
  return x.length;
}

getLength("hello");     // 5
getLength([1, 2, 3]);   // 3
getLength(42);          // ERROR — number has no .length
```

```typescript
// Ensure K is actually a key of T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Aman", email: "a@b.com" };
getProperty(user, "name");   // string
getProperty(user, "id");     // number
getProperty(user, "foo");    // ERROR — "foo" not in keyof user
```

---

## `keyof` and `typeof`

```typescript
// keyof T — the union of all keys of T
type UserKeys = keyof { id: number; name: string };  // "id" | "name"

// typeof x — get the type of a value
const config = { debug: true, port: 3000 };
type Config = typeof config;  // { debug: boolean; port: number }
```

Combining them is powerful:

```typescript
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
}

pick(user, ["id", "name"]);  // { id: number; name: string } — fully typed!
```

---

## Generic Interfaces and Types

```typescript
interface Repository<T> {
  findById(id: number): T | undefined;
  save(item: T): T;
  delete(id: number): void;
}

type Pair<A, B> = { first: A; second: B };

const pair: Pair<string, number> = { first: "age", second: 25 };
```

---

## Default Type Parameters

```typescript
type Container<T = string> = { value: T };

const s: Container = { value: "hello" };        // T defaults to string
const n: Container<number> = { value: 42 };     // T = number
```

---

## A Typed useState-style Hook (React analogy)

```typescript
function useState<S>(initialState: S): [S, (newState: S) => void] {
  let state = initialState;
  const setState = (newState: S) => { state = newState; };
  return [state, setState];
}

const [count, setCount] = useState(0);        // S = number
const [name, setName] = useState("Aman");     // S = string
setCount("five");                             // ERROR — must be number
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Using `any` instead of a type parameter | Generic `<T>` preserves type info; `any` throws it away |
| Forgetting to constrain `T` when you use `.length` or other props | Add `T extends { length: number }` |
| Over-constraining: `T extends string \| number` everywhere | Usually `T` is enough; constrain only when you access T's properties |
| Writing `<T>` on arrow functions in `.tsx` files (JSX parse conflict) | Write `<T,>` or `<T extends unknown>` as a workaround |

---

## Practice Checklist (implement in `index.ts`)

- [ ] Write a generic `last<T>(arr: T[]): T | undefined` function
- [ ] Write a generic `merge<A, B>(a: A, b: B): A & B` function
- [ ] Write a `getProperty<T, K extends keyof T>` function (from above)
- [ ] Write a `Repository<T>` interface and implement it as an in-memory store with a `Map`
- [ ] Write a generic `zip<A, B>(a: A[], b: B[]): [A, B][]` that pairs arrays element-by-element
