import ArticlesPageView from "@/components/article/ArticlesPageView";
import { getArticles } from "@/lib/articles";

export const revalidate = 3600;

export const metadata = {
  title: "مقالات تخصصی | تاپ‌تول",
  description:
    "راهنمای خرید، بررسی تخصصی و آموزش استفاده از ابزارآلات صنعتی و حرفه‌ای",
};

export default function ArticlesPage() {
  const articles = getArticles();

  return <ArticlesPageView articles={articles} />;
}
