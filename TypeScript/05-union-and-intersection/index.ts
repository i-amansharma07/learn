// ─── WORKED EXAMPLE ────────────────────────────────────────────────────────

// Discriminated union for a fetch state
type FetchState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

function assertNever(x: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
}

function renderState(state: FetchState<string[]>): string {
  switch (state.status) {
    case "loading": return "Loading...";
    case "success": return `Items: ${state.data.join(", ")}`;
    case "error":   return `Error: ${state.message}`;
    default:        return assertNever(state);
  }
}

console.log(renderState({ status: "loading" }));
console.log(renderState({ status: "success", data: ["apple", "banana"] }));
console.log(renderState({ status: "error", message: "Network timeout" }));

// ─── PRACTICE ───────────────────────────────────────────────────────────────

// TODO 1: Define a Shape discriminated union:
//          Circle   → { kind: "circle"; radius: number }
//          Square   → { kind: "square"; side: number }
//          Triangle → { kind: "triangle"; base: number; height: number }
//          Write area(shape: Shape): number with a switch + assertNever default.
//          Test with one of each shape.

// TODO 2: Write format(value: string | number | boolean): string
//          - string  → returns it quoted: '"hello"'
//          - number  → returns it with 2 decimal places: "3.14"
//          - boolean → returns "yes" or "no"
//          Use typeof narrowing.

// TODO 3: Model a counter Action union:
//          { type: "increment" } | { type: "decrement" } | { type: "reset"; to: number }
//          Write reducer(state: number, action: Action): number.
//          Test: start at 0, increment 3 times, decrement once, reset to 10.

// TODO 4: Define a User type (id, name, email).
//          Create AdminUser = User & { permissions: string[]; isSuperAdmin: boolean }.
//          Create one AdminUser, log it, and write a function that greets admins differently.

// TODO 5: Write safeDivide(a: number, b: number): number | "division by zero"
//          At the call site, use a type narrowing check (typeof or comparison)
//          to handle both outcomes. Log the final result.
