import { CategorySection } from "@/components/shared/CategorySection";
import { FeaturedEvents } from "@/components/shared/FeaturedEvents";
import { Header } from "@/components/shared/Header";
import { Hero } from "@/components/shared/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CategorySection />
      <FeaturedEvents />
    </main>
  )
}