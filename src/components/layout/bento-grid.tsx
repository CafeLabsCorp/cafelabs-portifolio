"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Os dados dos seus MVPs (Isso facilita muito a manutenção no futuro)
const experimentos = [
  {
    id: 1,
    title: "Rotas Turismo",
    description: "Sistema de itinerários dinâmicos utilizando algoritmos de otimização de grafos para mobilidade urbana e turismo.",
    status: "validado",
    stack: ["Next.js", "Python", "Neo4j"],
    span: "md:col-span-2", // Ocupa duas colunas
  },
  {
    id: 2,
    title: "ClockIt",
    description: "Plataforma de monitoramento de tempo e gestão de produtividade para desenvolvedores e acadêmicos.",
    status: "beta",
    stack: ["React", "PostgreSQL"],
    span: "md:col-span-1", // Ocupa uma coluna
  },
  {
    id: 3,
    title: "Essencial Drop #01",
    description: "Teste de viabilidade, logística e fornecedores para marca própria de vestuário minimalista (Setor Moda).",
    status: "mvp_fisico",
    stack: ["Shopify", "Logística"],
    span: "md:col-span-1",
  },
  {
    id: 4,
    title: "Checkout Converter",
    description: "Validação de esteiras de produtos e otimização de conversão utilizando testes A/B em gateways de pagamento.",
    status: "coletando_dados",
    stack: ["Stripe", "Analytics"],
    span: "md:col-span-2",
  }
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
        {experimentos.map((projeto) => (
          <motion.div 
            key={projeto.id} 
            variants={cardVariants}
            className={`group relative flex flex-col justify-between p-8 rounded-3xl border border-borderUI bg-background hover:bg-foreground/[0.02] transition-colors overflow-hidden ${projeto.span}`}
          >
            {/* Header do Card (Status e Ícone) */}
            <div className="flex justify-between items-start mb-8">
              <span className="font-fira text-xs uppercase tracking-wider text-sandbox bg-sandbox/10 px-3 py-1 rounded-full">
                [ status: {projeto.status} ]
              </span>
              <button className="p-2 rounded-full bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                <ArrowUpRight className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Corpo do Card */}
            <div>
              <h3 className="font-poppins text-2xl font-semibold mb-3">
                {projeto.title}
              </h3>
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
        ))}
      </motion.div>
    </section>
  );
}