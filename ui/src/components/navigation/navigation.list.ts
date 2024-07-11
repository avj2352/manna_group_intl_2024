/**
 * Nav List
 * to be used by
 * - Navbar
 * - Footer
 */
export type INavItem = {
  label: string;
  link: string;
  section: string | undefined;
  category: "about" | "products" | "company" | "contact";
};

export const navList: INavItem[] = [
  {
    label: "Who we are",
    link: "/about",
    section: undefined,
    category: "about",
  },
  {
    label: "Vision & Mission",
    link: "/about",
    section: undefined,
    category: "about",
  },
  {
    label: "Our Value",
    link: "/about",
    section: undefined,
    category: "about",
  },
  {
    label: "Quality & Affordability",
    link: "/about",
    section: undefined,
    category: "about",
  },
  {
    label: "Collaboration and R&D",
    link: "/about",
    section: undefined,
    category: "about",
  },
  {
    label: "Management Team",
    link: "/about",
    section: undefined,
    category: "about",
  },
  {
    label: "Shop Products NOW!",
    link: "#",
    section: undefined,
    category: "products",
  },
  {
    label: "Dietory Supplements",
    link: "#",
    section: undefined,
    category: "products",
  },
  {
    label: "Events",
    link: "#",
    section: undefined,
    category: "company",
  },
  {
    label: "Careers",
    link: "#",
    section: undefined,
    category: "company",
  },
  {
    label: "Business Division",
    link: "#",
    section: undefined,
    category: "company",
  },
  {
    label: "USA & International",
    link: "#",
    section: undefined,
    category: "company",
  },
  {
    label: "Contract Manufacturing",
    link: "#",
    section: undefined,
    category: "company",
  },
  {
    label: "Contact Us",
    link: "#",
    section: undefined,
    category: "contact",
  },
  {
    label: "Send Inquiry",
    link: "#",
    section: undefined,
    category: "contact",
  },
  {
    label: "Careers",
    link: "#",
    section: undefined,
    category: "contact",
  },
];
