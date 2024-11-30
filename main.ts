import { Hono, Context } from "@hono/hono";

const app = new Hono();

app.get("/", (c: Context) => {
  return c.text("hello from Hono 🔥");
});

interface Tree {
  id: string;
  species: string;
  age: number;
  location: string;
}

const oak: Tree = {
  id: "3",
  species: "oak",
  age: 3,
  location: "Tim's house",
};

const setItem = (key: string, value: Tree) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key: string): Tree | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

setItem(`trees_${oak.id}`, oak);

const newTree = getItem(`trees_${oak.id}`);
console.log(newTree);

app.post("/trees", async (c: Context) => {
  const treeDetails = await c.req.json();
  const tree: Tree = treeDetails;
  setItem(`trees_${tree.id}`, tree);
  return c.json({
    message: `We just added a ${tree.species} tree!`,
  });
});

app.get(`/trees/:id`, async (c: Context) => {
  const id = await c.req.param("id");
  const tree = getItem(`trees_${id}`);
  if (!tree) {
    return c.json({ message: "Tree not found" }, 404);
  }
  return c.json(tree);
});

Deno.serve(app.fetch);
