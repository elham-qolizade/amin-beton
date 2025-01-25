import Footer from "../ui/Footer";
import Hero from "../ui/Hero";
import NewsLanding from "../ui/NewsLanding";
import ProductsLanding from "../ui/ProductsLanding";

export default function Home() {
  return (
    <div>
      <Hero />
      <ProductsLanding />
      <NewsLanding />
      <Footer />
    </div>
  );
}
