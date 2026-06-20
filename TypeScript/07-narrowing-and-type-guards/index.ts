// ─── WORKED EXAMPLE ────────────────────────────────────────────────────────

// Custom type guard + filter pattern
function isNonNull<T>(x: T | null | undefined): x is T {
  return x !== null && x !== undefined;
}

const rawData = [1, null, 3, undefined, 5, null, 7];
const numbers = rawData.filter(isNonNull);  // number[]
console.log(numbers);  // [1, 3, 5, 7]

// Assertion function
function assertIsString(x: unknown): asserts x is string {
  if (typeof x !== "string") {
    throw new TypeError(`Expected string, got ${typeof x}`);
  }
}

function shout(input: unknown): string {
  assertIsString(input);
  return input.toUpperCase();  // input is now string
}

console.log(shout("hello"));

// ─── PRACTICE ───────────────────────────────────────────────────────────────

// TODO 1: Write parseInput(x: unknown): string | number | boolean
//          - if x is string, number, or boolean — return it as-is
//          - otherwise throw a TypeError with a descriptive message
//          Test with valid and invalid inputs.

// TODO 2: Write isNonEmptyString(x: unknown): x is string
//          Returns true only if x is a non-empty string.
//          Use it to filter ["hello", "", null, "world", undefined, 42] → ["hello", "world"]

// TODO 3: Write hasProperty<T extends object>(obj: T, key: PropertyKey): key is keyof T
//          Use Object.hasOwn(obj, key) inside.
//          Test: check whether a user object has an "email" field before accessing it.

// TODO 4: Write assertNonEmpty<T>(arr: T[]): asserts arr is [T, ...T[]]
//          Throws if array is empty.
//          Then write a function that uses it to safely access arr[0].

// TODO 5: Refactor this bad state type to a discriminated union:
//
//   type BadState = {
//     loading: boolean;
//     error: string | null;
//     user: { name: string; email: string } | null;
//   };
//
//   Good version should have: "idle" | "loading" | "success" (with user) | "error" (with message)
//   Then write renderUI(state: GoodState): string that handles all 4 cases
//   and add assertNever for exhaustiveness.
