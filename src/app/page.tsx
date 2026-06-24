import { Hero } from "../components/layout/hero";
import { Manifesto } from "../components/layout/manifesto";
import { BentoGrid } from "../components/layout/bento-grid";
import { Setores } from "../components/layout/setores";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <Hero />
      <Manifesto />
      <BentoGrid />
      <Setores />
    </main>
  );
}