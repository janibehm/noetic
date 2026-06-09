// Single source of truth: article slug -> cover asset (by originalFilename) + alt.
//
// Imported by three seeds so a card preview and the article hero it links to
// always show the same image:
//   - seed-lab-resources-articles.mjs  sets each article's `coverImage`
//   - seed-lab.mjs / seed-resources.mjs set the matching card's `imageUrl`
//
// Resolve a slug to a Sanity image/url via scripts/lib/assets.mjs. Unknown
// slugs return `undefined` (the card keeps its aurora-gradient fallback), as
// does any asset that hasn't been uploaded yet — so seeds stay safe to run.
export const articleCovers = {
  // --- Lab: Latest discoveries -------------------------------------------
  "latent-navigation": { image: "pexels-googledeepmind-17483848.jpg", alt: "Geometric corridor receding into vivid perspective" },
  "what-makes-a-generation-feel-real": { image: "SQUARE_abstract3.jpg", alt: "Abstract editing canvas" },
  "holding-aesthetics-constant-across-a-series": { image: "pexels-anniroenkae-4793492.jpg", alt: "Densely layered red and blue abstract painting" },

  // --- Lab: Image generation research ------------------------------------
  "cascaded-diffusion-at-4k": { image: "pexels-googledeepmind-18069158.jpg", alt: "Voxel structure rising from a pale tiled plaza" },
  "the-grammar-of-a-great-prompt": { image: "SQUARE_abstract5.jpg", alt: "Latent space abstract" },
  "reference-locking-across-a-sequence": { image: "pexels-googledeepmind-17485013.jpg", alt: "Granular coral-like form held inside a wireframe cage" },
  "personalizing-a-model-on-twelve-images": { image: "pexels-googledeepmind-18069832.jpg", alt: "Translucent figure assembling from voxel fragments" },
  "faster-samplers-sharper-edges": { image: "snowy_landscape.jpg", alt: "Crisp snowy landscape" },
  "auto-expanding-sparse-prompts": { image: "pexels-2160218897-36802729.jpg", alt: "Rippling blue water reflections" },

  // --- Lab: Creative workflow research -----------------------------------
  "tokens-that-prompt-themselves": { image: "pexels-googledeepmind-25934977.jpg", alt: "Suspended moss-and-glass kinetic sculpture" },
  "from-spreadsheet-to-10000-assets": { image: "SQUARE_CITY_BUS.jpg", alt: "Batch-generated city visual" },
  "where-humans-stay-in-the-loop": { image: "pexels-googledeepmind-17483811.jpg", alt: "Glossy sphere centered in concentric blue orbital rings" },
  "shared-canvases-across-a-studio": { image: "pexels-googledeepmind-17483809.jpg", alt: "Field of colorful 3D geometric shapes" },
  "approval-flows-people-actually-use": { image: "SQUARE_street_view.jpg", alt: "Street scene edit" },
  "caching-generations-for-reuse": { image: "pexels-googledeepmind-18069860.jpg", alt: "Chrome and emerald liquid-metal sculpture" },

  // --- Lab: Latest articles ----------------------------------------------
  "color-memory-in-generative-models": { image: "VERTICAL_flowers_image_3.jpg", alt: "Saturated flower study" },
  "outpainting-beyond-the-frame": { image: "pexels-turgay-koca-405356598-15279122.jpg", alt: "Fiery marbled paint swirling around a vortex" },
  "measuring-taste-quantitatively": { image: "butterfly.jpg", alt: "Vivid butterfly perched on driftwood among wildflowers" },
  "depth-aware-relighting": { image: "SQUARE_mountain_landscape.jpg", alt: "Highly detailed mountain landscape" },
  "seeds-determinism-and-reproducibility": { image: "bonsai.jpg", alt: "Surreal bonsai tree in bloom on a concrete plinth" },
  "versioning-a-creative-canvas": { image: "pexels-googledeepmind-18069832.jpg", alt: "Translucent figure assembling from voxel fragments" },

  // --- Resources: Featured -----------------------------------------------
  "complete-guide-to-production-grade-prompting": { image: "SQUARE_abstract4.jpg", alt: "Cinematic abstract backdrop" },

  // --- Resources: Library ------------------------------------------------
  "anatomy-of-a-reliable-prompt": { image: "pexels-googledeepmind-17483809.jpg", alt: "Field of colorful 3D geometric shapes" },
  "your-first-batch-pipeline": { image: "SQUARE_abstract6.jpg", alt: "Consistent style abstract" },
  "composition-rules-the-model-loves": { image: "pexels-googledeepmind-17483848.jpg", alt: "Geometric corridor receding into vivid perspective" },
  "50-ad-variants-from-one-brief": { image: "pexels-anniroenkae-4793492.jpg", alt: "Densely layered red and blue abstract painting" },
  "studio-product-shots-no-studio": { image: "SQUARE_blueberries.jpg", alt: "Studio product shot" },
  "how-vantage-cut-creative-time-70": { image: "pexels-googledeepmind-18069158.jpg", alt: "Voxel structure rising from a pale tiled plaza" },
  "why-seeds-make-results-reproducible": { image: "SQUARE_aquarium.png", alt: "Aquarium reference scene" },
  "introducing-noetic-image-3": { image: "pexels-googledeepmind-18069860.jpg", alt: "Chrome and emerald liquid-metal sculpture" },
  "outpainting-for-wide-formats": { image: "pexels-turgay-koca-405356598-15279122.jpg", alt: "Fiery marbled paint swirling around a vortex" },
};
