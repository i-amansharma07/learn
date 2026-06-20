# 05 — Union & Intersection

## What Is It?

**Union (`A | B`)** means a value can be *either* type A *or* type B.
**Intersection (`A & B`)** means a value must be *both* type A *and* type B simultaneously.

These two operators let you express complex shapes without inheritance.

---

## Union Types

```typescript
type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
  console.log(id);
}

printId(101);
printId("abc-42");
printId(true);  // ERROR
```

### String Literal Unions (the most common pattern)

```typescript
type Direction = "north" | "south" | "east" | "west";
type Size = "sm" | "md" | "lg" | "xl";
type Status = "idle" | "loading" | "success" | "error";
```

These are far better than enums for most cases — they're plain strings at runtime, readable in JSON, no import needed.

---

## Discriminated Unions

A discriminated union is a union where each member has a **common literal field** (the discriminant) that narrows which member you're in.

```typescript
type LoadingState = { status: "loading" };
type SuccessState = { status: "success"; data: string[] };
type ErrorState   = { status: "error"; message: string };

type FetchState = LoadingState | SuccessState | ErrorState;

function render(state: FetchState): string {
  switch (state.status) {
    case "loading": return "Loading...";
    case "success": return state.data.join(", ");  // data is available
    case "error":   return `Error: ${state.message}`;  // message is available
  }
}
```

This is the most powerful pattern in TypeScript. The discriminant (`status`) tells TS exactly which member you're in — and it gives you access to only that member's properties.

---

## Exhaustiveness Checking

Pair discriminated unions with a `never` check to ensure every case is handled:

```typescript
function assertNever(x: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
}

function render(state: FetchState): string {
  switch (state.status) {
    case "loading": return "Loading...";
    case "success": return state.data.join(", ");
    case "error":   return `Error: ${state.message}`;
    default:        return assertNever(state);  // ERROR if you add a new state and forget a case
  }
}
```

If you add a new member to `FetchState` and forget to handle it in the switch, TS will error at the `assertNever` call.

---

## Intersection Types

Merge multiple types into one. The resulting value must satisfy *all* of them:

```typescript
type WithId = { id: number };
type WithTimestamps = { createdAt: Date; updatedAt: Date };
type Named = { name: string };

type Entity = WithId & WithTimestamps & Named;
// Entity must have: id, createdAt, updatedAt, name

const user: Entity = {
  id: 1,
  name: "Aman",
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

Intersections are the compositional alternative to class inheritance.

---

## Narrowing with `typeof`

```typescript
function double(x: string | number): string | number {
  if (typeof x === "string") {
    return x.repeat(2);   // x is string here
  }
  return x * 2;           // x is number here
}
```

---

## Narrowing with `in`

```typescript
type Cat = { meow(): void };
type Dog = { bark(): void };

function speak(animal: Cat | Dog) {
  if ("meow" in animal) {
    animal.meow();  // Cat
  } else {
    animal.bark();  // Dog
  }
}
```

---

## Narrowing with `instanceof`

```typescript
function formatError(e: Error | string): string {
  if (e instanceof Error) {
    return e.message;  // Error — has .message, .stack
  }
  return e;            // string
}
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Union without a discriminant field | Add a `kind`, `type`, or `status` literal field to each member |
| Intersection of incompatible types | `string & number` → `never` (no value can be both) |
| Forgetting `assertNever` in switches | Add default: `assertNever(x)` to catch new cases at compile time |
| Accessing a field before narrowing | Always narrow with `typeof`, `in`, or `instanceof` first |

---

## Practice Checklist (implement in `index.ts`)

- [ ] Model a `Shape` discriminated union: `Circle`, `Square`, `Triangle` — each with a `kind` field and appropriate dimensions. Write an `area(shape: Shape)` function with exhaustiveness check.
- [ ] Write a `format(value: string | number | boolean): string` function using `typeof` narrowing
- [ ] Model a React-style `Action` union for a counter: `{ type: "increment" } | { type: "decrement" } | { type: "reset"; to: number }`. Write a `reducer(state: number, action: Action): number`.
- [ ] Use intersection to compose a `AdminUser = User & { permissions: string[] }` type
- [ ] Write `safeDivide(a: number, b: number): number | "division by zero"` and handle both cases at the call site
