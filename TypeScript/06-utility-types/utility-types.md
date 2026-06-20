# 06 — Utility Types

## What Is It?

TypeScript ships with a set of built-in generic types that transform other types. Instead of manually rewriting similar types, you compose them from an existing type using these utilities.

They're all implemented with mapped types and conditional types under the hood — but you use them as simple generics.

---

## The Base Type We'll Use

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  role: "admin" | "user" | "guest";
}
```

---

## `Partial<T>` — Make all fields optional

```typescript
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; ... }

function updateUser(id: number, updates: Partial<User>): User {
  // merge updates into existing user
  return { ...getUser(id), ...updates };
}

updateUser(1, { name: "New Name" });  // only update name — all other fields optional
```

Use when: PATCH request body, form state before validation, partial updates.

---

## `Required<T>` — Make all fields required (inverse of Partial)

```typescript
type RequiredUser = Required<User>;
// All optional fields become required

type Draft = { title?: string; body?: string; publishedAt?: Date };
type ReadyToPublish = Required<Draft>;  // all must be present
```

---

## `Readonly<T>` — Freeze the shape (no mutation)

```typescript
type FrozenUser = Readonly<User>;
// { readonly id: number; readonly name: string; ... }

const config: Readonly<{ apiUrl: string; timeout: number }> = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};
config.apiUrl = "x";  // ERROR
```

Use for: config objects, initial state that should never change, React props.

---

## `Pick<T, K>` — Keep only the listed keys

```typescript
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }

type PublicUser = Pick<User, "id" | "name" | "email" | "role">;
// strips password and createdAt — safe to send to the client
```

---

## `Omit<T, K>` — Remove the listed keys

```typescript
type UserWithoutPassword = Omit<User, "password">;
// { id, name, email, createdAt, role } — no password

type NewUser = Omit<User, "id" | "createdAt">;
// shape for creating a new user — id and createdAt are server-generated
```

**Pick vs Omit:** Pick when you want a small subset. Omit when you want almost everything except a few fields.

---

## `Record<K, V>` — Build an object type from key/value types

```typescript
type RolePermissions = Record<"admin" | "user" | "guest", string[]>;
// { admin: string[]; user: string[]; guest: string[] }

const permissions: RolePermissions = {
  admin: ["read", "write", "delete"],
  user:  ["read", "write"],
  guest: ["read"],
};

// Dynamic keys
type Cache = Record<string, unknown>;
const cache: Cache = {};
```

---

## `ReturnType<F>` — Extract the return type of a function

```typescript
function createSession(userId: number) {
  return { token: "abc", userId, expiresAt: new Date() };
}

type Session = ReturnType<typeof createSession>;
// { token: string; userId: number; expiresAt: Date }

// Useful when the return type is complex and you don't want to duplicate it
```

---

## `Parameters<F>` — Extract the parameter types of a function

```typescript
function sendEmail(to: string, subject: string, body: string): void { }

type EmailArgs = Parameters<typeof sendEmail>;
// [to: string, subject: string, body: string]

// Useful for wrapping or decorating functions
function logged<T extends (...args: unknown[]) => unknown>(fn: T) {
  return (...args: Parameters<T>): ReturnType<T> => {
    console.log("Calling with:", args);
    return fn(...args) as ReturnType<T>;
  };
}
```

---

## `Awaited<T>` — Unwrap a Promise type

```typescript
async function fetchUser(): Promise<User> {
  return {} as User;
}

type FetchedUser = Awaited<ReturnType<typeof fetchUser>>;  // User
```

---

## Combining Utilities

The real power is chaining them:

```typescript
// Read-only public user — no password, all fields frozen
type PublicReadonlyUser = Readonly<Omit<User, "password">>;

// Partial update that only allows changing name, email, role
type UserPatch = Partial<Pick<User, "name" | "email" | "role">>;

function patchUser(id: number, changes: UserPatch): void { /* ... */ }
patchUser(1, { name: "New" });         // OK
patchUser(1, { password: "hack" });    // ERROR — password not in UserPatch
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Using `Partial` for everything | Only use where fields are truly optional |
| `Record<string, any>` | Use a proper value type: `Record<string, User>` etc. |
| Duplicating a function's return type manually | Use `ReturnType<typeof fn>` instead |
| Forgetting to combine utilities | `Readonly<Omit<T, "password">>` is idiomatic and safe |

---

## Practice Checklist (implement in `index.ts`)

- [ ] Create a `BlogPost` type and derive: `PostPreview` (id, title, author), `NewPost` (no id or createdAt), `PostPatch` (all optional except id), `PublicPost` (no internal fields)
- [ ] Write a `updatePost(id, patch: PostPatch)` function and call it with partial data
- [ ] Use `Record` to create a `slugToPost` map and a `statusCount` counter
- [ ] Use `ReturnType` to type the return value of a `parseConfig()` function without manually repeating the shape
- [ ] Write a `createApi<T>` helper that uses `Awaited` and `ReturnType` together
