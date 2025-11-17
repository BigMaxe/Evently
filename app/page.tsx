import { CategorySection } from "@/components/shared/CategorySection";
import { Header } from "@/components/shared/Header";
import { Hero } from "@/components/shared/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CategorySection />
    </main>
  )
}