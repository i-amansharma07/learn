# 02 — Functions & Objects

## What Is It?

Functions and objects are the workhorses of any JS/TS codebase. TS lets you annotate their shapes precisely — catching incorrect calls, missing fields, and bad return types at compile time instead of runtime.

---

## Function Signatures

```typescript
// Named function
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Return type is usually inferred — annotate when it helps clarity or
// when the function has multiple return paths
function greet(name: string) {  // inferred return: string
  return `Hello, ${name}`;
}
```

---

## Optional & Default Parameters

```typescript
// Optional with ?  — caller may omit it, value is T | undefined inside
function createUser(name: string, role?: string) {
  return { name, role: role ?? "member" };
}

// Default parameter — caller may omit it, gets the default
function createUser2(name: string, role: string = "member") {
  return { name, role };
}
```

**Difference:** `role?: string` means the type inside the function body is `string | undefined`. A default parameter (`role = "member"`) means the type inside is just `string` — TS knows it will never be undefined.

---

## Rest Parameters

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3, 4);  // 10
```

---

## `void` vs `undefined`

```typescript
// void: the caller should not use the return value
function logMessage(msg: string): void {
  console.log(msg);
  // no return needed
}

// undefined: explicitly returns undefined
function doNothing(): undefined {
  return undefined;
}
```

Use `void` for callbacks and side-effect functions. Use `undefined` only when you explicitly return `undefined` and the caller needs to know.

---

## Object Literal Types

```typescript
// Inline
function displayUser(user: { name: string; age: number; email?: string }) {
  console.log(user.name, user.age);
}

// Named type alias (preferred for reuse)
type User = {
  id: number;
  name: string;
  email: string;
  age?: number;         // optional
};

const user: User = { id: 1, name: "Aman", email: "a@example.com" };
```

---

## Readonly Properties

```typescript
type Config = {
  readonly apiUrl: string;
  readonly timeout: number;
};

const config: Config = { apiUrl: "https://api.example.com", timeout: 5000 };
config.apiUrl = "https://other.com";  // ERROR — cannot assign to readonly
```

Use `readonly` for values that should never change after creation (config, constants, frozen state).

---

## Index Signatures

For objects where you know the key and value types but not the exact keys:

```typescript
type ScoreMap = {
  [userId: string]: number;
};

const scores: ScoreMap = {
  user_1: 95,
  user_2: 87,
};

// Accessing gives number | undefined in strict mode
const score = scores["user_1"];  // number
```

---

## Function Types

Functions are first-class values — you can type them too:

```typescript
type Transformer = (input: string) => string;

const toUpperCase: Transformer = (s) => s.toUpperCase();
const trim: Transformer = (s) => s.trim();

function applyAll(value: string, fns: Transformer[]): string {
  return fns.reduce((acc, fn) => fn(acc), value);
}

applyAll("  hello world  ", [trim, toUpperCase]);  // "HELLO WORLD"
```

---

## Common Mistakes

| Mistake                                           | Fix                                                  |
| ------------------------------------------------- | ---------------------------------------------------- |
| Marking every param optional to be "safe"         | Only mark optional when absence has valid meaning    |
| Using `any` for callback params                 | Type the callback signature explicitly               |
| Forgetting `strictNullChecks` — optional props | Check for `undefined` before using optional fields |
| Inline object types on every function             | Pull repeated shapes into a named `type`           |

---

## Practice Checklist (implement in `index.ts`)

- [X] Write a `formatName(first, last, title?)` function with an optional title param
- [X] Create a `User` type with at least one optional and one readonly field
- [ ] Write a `pick` function that takes an object and an array of keys and returns the sub-object (don't worry about types being perfect yet — generics in module 04 make this elegant)
- [ ] Write a function that accepts a callback typed as `(err: Error | null, data: string) => void`
- [ ] Create an index-signature type for a "word frequency" map `{ [word: string]: number }` and write a function that fills it from a string array
