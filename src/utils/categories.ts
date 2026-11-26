// The four categories. Keep in step with seed/seed.json (the taxonomy terms)
// and the badge icons in src/components/Badge.astro.
export const categories = [
	{ name: "Median", slug: "median", description: "Finished, definitive essays — the central argument", browse: "More finished essays" },
	{ name: "Box", slug: "box", description: "Dense, substantial analysis — the main body", browse: "More dense analysis" },
	{ name: "Whisker", slug: "whisker", description: "Recommendations and links — reaching outward", browse: "More recommendations" },
	{ name: "Outlier", slug: "outlier", description: "Rough ideas and seeds — outside the expected range", browse: "More rough ideas" },
] as const;

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

export const DIVIDERS = [
	"M 0,4 C 90,2 230,6 390,3 C 510,2 610,5 680,4",
	"M 0,5 C 110,3 250,7 390,4 C 500,2 605,6 680,5",
	"M 0,4 C 85,6 210,2 360,5 C 475,3 585,6 680,4",
	"M 0,5 C 130,3 270,7 410,4 C 515,3 600,6 680,5",
	"M 0,4 C 100,3 220,5 400,4 C 500,3 605,5 680,4",
];

export const formatDate = (d: Date) =>
	d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
