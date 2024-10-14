import { INavItem } from "@/common/interfaces";

export const navList: INavItem[] = [
  {
    label: "List Products",
    link: "/list-products",
    scrollId: "list-products",
    category: "products",
  },
  {
    label: "Add Product",
    link: "/add-product",
    scrollId: "add-product",
    category: "products",
  },
  {
    label: "List Promotions",
    link: "/list-promotions",
    scrollId: "list-promotions",
    category: "promotions",
  },
  {
    label: "Add a Promotion (NEW)",
    link: "/add-promotion",
    scrollId: "add-promotion",
    category: "promotions",
  },
  {
    label: "List Purchases",
    link: "/list-purchases",
    scrollId: "list-purchases",
    category: "purchases",
  },
  {
    label: "List Assets",
    link: "/list-assets",
    scrollId: "list-assets",
    category: "assets",
  },
  {
    label: "Manage Assets",
    link: "/manage-asset",
    scrollId: "manage-asset",
    category: "assets",
  },
  {
    label: "Manage Gallery",
    link: "/manage-gallery",
    scrollId: "manage-gallery",
    category: "assets",
  }
];
