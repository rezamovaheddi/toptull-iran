/**
 * @typedef {Object} NavItem
 * @property {string} id
 * @property {string} label
 * @property {string} href
 */

/** @type {NavItem[]} */
export const NAVITEMs = [
  { id: "home", label: "صفحه اصلی", href: "/" },
  { id: "products", label: "محصولات", href: "/products" },
  { id: "others", label: "دسته بندی ", href: "/others" },
  { id: "articles", label: "مقالات", href: "/articles" },
  { id: "about", label: "درباره ما", href: "/about" },
  { id: "contact", label: "تماس با ما", href: "/contact" },
];
