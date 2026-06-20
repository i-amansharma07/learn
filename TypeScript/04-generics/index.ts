// ─── WORKED EXAMPLE ────────────────────────────────────────────────────────

// Generic pick — fully type-safe
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
}

type User = { id: number; name: string; email: string; age: number };
const user: User = { id: 1, name: "Aman", email: "a@b.com", age: 25 };

const preview = pick(user, ["id", "name"]);
console.log(preview); // { id: 1, name: "Aman" }
// preview.email  // ERROR — not in the picked keys

// ─── PRACTICE ───────────────────────────────────────────────────────────────

// TODO 1: Write last<T>(arr: T[]): T | undefined
//          Test with a string array and a number array.

// TODO 2: Write merge<A, B>(a: A, b: B): A & B
//          It should return a new object with all properties from both.
//          Test: merge({ name: "Aman" }, { age: 25 }) → { name: "Aman", age: 25 }

// TODO 3: Write getProperty<T, K extends keyof T>(obj: T, key: K): T[K]
//          This is the type-safe version of obj[key].
//          Verify that passing a key that doesn't exist on the object causes a TS error.

// TODO 4: Define a Repository<T extends { id: number }> interface with:
//            findById(id: number): T | undefined
//            findAll(): T[]
//            save(item: T): T
//            delete(id: number): boolean
//          Then implement it as InMemoryRepository<T> using a Map<number, T> internally.
//          Test it with the User type above.

// TODO 5: Write zip<A, B>(a: A[], b: B[]): [A, B][]
//          It should pair elements by index, stopping at the shorter array.
//          Test: zip(["a", "b", "c"], [1, 2, 3]) → [["a",1], ["b",2], ["c",3]]
