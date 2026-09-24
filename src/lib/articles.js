import rawArticles from "./data";

export function getArticles() {
  return rawArticles;
}

export function getLatestArticles(count = 3) {
  return rawArticles.slice(0, count);
}

export function formatPersianDate(isoDate) {
  if (!isoDate) return "";

  try {
    return new Intl.DateTimeFormat("fa-IR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(isoDate));
  } catch {
    return "";
  }
}
