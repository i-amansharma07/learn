// ─── WORKED EXAMPLE ────────────────────────────────────────────────────────

// Interface with extends
interface Shape {
  color: string;
  area(): number;
}

interface Circle extends Shape {
  radius: number;
}

const c: Circle = {
  color: "red",
  radius: 5,
  area() { return Math.PI * this.radius ** 2; },
};

console.log(`Circle area: ${c.area().toFixed(2)}`);

// Type with union — can't do this with interface
type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function handleResponse(res: ApiResponse<string>) {
  if (res.ok) {
    console.log("Data:", res.data);
  } else {
    console.log("Error:", res.error);
  }
}

handleResponse({ ok: true, data: "hello" });
handleResponse({ ok: false, error: "not found" });

// ─── PRACTICE ───────────────────────────────────────────────────────────────

// TODO 1: Define a Vehicle interface (make, model, year, fuelType).
//          Extend it into Car (numDoors: number) and Truck (payloadTons: number).
//          Create one instance of each and log them.

// TODO 2: Create a type WithTimestamps = { createdAt: Date; updatedAt: Date }.
//          Create a User interface (id, name, email).
//          Create UserRecord = User & WithTimestamps using intersection.
//          Make a valid UserRecord and log it.

// TODO 3: Use declaration merging to add an `appName: string` property to Window.
//          (Declare: interface Window { appName: string })
//          Then set window.appName = "MyApp" and log it.
//          Note: this only works in a browser environment — in Node, use
//          `declare global { interface Window { appName: string } }` pattern.

// TODO 4: Write ApiResult<T> as a discriminated union type with:
//          - { status: "success"; data: T }
//          - { status: "loading" }
//          - { status: "error"; message: string }
//          Write a function renderResult(r: ApiResult<number>): string
//          that returns a human-readable string for each case.

// TODO 5: Write the same "BlogPost" shape as both interface and type:
//          fields: id (number), title (string), content (string), tags (string[]), publishedAt (Date | null)
//          Note any difference in how they feel to use.
