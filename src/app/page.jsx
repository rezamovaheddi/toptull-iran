import CategorySection from "../components/categories/CategorySection";
import Hero from "../hero/Hero";
import ProductSection from "../components/products/ProductSection";
import ArticleSection from "../components/article/ArticleSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <ProductSection />
      <ArticleSection />
    </>
  );
}
