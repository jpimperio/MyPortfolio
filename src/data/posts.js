const modules = import.meta.glob("/src/data/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };
  const frontmatter = match[1];
  const content = match[2];
  const meta = {};
  frontmatter.split("\n").forEach((line) => {
    const [, key, val] = line.match(/^(\w+):\s+"?(.+?)"?$/) || [];
    if (key) meta[key] = val.replace(/^"|"$/g, "");
  });
  return { meta, content };
}

const posts = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split("/").pop().replace(".md", "");
    const { meta, content } = parseFrontmatter(raw);
    return { slug, ...meta, content };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export function getPosts() {
  return posts;
}

export function getPost(slug) {
  return posts.find((p) => p.slug === slug) || null;
}
