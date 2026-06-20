// ─── WORKED EXAMPLE ────────────────────────────────────────────────────────

type Product = {
  readonly id: number;
  name: string;
  price: number;
  description?: string;
};

function formatProduct(p: Product): string {
  const desc = p.description ? ` — ${p.description}` : "";
  return `[${p.id}] ${p.name} $${p.price}${desc}`;
}

const laptop: Product = { id: 1, name: "Laptop", price: 999 };
const phone: Product = {
  id: 2,
  name: "Phone",
  price: 699,
  description: "Flagship model",
};

// console.log(formatProduct(laptop));
// console.log(formatProduct(phone));

// ─── PRACTICE ───────────────────────────────────────────────────────────────

// TODO 1: Write formatName(first: string, last: string, title?: string): string
//          If title is provided: "Dr. Aman Sharma", otherwise "Aman Sharma"
//          Log a few examples.

function formatName(first: string, last: string, title?: string): string {
  return title ? `${title} ${first} ${last}` : `${first} ${last}`;
}

// console.log(formatName("Aman", "sharma"));
// console.log(formatName("Aman", "sharma", "DR."));

// TODO 2: Create a User type (id, name, email — all required; avatarUrl — optional;
//          createdAt — readonly). Then create a valid user object of that type.

type user = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  readonly createdAt: string;
};

const validUser: user = {
  id: "oxasnd12nas",
  name: "Aman Sharma",
  email: "aman@g.com",
  avatar: "cdn-aman.png",
  createdAt: "01-march",
};

// validUser.email = "sonal@g.com";
// console.log(validUser);

// TODO 3: Write a simplePick function:
//          simplePick(obj: Record<string, unknown>, keys: string[]): Record<string, unknown>
//          It should return a new object with only the specified keys.
//          (Module 04 will show you how to make this fully type-safe with generics.)

// TODO 4: Write a function loadData(
//            url: string,
//            callback: (err: Error | null, data: string) => void
//          ): void
//          Simulate it: if url includes "error", call callback(new Error("failed"), "")
//          otherwise call callback(null, `data from ${url}`)
//          Call it twice to test both paths.

// TODO 5: Write wordFrequency(words: string[]): { [word: string]: number }
//          It should count how many times each word appears.
//          Test: wordFrequency(["the", "cat", "sat", "on", "the", "mat", "the"])
//          Expected: { the: 3, cat: 1, sat: 1, on: 1, mat: 1 }
