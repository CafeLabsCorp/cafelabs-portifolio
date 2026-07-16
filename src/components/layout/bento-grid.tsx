"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Blocks, LucideIcon } from "lucide-react";
import Image from "next/image";
import { MindLogo } from "@/components/ui/mind-logo";

// Os dados dos seus MVPs (Isso facilita muito a manutenção no futuro)
const experimentos: {
  id: number;
  title: string;
  logo?: string;
  logoComponent?: React.ComponentType<{ className?: string }>;
  icon?: LucideIcon;
  description: string;
  status: string;
  stack: string[];
  span: string;
  link?: string;
}[] = [
  {
    id: 1,
    title: "Domo",
    logo: "/domo-logo.svg",
    description: "App de gestão doméstica para famílias e grupos: dispensa compartilhada, lista de compras e organização da casa por membros.",
    status: "beta",
    stack: ["Flutter", "Firebase", "Riverpod"],
    span: "md:col-span-2", // Ocupa duas colunas
    link: "https://domo.cafelabs.net",
  },
  {
    id: 2,
    title: "Dindin",
    logo: "/dindin-logo.svg",
    description: "Controle financeiro pessoal por 'caixinhas': receitas entram, são alocadas entre categorias e os gastos saem de cada uma.",
    status: "ATIVO",
    stack: ["Flutter", "Firebase", "Riverpod"],
    span: "md:col-span-1", // Ocupa uma coluna
    link: "https://dindin.cafelabs.net",
  },
  {
    id: 3,
    title: "Forge Skill Library",
    icon: Blocks,
    description: "Galeria dos agentes especializados do Forge (orquestrador + time), com prompt completo e busca ao vivo do repositório público.",
    status: "em breve",
    stack: ["Next.js", "TypeScript"],
    span: "md:col-span-1",
    link: "https://forge.cafelabs.net",
  },
  {
    id: 4,
    title: "mind",
    logoComponent: MindLogo,
    description: "Base genérica de conhecimento pessoal versionado e integrado ao Claude Code — clone e monte a sua própria 'mente' de projetos.",
    status: "open source",
    stack: ["Markdown", "Claude Code"],
    span: "md:col-span-1",
    link: "https://mind.cafelabs.net",
  },
];

export function BentoGrid() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="laboratorio" className="w-full max-w-6xl mx-auto px-6 py-24 sm:py-32">
      {/* Cabeçalho da Seção */}
      <div className="mb-12 md:mb-16">
        <h2 className="font-poppins text-3xl md:text-5xl font-bold tracking-tight mb-4">
          O Laboratório.
        </h2>
        <p className="font-inter text-foreground/70 max-w-2xl text-lg">
          Nosso portfólio não é uma vitrine de clientes, é um registro de hipóteses testadas. Veja o que estamos rodando nos bastidores.
        </p>
      </div>

      {/* O Grid Bento */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }} // Dispara a animação um pouco antes de aparecer na tela
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]"
      >
        {experimentos.map((projeto) => {
          const Icon = projeto.icon;
          const LogoComponent = projeto.logoComponent;

          return (
            <motion.div
              key={projeto.id}
              variants={cardVariants}
              className={`group relative flex flex-col justify-between p-8 rounded-3xl border border-borderUI bg-background hover:bg-foreground/[0.02] transition-colors overflow-hidden ${projeto.span}`}
            >
              {projeto.link && (
                <a
                  href={projeto.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label={`Abrir ${projeto.title}`}
                />
              )}

              {/* Header do Card (Status e Ícone) */}
              <div className="flex justify-between items-start mb-8">
                <span className="font-fira text-xs uppercase tracking-wider text-sandbox bg-sandbox/10 px-3 py-1 rounded-full">
                  [ status: {projeto.status} ]
                </span>
                {projeto.link && (
                  <button className="p-2 rounded-full bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-5 h-5 text-foreground" />
                  </button>
                )}
              </div>

              {/* Corpo do Card */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-foreground/5 border border-borderUI flex items-center justify-center p-1.5 flex-shrink-0">
                    {projeto.logo ? (
                      <Image
                        src={projeto.logo}
                        alt={`Logo do ${projeto.title}`}
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                      />
                    ) : LogoComponent ? (
                      <LogoComponent className="w-full h-auto text-foreground" />
                    ) : Icon ? (
                      <Icon className="w-5 h-5 text-foreground" />
                    ) : null}
                  </div>
                  <h3 className="font-poppins text-2xl font-semibold">
                    {projeto.title}
                  </h3>
                </div>
                <p className="font-inter text-foreground/70 mb-8 line-clamp-3">
                  {projeto.description}
                </p>
              </div>

              {/* Footer do Card (Stack) */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {projeto.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-fira text-xs text-foreground/50 border border-borderUI px-2 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
