// Fallback for the implicit `children` slot. Adding the @modal parallel
// slot at the app root means Next needs a default for `children` too, to
// avoid a 404 if it ever can't recover the active page for a given URL.
// Every real route here matches a concrete page, so this is only a safety
// net for unrecoverable slot states.
export { default } from "./page";
