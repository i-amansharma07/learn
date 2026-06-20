// ─── WORKED EXAMPLE ────────────────────────────────────────────────────────

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  role: "admin" | "user" | "guest";
}

// Compose utilities
type PublicUser    = Readonly<Omit<User, "password">>;
type NewUser       = Omit<User, "id" | "createdAt">;
type UserPatch     = Partial<Pick<User, "name" | "email" | "role">>;

const newUser: NewUser = {
  name: "Aman",
  email: "a@example.com",
  password: "secret123",
  role: "user",
};
console.log("New user:", newUser);

const patch: UserPatch = { name: "Aman Sharma" };
console.log("Patch:", patch);

// ─── PRACTICE ───────────────────────────────────────────────────────────────

// TODO 1: Define BlogPost: { id, title, content, author, slug, tags: string[], publishedAt: Date | null, viewCount: number }
//          Then derive:
//            PostPreview   = only id, title, author, slug
//            NewPost       = no id, no viewCount (server sets these)
//            PostPatch     = all optional except id
//            PublicPost    = no internal fields (viewCount is internal, keep the rest)

// TODO 2: Write updatePost(id: number, patch: PostPatch): BlogPost
//          Simulate it by returning a merged object with dummy data.
//          Call it with just a title change and log the result.

// TODO 3: Create two Record types:
//            slugToPost: Record<string, BlogPost>      — a lookup table by slug
//            statusCount: Record<"draft" | "published" | "archived", number>
//          Populate both with some data and log them.

// TODO 4: Write parseConfig() that returns { apiUrl: string; debug: boolean; maxRetries: number }
//          Use ReturnType<typeof parseConfig> to type a variable that holds the config.
//          Do NOT manually repeat the return shape — let ReturnType derive it.

// TODO 5: Write an async function fetchPosts(): Promise<BlogPost[]>
//          Use Awaited<ReturnType<typeof fetchPosts>> to get the resolved type.
//          Log the type description as a comment and use the derived type in a variable.
