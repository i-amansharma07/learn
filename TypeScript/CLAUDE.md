# TypeScript Learning Course

A fast-paced, practical TypeScript course built for someone with React/Node experience.
Read the `.md` → implement the `// TODO:` tasks in `index.ts` → move on.

---

## Prerequisites

```bash
node --version        # need Node 18+
npm install -g tsx    # run .ts files directly: tsx index.ts
tsc --version         # TypeScript compiler for type checking
```

If `tsc` is missing: `npm install -g typescript`

---

## How to Use Each Module

```
1. Open the topic's .md file — read it top to bottom
2. Open index.ts alongside it (split view in VS Code)
3. Fill in each // TODO block
4. Run:  npx tsx index.ts          (see output)
         tsc --noEmit index.ts     (see type errors only)
5. Check off the box below, move to the next module
```

---

## tsconfig (for type checking individual files)

Create this at `TypeScript/tsconfig.json` if you want project-wide checking:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "esModuleInterop": true
  },
  "include": ["**/*.ts"]
}
```

---

## Progress Tracker

### Stage 1 — Foundations (~1–2 weeks)

- [ ] 01 — Basic Types
- [ ] 02 — Functions & Objects
- [ ] 03 — Type vs Interface

### Stage 2 — Intermediate (~2–3 weeks)

- [ ] 04 — Generics
- [ ] 05 — Union & Intersection
- [ ] 06 — Utility Types
- [ ] 07 — Narrowing & Type Guards

**Completed: 0 / 7**

---

## Quick Reference Card

| Concept | Syntax |
|---|---|
| Basic type annotation | `let x: string = "hello"` |
| Function signature | `(a: number, b: number): number` |
| Optional property | `name?: string` |
| Union | `string \| number` |
| Intersection | `A & B` |
| Generic | `function id<T>(x: T): T` |
| Utility | `Partial<User>`, `Pick<User, "id">` |
| Type guard | `x is string` |
| Narrowing | `if (typeof x === "string")` |
