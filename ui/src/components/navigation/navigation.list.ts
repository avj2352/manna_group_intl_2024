/**
 * Nav List
 * to be used by
 * - Navbar
 * - Footer
 */
export type INavItem = {
  label: string;
  link: string;
  offSetYAxis: number | undefined;
  category: "about" | "products" | "company" | "contact";
};

export const navList: INavItem[] = [
  {
    label: "Who we are",
    link: "/about",
    offSetYAxis: 2,
    category: "about",
  },
  {
    label: "Vision & Mission",
    link: "/about",
    offSetYAxis: 220,
    category: "about",
  },
  {
    label: "Our Value",
    link: "/about",
    offSetYAxis: 490,
    category: "about",
  },
  {
    label: "Quality & Affordability",
    link: "/about",
    offSetYAxis: 700,
    category: "about",
  },
  {
    label: "Collaboration and R&D",
    link: "/about",
    offSetYAxis: 950,
    category: "about",
  },
  {
    label: "Management Team",
    link: "/about",
    offSetYAxis: 1300,
    category: "about",
  },
  {
    label: "Shop Products NOW!",
    link: "#",
    offSetYAxis: 2,
    category: "products",
  },
  {
    label: "Gallery",
    link: "/company",
    offSetYAxis: 1,
    category: "company",
  },
  {
    label: "Business Division",
    link: "/company",
    offSetYAxis: 2,
    category: "company",
  },
  {
    label: "USA & International",
    link: "/company",
    offSetYAxis: 2,
    category: "company",
  },
  {
    label: "Contract Manufacturing",
    link: "/company",
    offSetYAxis: 2,
    category: "company",
  },
  {
    label: "Contact Us",
    link: "#",
    offSetYAxis: undefined,
    category: "contact",
  },
  {
    label: "Send Inquiry",
    link: "#",
    offSetYAxis: undefined,
    category: "contact",
  },
  {
    label: "Careers",
    link: "#",
    offSetYAxis: undefined,
    category: "contact",
  },
];
