import { CategorySection } from "@/components/shared/CategorySection";
import { CTASection } from "@/components/shared/CTASection";
import { FeaturedEvents } from "@/components/shared/FeaturedEvents";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { Hero } from "@/components/shared/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CategorySection />
      <FeaturedEvents />
      <CTASection />
      <Footer />
    </main>
  )
}