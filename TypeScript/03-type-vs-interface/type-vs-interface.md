# 03 — Type vs Interface

## What Is It?

Both `type` and `interface` let you name and reuse shapes in TypeScript. They overlap heavily — but each has a capability the other lacks, and knowing when to reach for which one saves you from confusion.

TS uses **structural typing**: two types are compatible if their shapes match, regardless of what they're named. This is different from Java/C# nominal typing.

```typescript
type Point = { x: number; y: number };
interface IPoint { x: number; y: number }

// These are structurally identical — TS treats them the same
const p: Point = { x: 1, y: 2 };
const p2: IPoint = p;  // OK
```

---

## `interface` — Open, Extendable Shapes

Interfaces can be **extended** (inheritance) and **merged** (declaration merging).

### Extending

```typescript
interface Animal {
  name: string;
  sound(): string;
}

interface Dog extends Animal {
  breed: string;
}

const rex: Dog = {
  name: "Rex",
  breed: "Labrador",
  sound: () => "Woof",
};
```

### Declaration Merging

Interfaces with the same name in the same scope **merge automatically**. Types cannot do this.

```typescript
interface Window {
  myCustomProp: string;
}

// Now `window.myCustomProp` is typed — useful for augmenting
// third-party library types or global browser objects
```

---

## `type` — Flexible, Composable Aliases

`type` can do things `interface` cannot:

### Unions

```typescript
type StringOrNumber = string | number;
type Status = "active" | "inactive" | "pending";  // string literal union
```

### Intersections (merging types)

```typescript
type WithTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};

type User = {
  id: number;
  name: string;
};

type UserWithTimestamps = User & WithTimestamps;
// same as: { id, name, createdAt, updatedAt }
```

### Computed / Mapped Types (advanced preview)

```typescript
type Flags<T> = {
  [K in keyof T]: boolean;
};
// Turns every property of T into a boolean
```

### Primitives, Tuples, Template Literals

```typescript
type UserId = string;
type Pair = [string, number];
type EventName = `on${string}`;  // matches "onClick", "onChange", etc.
```

---

## The Decision Rule

```
Public API shape (library, module boundary)?  → interface
  - consumers may extend it
  - you may need declaration merging

Everything else?                              → type
  - unions, intersections
  - utility type outputs
  - internal implementation details
  - "I just need to name this shape"
```

In a React codebase, a good default:
- Component props → `type` (they rarely need to be extended)
- Data models / contracts → `interface`

---

## Extending an Interface with a Type (and vice versa)

```typescript
interface Base {
  id: number;
}

type Extended = Base & { name: string };  // interface extended by type — OK

interface FullUser extends Extended {     // interface extends type — also OK
  email: string;
}
```

TS allows mixing — structural typing doesn't care how you built the shape.

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Using `interface` for unions | `type Status = "a" \| "b"` — interfaces can't do this |
| Using `type` when declaration merging is needed | Augmenting global types requires `interface` |
| Extending interfaces with `&` instead of `extends` | `extends` gives better error messages and is idiomatic for interfaces |
| Treating structural compatibility as nominal | Two unrelated types with the same shape ARE compatible in TS |

---

## Practice Checklist (implement in `index.ts`)

- [ ] Define a `Vehicle` interface with common fields, then `extends` it into `Car` and `Truck`
- [ ] Define a `Response<T>` type using a union: success case with data, error case with message
- [ ] Use intersection (`&`) to combine two types — e.g., `User & WithTimestamps`
- [ ] Augment the global `Window` interface to add a `appVersion: string` property
- [ ] Write the same "user profile" shape as both a `type` and an `interface` and observe what's different
