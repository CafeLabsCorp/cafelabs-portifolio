import { Hero } from "../components/layout/hero";
import { BentoGrid } from "../components/layout/bento-grid"; // <-- Importe aqui

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <Hero />
      <BentoGrid />
    </main>
  );
}