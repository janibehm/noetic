/**
 * The studio route uses its own minimal layout because Sanity
 * ships its own global styles and chrome.
 */
export const metadata = { title: "Studio" };

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
