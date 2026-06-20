// ─── WORKED EXAMPLE ────────────────────────────────────────────────────────
// Run this file: npx tsx index.ts
// Type check:    tsc --noEmit index.ts

// const enum HttpMethod {
//   GET = "GET",
//   POST = "POST",
//   PUT = "PUT",
//   DELETE = "DELETE",
// }

// type ApiEndpoint = {
//   path: string;
//   method: HttpMethod;
// };

// const endpoint: ApiEndpoint = { path: "/users", method: HttpMethod.GET };
// console.log(`${endpoint.method} ${endpoint.path}`);

// ─── PRACTICE ───────────────────────────────────────────────────────────────

// TODO 1: Declare one variable for each primitive type (string, number, boolean,
//          null, undefined) with explicit annotations.

const str: string = "";
const num: number = 123;
const bool: boolean = false;
const x: null = null;
const und: undefined = undefined;

// TODO 2: Write a function `describeValue(x: unknown): string` that:
//          - returns "string: <value>" if x is a string
//          - returns "number: <value>" if x is a number
//          - returns "boolean: <value>" if x is a boolean
//          - returns "unknown type" otherwise
//         Then call it with a few different values and console.log the results.

function describeValue(x: unknown): string {
  if (typeof x === "string") {
    return "string";
  } else if (typeof x === "number") {
    return "number";
  } else if (typeof x === "boolean") {
    return "boolean";
  } else {
    console.log(typeof x);
    return "unkown type";
  }
}

// console.log(describeValue(undefined));

// TODO 3: Declare a tuple type for a user record: [id, name, isAdmin]
//          where id is number, name is string, isAdmin is boolean.
//          Create two entries and console.log them.

type userRecord = [id: number, name: string, isAdmin: boolean];

let user1: userRecord = [1, "aman", false];
let user2: userRecord = [2, "loti", false];

// console.log(user1, user2);

// TODO 4: Extend the HttpMethod enum above (or create a new one) to add PATCH.
//          Create an ApiEndpoint that uses PATCH and log it.

const enum HttpMethod {
  get = "GET",
  post = "POST",
  patch = "PATCH",
  delete = "DELETE",
}

type ApiEndpoint = {
  path: string;
  method: HttpMethod;
};

const endpoint: ApiEndpoint = {
  path: "/api/v1/user/profile",
  method: HttpMethod.patch,
};

// console.log(endpoint);

// TODO 5: Write a function `assertNever(x: never): never` that throws an error.
//          Then write a function that uses it in a switch statement to ensure
//          exhaustive handling of an enum. (Hint: see module 05 for the full
//          pattern — for now, just write the assertNever shell.)
