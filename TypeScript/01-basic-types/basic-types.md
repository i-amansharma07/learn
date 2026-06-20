# 01 — Basic Types

## What Is It?

TypeScript adds a type layer on top of JavaScript. Every value has a type — either inferred by TS automatically, or explicitly annotated by you. The compiler uses these types to catch mistakes before your code runs.

Think of it as writing contracts: "this variable will always be a number, this function will always return a string." TS enforces those contracts at compile time.

---

## Primitive Types

```typescript
let username: string = "aman";
let age: number = 25;
let isLoggedIn: boolean = true;
let nothing: null = null;
let notAssigned: undefined = undefined;
```

In practice, you rarely annotate primitives — TS **infers** them:

```typescript
let username = "aman";       // inferred as string
let age = 25;                // inferred as number
```

Annotate only when inference is wrong or ambiguous.

---

## `any` vs `unknown`

`any` is an escape hatch — it disables all type checking. Avoid it.

```typescript
let x: any = "hello";
x.toUpperCase();    // fine
x.foo.bar.baz();   // also "fine" — TS won't catch this runtime crash
```

`unknown` is the safe version. TS forces you to check the type before using it:

```typescript
let x: unknown = fetchSomething();
x.toUpperCase();   // ERROR — must narrow first

if (typeof x === "string") {
  x.toUpperCase(); // OK — we've narrowed
}
```

**Rule:** use `unknown` for values from external sources (API responses, JSON.parse). Use `any` only as a last resort, and only temporarily.

---

## `never`

`never` is the type of things that can never happen. Used in:
- Functions that always throw: `function fail(msg: string): never { throw new Error(msg); }`
- Exhaustive checks in switch statements (see module 05)

---

## Arrays

```typescript
let names: string[] = ["aman", "priya"];
let scores: Array<number> = [100, 95, 87];  // alternative syntax
```

---

## Tuples

Fixed-length arrays where each position has a known type:

```typescript
let point: [number, number] = [10, 20];
let entry: [string, number] = ["age", 25];

// Labelled tuples (TS 4+) — great for readability
let rgb: [red: number, green: number, blue: number] = [255, 128, 0];
```

Use tuples when the position of each element is meaningful and fixed.

---

## Enums

Enums give names to a set of related constants.

```typescript
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}

let move: Direction = Direction.Up;
```

**Prefer `const enum`** when you don't need reverse mapping — it compiles away to plain numbers, no runtime overhead:

```typescript
const enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING",
}

let userStatus: Status = Status.Active;  // compiles to "ACTIVE"
```

**Gotcha:** In most modern TS codebases (especially with bundlers), `const enum` with string values is preferred over numeric enums because the values are readable at runtime.

---

## Type Aliases for Primitives

```typescript
type UserId = string;
type Age = number;

function getUser(id: UserId): void { /* ... */ }
```

Useful for documentation, but TS treats `UserId` as structurally identical to `string`.

---

## Common Mistakes

| Mistake | Why it's wrong | Fix |
|---|---|---|
| `let x: any = ...` | Disables all type checking | Use `unknown`, then narrow |
| `let x: Array<any>` | Same problem | `unknown[]` or a proper type |
| Using numeric enums and relying on their values | `Direction.Up === 0` is brittle | Use string enums |
| Over-annotating inferred types | Noise, not signal | Let TS infer when it's obvious |

---

## Practice Checklist (implement in `index.ts`)

- [ ] Declare variables of each primitive type with explicit annotations
- [ ] Write a function that accepts `unknown` and narrows it before use
- [ ] Create a tuple for a user record `[id: number, name: string, isAdmin: boolean]`
- [ ] Define a `const enum` for HTTP methods (GET, POST, PUT, DELETE)
- [ ] Create a `never`-returning function and explain when you'd use it
