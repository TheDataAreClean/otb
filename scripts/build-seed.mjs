// Builds seed/seed.json from seed/base.json plus seed/content/*.md.
// The About and Reference pages are each one HTML block (markdown rendered
// here), so the page text stays editable as plain markdown in git until first
// boot; after that, edit them in the EmDash admin.
//   npm run seed
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = JSON.parse(readFileSync(join(root, "seed/base.json"), "utf8"));
marked.setOptions({ gfm: true });

const page = (id, slug, title, file) => ({
	id,
	slug,
	status: "published",
	data: {
		title,
		content: [
			{
				_type: "htmlBlock",
				_key: `${id}-html`,
				html: marked.parse(readFileSync(join(root, "seed/content", file), "utf8")),
			},
		],
	},
});

base.content = {
	pages: [page("about", "about", "About", "about.md"), page("reference", "reference", "Reference", "reference.md")],
	posts: [],
};

writeFileSync(join(root, "seed/seed.json"), JSON.stringify(base, null, "\t") + "\n");
console.log("Wrote seed/seed.json");
