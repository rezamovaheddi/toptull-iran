import Hero from "@/hero/Hero";
import CategorySection from "@/components/categories/CategorySection";
import ProductSection from "@/components/products/ProductSection";
import ArticleSection from "@/components/article/ArticleSection";
import { getLatestArticles } from "@/lib/articles";

export const revalidate = 3600;

export const metadata = {
  title: "تاپ‌تول | فروشگاه تخصصی ابزارآلات صنعتی و حرفه‌ای",
  description:
    "فروشگاه تخصصی ابزارآلات تاپ‌تول (TopTul Iran) - با کیفیت‌ترین ابزارآلات صنعتی و کارگاهی حرفه‌ای با استانداردهای جهانی.",
};

export default function HomePage() {
  const articles = getLatestArticles(3);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CategorySection />
      <ProductSection />
      <ArticleSection articles={articles} />
    </div>
  );
}
