#!/usr/bin/env node
// One-off seed: create real `article` documents for every article-style
// card on the Lab and Resources pages, so each can open as a modal /
// standalone page at /articles/<slug>. Safe to re-run — uses
// createOrReplace with deterministic _ids.
//
// Slugs here MUST match the hrefs set in seed-lab.mjs / seed-resources.mjs.
import "dotenv/config";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2025-01-01",
  useCdn: false,
});

let keySeq = 0;
const k = (prefix) => `${prefix}-${(keySeq++).toString(36)}`;

// Build a Portable Text block array. Each entry is a string (normal
// paragraph) or { style, text }.
function body(entries) {
  return entries.map((entry) => {
    const { style = "normal", text } =
      typeof entry === "string" ? { text: entry } : entry;
    return {
      _type: "block",
      _key: k("b"),
      style,
      markDefs: [],
      children: [{ _type: "span", _key: k("s"), text, marks: [] }],
    };
  });
}

// Resource categories that don't already exist (marketing does).
const categories = [
  { _id: "articleCategory-prompt-guides", title: "Prompt Guides", slug: "prompt-guides" },
  { _id: "articleCategory-tutorials", title: "Tutorials", slug: "tutorials" },
  { _id: "articleCategory-ai-art", title: "AI Art", slug: "ai-art" },
  { _id: "articleCategory-ecommerce", title: "E-commerce", slug: "ecommerce" },
  { _id: "articleCategory-case-studies", title: "Case Studies", slug: "case-studies" },
  { _id: "articleCategory-research", title: "Research", slug: "research" },
  { _id: "articleCategory-product-updates", title: "Product Updates", slug: "product-updates" },
];

const LAB = "articleCategory-lab";

// Each article: slug, title, excerpt, category, [hook, ...paragraphs].
const articles = [
  // --- Lab: Latest discoveries -------------------------------------------
  {
    slug: "latent-navigation",
    title: "Latent navigation: steering a model through its own imagination",
    category: LAB,
    excerpt: "Treating the latent space as a map you can walk, not a black box you query.",
    content: [
      { style: "h2", text: "The space between two images" },
      "Every generative model holds a continuous latent space where each point is a possible image. Latent navigation treats that space as terrain to be walked rather than a black box to be queried — interpolating, nudging and steering between concepts to find frames that no single prompt would land on.",
      "By moving deliberately along learned directions — more light, older, wider lens — we turn one-shot generation into something closer to exploration, where the interesting results live in the gaps between obvious prompts.",
    ],
  },
  {
    slug: "what-makes-a-generation-feel-real",
    title: "What makes a generation feel real",
    category: LAB,
    excerpt: "Realism is less about resolution and more about consistency of light, depth and material.",
    content: [
      { style: "h2", text: "Plausibility over pixels" },
      "A high-resolution image can still read as fake. What sells realism is internal consistency: light that falls from one direction, materials that scatter it correctly, and depth cues that agree with each other across the frame.",
      "We score generations on those physical signals rather than sharpness alone, and the models that win the test are rarely the ones with the most parameters — they are the ones that respect their own lighting.",
    ],
  },
  {
    slug: "holding-aesthetics-constant-across-a-series",
    title: "Holding aesthetics constant across a series",
    category: LAB,
    excerpt: "Keeping a look identical across dozens of frames without re-describing it each time.",
    content: [
      { style: "h2", text: "One look, many frames" },
      "A campaign is a series, not a single image. The hard problem is keeping palette, grain, lens character and mood identical across twenty frames while the subject and composition change underneath.",
      "We anchor the aesthetic with reference embeddings and fixed style directions, then let only the content vary — so a set reads as one shoot instead of twenty unrelated generations.",
    ],
  },
  // --- Lab: Image generation research ------------------------------------
  {
    slug: "cascaded-diffusion-at-4k",
    title: "Cascaded diffusion at 4K without the artifacts",
    category: LAB,
    excerpt: "How a coarse-to-fine cascade reaches print resolution without the usual seams.",
    content: [
      { style: "h2", text: "Coarse to fine, cleanly" },
      "Generating directly at 4K is expensive and prone to repetition. A cascade instead generates a confident low-resolution frame and then super-resolves it in stages, each stage adding detail conditioned on the last.",
      "The trick is suppressing the tiling seams and texture loops that cascades are notorious for — we overlap windows and re-noise boundaries so the final frame holds up under a hero crop.",
    ],
  },
  {
    slug: "the-grammar-of-a-great-prompt",
    title: "The grammar of a great prompt",
    category: LAB,
    excerpt: "Prompts have a syntax: subject, then composition, then light, then medium.",
    content: [
      { style: "h2", text: "Order is information" },
      "Models weight early tokens more heavily, so the order of a prompt is itself a signal. A reliable grammar puts the subject first, then composition, then lighting, then medium and finish.",
      "Following a consistent structure makes results reproducible and makes failures legible — when an image misses, you can usually point to the clause that the model under-weighted.",
    ],
  },
  {
    slug: "reference-locking-across-a-sequence",
    title: "Reference-locking across a 60-frame sequence",
    category: LAB,
    excerpt: "Keeping a character and setting identical across a long generated sequence.",
    content: [
      { style: "h2", text: "The same world, frame after frame" },
      "Sequences break when identity drifts: a face shifts, a jacket changes colour, a room rearranges itself. Reference-locking pins those attributes to fixed embeddings that persist across every frame.",
      "With the references held constant, only motion and framing change — letting a 60-frame sequence stay coherent enough to cut together.",
    ],
  },
  {
    slug: "personalizing-a-model-on-twelve-images",
    title: "Personalizing a model on twelve images",
    category: LAB,
    excerpt: "How few-shot fine-tuning learns a subject from a tiny, careful dataset.",
    content: [
      { style: "h2", text: "Less data, chosen well" },
      "You don't need thousands of images to teach a model a specific person, product or style. Twelve well-chosen frames — varied in pose, light and distance — are usually enough to learn a durable concept.",
      "The work is in curation, not volume: redundant angles teach nothing, while a spread of conditions teaches the model what stays constant and what is free to change.",
    ],
  },
  {
    slug: "faster-samplers-sharper-edges",
    title: "Faster samplers, sharper edges",
    category: LAB,
    excerpt: "Cutting sampling steps without smearing the high-frequency detail.",
    content: [
      { style: "h2", text: "Fewer steps, same crispness" },
      "Each sampling step costs time, so the race is to reach a clean image in as few as possible. Naive shortcuts soften edges and wash out texture.",
      "Higher-order samplers and learned step schedules let us drop from fifty steps to a handful while keeping the high-frequency detail that makes an edge look intentional rather than blurred.",
    ],
  },
  {
    slug: "auto-expanding-sparse-prompts",
    title: "Auto-expanding sparse prompts",
    category: LAB,
    excerpt: "Turning a three-word prompt into a fully specified scene the model can render well.",
    content: [
      { style: "h2", text: "From three words to a full brief" },
      "Most users type sparse prompts — three or four words — and models do their best to guess the rest. Auto-expansion fills the gaps explicitly, proposing lighting, lens and composition before generation.",
      "Because the expansion is visible and editable, users keep control: the model offers a complete brief, and the person decides which parts to keep.",
    ],
  },
  // --- Lab: Creative workflow research -----------------------------------
  {
    slug: "tokens-that-prompt-themselves",
    title: "Tokens that prompt themselves",
    category: LAB,
    excerpt: "Design tokens that carry their own generation intent through a pipeline.",
    content: [
      { style: "h2", text: "Design systems meet generation" },
      "A design token usually encodes a colour or spacing value. We extend the idea so a token can also carry generation intent — a brand's lighting, mood and material defaults travel with it.",
      "When tokens prompt themselves, a marketer picks a brand token and the pipeline already knows how that brand wants its imagery to look.",
    ],
  },
  {
    slug: "from-spreadsheet-to-10000-assets",
    title: "From spreadsheet to 10,000 assets",
    category: LAB,
    excerpt: "Mapping rows of data to generations for localized, per-SKU production at scale.",
    content: [
      { style: "h2", text: "Data in, assets out" },
      "A product catalogue or localization matrix is just a spreadsheet. Map its columns to prompt fields and every row becomes a generation — per-SKU, per-market, per-audience.",
      "The pipeline turns a single template into ten thousand finished variants without anyone duplicating work by hand.",
    ],
  },
  {
    slug: "where-humans-stay-in-the-loop",
    title: "Where humans stay in the loop",
    category: LAB,
    excerpt: "Designing review points so automation accelerates people instead of replacing judgment.",
    content: [
      { style: "h2", text: "Automate the volume, not the taste" },
      "Full automation is tempting and usually wrong. The valuable human decisions — brand fit, tone, the final yes — should sit at clear checkpoints rather than be scattered through the process.",
      "We design pipelines that generate at machine speed and then surface a tight, well-framed choice to a person, so judgment stays where it matters.",
    ],
  },
  {
    slug: "shared-canvases-across-a-studio",
    title: "Shared canvases across a studio",
    category: LAB,
    excerpt: "Real-time multiplayer for generation, with version history that survives experimentation.",
    content: [
      { style: "h2", text: "Generation as a team sport" },
      "Creative work is collaborative, but most generation tools are single-player. A shared canvas lets designers, marketers and PMs explore the same space at once, with comments and presence.",
      "Version history makes the experimentation safe: any branch can be revisited, so the team can be reckless in exploration and precise in what they ship.",
    ],
  },
  {
    slug: "approval-flows-people-actually-use",
    title: "Approval flows people actually use",
    category: LAB,
    excerpt: "Governance that brand and legal teams trust without slowing creative to a crawl.",
    content: [
      { style: "h2", text: "Control without friction" },
      "Approval flows fail when they feel like bureaucracy. The ones people actually use make the next action obvious, batch related decisions, and never ask twice for the same sign-off.",
      "We treat approvals as part of the creative tool, not a separate gate — so brand and legal stay in control while creative keeps moving.",
    ],
  },
  {
    slug: "caching-generations-for-reuse",
    title: "Caching generations for reuse",
    category: LAB,
    excerpt: "Recognizing when a generation already exists so the pipeline never pays twice.",
    content: [
      { style: "h2", text: "Don't generate the same thing twice" },
      "At scale, pipelines regenerate near-identical assets constantly. A content-addressed cache recognizes when a request matches a prior generation and returns it instantly.",
      "Beyond saving compute, reuse keeps a brand consistent: the same input reliably yields the same trusted output.",
    ],
  },
  // --- Lab: Latest articles ----------------------------------------------
  {
    slug: "color-memory-in-generative-models",
    title: "Color memory in generative models",
    category: LAB,
    excerpt: "Why models drift away from a specified palette, and how to make colour stick.",
    content: [
      { style: "h2", text: "The palette won't hold still" },
      "Ask for a precise brand colour and models tend to drift toward their training average. Colour memory is the problem of making a specified palette persist through generation.",
      "We condition on palette anchors and penalize drift directly, so a brand red stays the brand red instead of sliding toward whatever the model saw most often.",
    ],
  },
  {
    slug: "outpainting-beyond-the-frame",
    title: "Outpainting beyond the frame",
    category: LAB,
    excerpt: "Extending an image past its borders while keeping perspective and light coherent.",
    content: [
      { style: "h2", text: "What lies just outside the shot" },
      "Outpainting invents the world beyond an image's edges. Done badly it produces repeating textures and broken perspective; done well it feels like the camera simply pulled back.",
      "Conditioning new regions on the existing geometry and light keeps the extension believable, which is what makes reframing for different aspect ratios practical.",
    ],
  },
  {
    slug: "measuring-taste-quantitatively",
    title: "Measuring 'taste' quantitatively",
    category: LAB,
    excerpt: "Turning a fuzzy sense of quality into signals a model can actually optimize.",
    content: [
      { style: "h2", text: "Can you put a number on good?" },
      "Taste feels unquantifiable, yet teams agree on it more than they expect. We turn that agreement into preference data — pairwise judgments that reveal consistent signals beneath the subjectivity.",
      "Those signals become a reward the model can optimize, nudging generations toward what people repeatedly choose rather than what is merely sharp.",
    ],
  },
  {
    slug: "depth-aware-relighting",
    title: "Depth-aware relighting",
    category: LAB,
    excerpt: "Re-lighting a scene correctly by reasoning about its estimated geometry.",
    content: [
      { style: "h2", text: "Light needs to know the shape" },
      "Relighting fails when it ignores geometry — shadows fall in impossible places and highlights ignore form. Depth-aware relighting estimates the scene's shape first.",
      "With a depth map in hand, new light interacts with surfaces the way it should, so a studio shot can be moved to golden hour without looking pasted on.",
    ],
  },
  {
    slug: "seeds-determinism-and-reproducibility",
    title: "Seeds, determinism and reproducibility",
    category: LAB,
    excerpt: "Why a fixed seed is the foundation of a pipeline you can trust.",
    content: [
      { style: "h2", text: "Same input, same output" },
      "A seed fixes the random starting point of a generation. Hold it constant and a prompt returns the same image every time — the basis of any reproducible pipeline.",
      "Determinism turns generation from a slot machine into an instrument: change one parameter, regenerate, and you know the difference came from your edit and nothing else.",
    ],
  },
  {
    slug: "versioning-a-creative-canvas",
    title: "Versioning a creative canvas",
    category: LAB,
    excerpt: "Bringing branchable, restorable version history to open-ended creative work.",
    content: [
      { style: "h2", text: "Undo for exploration" },
      "Creative exploration is non-linear, but most tools only offer a flat undo stack. Versioning a canvas means every state is branchable and restorable, like commits for images.",
      "When any direction can be revisited, people explore more freely — the safety net is what makes the risk-taking productive.",
    ],
  },
  // --- Resources: Featured -----------------------------------------------
  {
    slug: "complete-guide-to-production-grade-prompting",
    title: "The complete guide to production-grade prompting",
    category: "articleCategory-prompt-guides",
    author: { name: "Iris Tanaka", role: "Lead Applied Researcher" },
    readingTimeMinutes: 12,
    excerpt: "A field manual for consistent, on-brand results — structure, references, seeds and the parameters that actually matter.",
    content: [
      { style: "h2", text: "Prompting is a craft, not a guess" },
      "Production prompting is repeatable. This guide covers the structure that gets reliable results, the references that lock a look, and the parameters worth tuning versus the ones safe to ignore.",
      { style: "h3", text: "Structure first" },
      "Lead with the subject, then composition, then lighting, then medium. A consistent order makes results reproducible and failures diagnosable.",
      { style: "h3", text: "Lock with references and seeds" },
      "References hold the aesthetic; seeds hold the variation. Together they turn a lucky generation into a process you can run a hundred times.",
      { style: "blockquote", text: "The best prompt is the one you can hand to a teammate and get the same image back." },
    ],
  },
  // --- Resources: Library ------------------------------------------------
  {
    slug: "anatomy-of-a-reliable-prompt",
    title: "Anatomy of a reliable prompt",
    category: "articleCategory-prompt-guides",
    excerpt: "The parts of a prompt that consistently move the result, dissected.",
    content: [
      { style: "h2", text: "Every clause earns its place" },
      "A reliable prompt is built from parts that each do a job: subject, composition, lighting, medium and finish. Padding it with adjectives the model ignores only adds noise.",
      "Learn which clauses move the result and a prompt becomes a dependable tool instead of an incantation.",
    ],
  },
  {
    slug: "your-first-batch-pipeline",
    title: "Your first batch pipeline",
    category: "articleCategory-tutorials",
    excerpt: "A step-by-step walkthrough from a single template to hundreds of generated assets.",
    content: [
      { style: "h2", text: "From one template to many" },
      "A batch pipeline turns a template plus a data source into a stack of finished assets. This walkthrough starts with one generation and ends with a repeatable job.",
      "You'll map data columns to prompt fields, run a small batch, and verify the output before scaling the same job to hundreds of rows.",
    ],
  },
  {
    slug: "composition-rules-the-model-loves",
    title: "Composition rules the model loves",
    category: "articleCategory-ai-art",
    excerpt: "Classic composition principles, and why generative models respond so strongly to them.",
    content: [
      { style: "h2", text: "Old rules, new medium" },
      "Rule of thirds, leading lines, negative space — the model learned them from millions of well-composed images, so naming them in a prompt pays off.",
      "Treat composition as explicit instruction rather than hope, and generations arrive framed instead of merely centered.",
    ],
  },
  {
    slug: "50-ad-variants-from-one-brief",
    title: "50 ad variants from one brief",
    category: "articleCategory-marketing",
    excerpt: "Generating a full set of on-brand ad creatives from a single structured brief.",
    content: [
      { style: "h2", text: "One brief, a full campaign" },
      "A single structured brief can fan out into fifty on-brand variants — sizes, headlines and treatments — without fifty rounds of work.",
      "With the brand kit enforced at generation time, the variants stay consistent while testing far more creative directions than a manual process could.",
    ],
  },
  {
    slug: "studio-product-shots-no-studio",
    title: "Studio product shots, no studio",
    category: "articleCategory-ecommerce",
    excerpt: "Producing clean, consistent e-commerce product imagery without a photo shoot.",
    content: [
      { style: "h2", text: "The studio is optional now" },
      "Clean product imagery used to require a lightbox, a camera and a day. Generation produces consistent shots — angles, backgrounds, lighting — from a reference image.",
      "For a catalogue of hundreds of SKUs, the savings compound while the look stays uniform across every listing.",
    ],
  },
  {
    slug: "how-vantage-cut-creative-time-70",
    title: "How Vantage cut creative time 70%",
    category: "articleCategory-case-studies",
    excerpt: "A case study in folding generation into an existing creative team's workflow.",
    content: [
      { style: "h2", text: "Faster, without losing the brand" },
      "Vantage didn't replace its creative team — it removed the repetitive production work that surrounded them, cutting turnaround by seventy percent.",
      "The win came from putting generation inside the existing workflow and approval flow, so speed never came at the cost of brand control.",
    ],
  },
  {
    slug: "why-seeds-make-results-reproducible",
    title: "Why seeds make results reproducible",
    category: "articleCategory-research",
    excerpt: "A plain-language explanation of seeds and the reproducibility they enable.",
    content: [
      { style: "h2", text: "The number behind the image" },
      "A seed is the random starting point of a generation. Fix it and the same prompt returns the same image — the foundation of reproducible work.",
      "Understanding seeds is what lets you change one variable at a time and trust that the difference you see came from your edit.",
    ],
  },
  {
    slug: "introducing-noetic-image-3",
    title: "Introducing noetic-image-3",
    category: "articleCategory-product-updates",
    excerpt: "What's new in the latest model generation — quality, control and speed.",
    content: [
      { style: "h2", text: "The next model generation" },
      "noetic-image-3 improves on three fronts at once: higher fidelity, finer prompt control, and faster sampling that keeps detail crisp.",
      "Existing pipelines can adopt it with a single model parameter change, so teams get the gains without rebuilding their workflows.",
    ],
  },
  {
    slug: "outpainting-for-wide-formats",
    title: "Outpainting for wide formats",
    category: "articleCategory-tutorials",
    excerpt: "Reframing a square or portrait image into a wide banner without distortion.",
    content: [
      { style: "h2", text: "From square to widescreen" },
      "Wide banners rarely match the aspect ratio you generated in. Outpainting extends the scene sideways, inventing coherent context instead of stretching pixels.",
      "This tutorial walks through extending an image to a 16:9 or banner format while keeping the original subject untouched and the new regions believable.",
    ],
  },
];

const DEFAULT_AUTHOR = { name: "Noetic Lab" };
const RESOURCES_AUTHOR = { name: "Noetic Editorial" };

function authorFor(article) {
  if (article.author) return article.author;
  return article.category === LAB ? DEFAULT_AUTHOR : RESOURCES_AUTHOR;
}

// --- Write ----------------------------------------------------------------
for (const category of categories) {
  await client.createOrReplace({
    _id: category._id,
    _type: "articleCategory",
    title: category.title,
    slug: { _type: "slug", current: category.slug },
  });
  console.log(`Seeded category: ${category._id}`);
}

let published = Date.parse("2026-05-01T12:00:00.000Z");
for (const article of articles) {
  const res = await client.createOrReplace({
    _id: `article-${article.slug}`,
    _type: "article",
    title: article.title,
    slug: { _type: "slug", current: article.slug },
    excerpt: article.excerpt,
    seoDescription: article.excerpt,
    category: { _type: "reference", _ref: article.category },
    author: authorFor(article),
    publishedAt: new Date(published).toISOString(),
    readingTimeMinutes: article.readingTimeMinutes ?? 4,
    body: body(article.content),
  });
  console.log(`Seeded article: ${res._id} (/articles/${article.slug})`);
  // Stagger publish dates so listings order sensibly.
  published += 60 * 60 * 1000;
}

console.log(`\nDone: ${categories.length} categories, ${articles.length} articles.`);
