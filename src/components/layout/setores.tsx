"use client";

import { motion, Variants } from "framer-motion";
import { Code2, ShoppingCart, Shirt, Megaphone } from "lucide-react";

const setoresData = [
  {
    icon: <Code2 className="w-8 h-8 mb-4 text-sandbox" />, // Usando o Verde Sandbox para Dev
    title: "Desenvolvimento (Dev)",
    focus: "Engenharia e Soluções Digitais",
    activities: [
      "Aplicações web e mobile",
      "Arquitetura de sistemas",
      "Automações e IA"
    ]
  },
  {
    icon: <ShoppingCart className="w-8 h-8 mb-4 text-accent" />, // Laranja para E-commerce
    title: "E-commerce",
    focus: "Validação e Conversão",
    activities: [
      "Plataformas de vendas",
      "UX em fluxos de compra",
      "Esteiras de produtos"
    ]
  },
  {
    icon: <Shirt className="w-8 h-8 mb-4 text-foreground/80" />, 
    title: "Produção de Moda",
    focus: "Design, Físico e Logística",
    activities: [
      "Estampas minimalistas",
      "Validação de fornecedores",
      "Marcas de vestuário"
    ]
  },
  {
    icon: <Megaphone className="w-8 h-8 mb-4 text-accent" />,
    title: "Marketing",
    focus: "Crescimento e Comunidade",
    activities: [
      "Tráfego orgânico e pago",
      "Campanhas experimentais",
      "Posicionamento de marca"
    ]
  }
];

export function Setores() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="setores" className="w-full bg-foreground/[0.02] border-t border-borderUI py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="font-poppins text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Nossa Infraestrutura.
          </h2>
          <p className="font-inter text-foreground/70 max-w-2xl mx-auto text-lg">
            Um ecossistema completo. Desenvolvemos, testamos e escalamos soluções abrangendo as quatro frentes cruciais do mercado atual.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {setoresData.map((setor, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              className="p-8 rounded-3xl border border-borderUI bg-background hover:border-accent/30 transition-colors"
            >
              {setor.icon}
              <h3 className="font-poppins text-2xl font-semibold mb-1">
                {setor.title}
              </h3>
              <p className="font-fira text-sm text-accent mb-6">
                // {setor.focus}
              </p>
              
              <ul className="space-y-3">
                {setor.activities.map((atividade, i) => (
                  <li key={i} className="flex items-center gap-3 font-inter text-foreground/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-borderUI" />
                    {atividade}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}