# 07 — Narrowing & Type Guards

## What Is It?

Narrowing is the process of refining a wide type (like `string | number | null`) into a narrower, specific type within a branch. TypeScript's control flow analysis tracks narrowing automatically — it watches your `if`, `switch`, and `while` statements and adjusts the type at each point.

Type guards are the tools you use to perform narrowing.

This is where TypeScript gets truly expressive: **making impossible states unrepresentable at compile time.**

---

## Built-in Narrowing

### `typeof`

```typescript
function stringify(x: string | number | boolean): string {
  if (typeof x === "string") return x;           // x: string
  if (typeof x === "number") return x.toFixed(2); // x: number
  return x ? "yes" : "no";                        // x: boolean
}
```

`typeof` works for: `"string"`, `"number"`, `"boolean"`, `"bigint"`, `"symbol"`, `"undefined"`, `"function"`, `"object"`.

Caveat: `typeof null === "object"` — always check for null explicitly.

### Truthiness / null checks

```typescript
function greet(name: string | null | undefined) {
  if (!name) {
    return "Hello, stranger!";  // name is null | undefined | ""
  }
  return `Hello, ${name}!`;     // name: string (and truthy)
}
```

### Equality narrowing

```typescript
function compare(x: string | number, y: string | boolean) {
  if (x === y) {
    // x and y must both be string here (the only overlapping type)
    console.log(x.toUpperCase());
  }
}
```

---

## `in` Narrowing

Check whether a property exists on an object to determine its type:

```typescript
type Fish  = { swim(): void };
type Bird  = { fly(): void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim();  // Fish
  } else {
    animal.fly();   // Bird
  }
}
```

---

## `instanceof` Narrowing

```typescript
function handleError(e: unknown): string {
  if (e instanceof Error) {
    return e.message;        // Error — has .message, .name, .stack
  }
  if (typeof e === "string") {
    return e;
  }
  return "Unknown error";
}
```

---

## Custom Type Guards (`x is T`)

When built-in narrowing isn't enough, write a **predicate function** that returns `x is T`:

```typescript
type Cat = { kind: "cat"; meow(): void };
type Dog = { kind: "dog"; bark(): void };

function isCat(animal: Cat | Dog): animal is Cat {
  return animal.kind === "cat";
}

function speak(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow();  // Cat — narrowed by the guard
  } else {
    animal.bark();  // Dog
  }
}
```

The `animal is Cat` return type tells TS: "if this function returns true, the argument is a `Cat`."

A very common real-world guard:

```typescript
function isNonNull<T>(x: T | null | undefined): x is T {
  return x !== null && x !== undefined;
}

const values = [1, null, 3, undefined, 5];
const numbers = values.filter(isNonNull);  // number[] — NULLs gone, type-safely
```

---

## Assertion Functions (`asserts x is T`)

Assertion functions throw if the condition isn't met, and narrow after the call:

```typescript
function assertIsString(x: unknown): asserts x is string {
  if (typeof x !== "string") {
    throw new TypeError(`Expected string, got ${typeof x}`);
  }
}

function process(input: unknown) {
  assertIsString(input);
  console.log(input.toUpperCase());  // input: string — narrowed
}
```

Use these for runtime validation at system boundaries (API input, config files).

---

## Discriminated Union + Narrowing (Full Pattern)

```typescript
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: Error };

function isOk<T>(r: Result<T>): r is { ok: true; value: T } {
  return r.ok === true;
}

function unwrap<T>(r: Result<T>): T {
  if (isOk(r)) {
    return r.value;  // safe
  }
  throw r.error;
}
```

---

## The "Impossible State" Pattern

If your type allows states that can't coexist, you have a bug waiting to happen. Use unions to make them impossible:

```typescript
// BAD — isLoading and error can both be true at the same time
type State = { isLoading: boolean; error: Error | null; data: string | null };

// GOOD — each state is mutually exclusive
type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; error: Error };
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Using `typeof x === "object"` without null check | `x !== null && typeof x === "object"` |
| Writing type guards that return `boolean` instead of `x is T` | Add the predicate signature so TS can narrow |
| Relying on truthiness for optional strings | `""` is falsy — use explicit `x !== undefined` if empty string is valid |
| Missing a `default: assertNever(x)` in discriminated union switches | Always add it — catches new union members at compile time |

---

## Practice Checklist (implement in `index.ts`)

- [ ] Write `parseInput(x: unknown): string | number | boolean` with `typeof` narrowing and a throw for other types
- [ ] Write a `isNonNull<T>` type guard and use it to filter nulls from an array
- [ ] Write a `hasProperty<T>(obj: T, key: string): key is keyof T` guard (Hint: look up `Object.hasOwn`)
- [ ] Write an `assertNonEmpty(arr: unknown[]): asserts arr is [unknown, ...unknown[]]` assertion function
- [ ] Refactor this bad state to a discriminated union, then write a `renderUI(state)` function that handles all cases:
      `{ loading: boolean; error: string | null; user: { name: string } | null }`
