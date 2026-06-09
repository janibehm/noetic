export type NavItem = {
  href: string;
  label: string;
  activePrefix?: string;
};

export type FooterColumn = {
  title: string;
  items: Array<Pick<NavItem, "href" | "label">>;
};

export const navItems: NavItem[] = [
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/lab", label: "Lab", activePrefix: "/lab" },
  { href: "/resources", label: "Resources" },
  { href: "/company", label: "Company" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Platform",
    items: [
      { href: "/products", label: "Products" },
      { href: "/solutions", label: "Solutions" },
      { href: "/pricing", label: "Pricing" },
      { href: "/resources", label: "API & Resources" },
    ],
  },
  {
    title: "Explore",
    items: [
      { href: "/lab", label: "Lab" },
      { href: "/resources", label: "Resources" },
      { href: "/", label: "Home" },
    ],
  },
  {
    title: "Company",
    items: [
      { href: "/company", label: "About" },
      { href: "/company", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function isCurrentPath(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  const activePrefix = item.activePrefix ?? item.href;
  return pathname === item.href || pathname.startsWith(`${activePrefix}/`);
}