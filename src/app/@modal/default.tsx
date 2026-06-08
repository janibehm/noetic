// Rendered for the @modal slot whenever no intercepting route is active
// (e.g. on the home page, or on a hard load of /articles/[slug] where
// interception does not run). Returning null keeps the modal closed.
export default function ModalDefault() {
  return null;
}
