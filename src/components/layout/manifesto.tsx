"use client";

import { motion, Variants } from "framer-motion";
import { Hammer, LineChart, Lightbulb } from "lucide-react";

export function Manifesto() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const pilares = [
    {
      icon: <Hammer className="w-6 h-6 text-accent" />,
      title: "1. Construir (MVP)",
      desc: "Transformamos hipóteses em versões mínimas viáveis com o menor custo e tempo possíveis. Sem excessos, apenas o núcleo do produto."
    },
    {
      icon: <LineChart className="w-6 h-6 text-accent" />,
      title: "2. Medir (Dados)",
      desc: "Lançamos no mercado real. Coletamos métricas de uso, taxas de conversão e feedback genuíno de usuários reais, não apenas suposições."
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-accent" />,
      title: "3. Aprender (Iteração)",
      desc: "Analisamos os resultados. Se falhar, matamos a ideia rápido e passamos para a próxima. Se validar, escalamos a infraestrutura e o negócio."
    }
  ];

  return (
    <section id="manifesto" className="w-full bg-foreground/[0.02] border-y border-borderUI py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          {/* Lado Esquerdo: O Título e o Conceito */}
          <div className="flex flex-col gap-6">
            <motion.h2 variants={itemVariants} className="font-poppins text-3xl md:text-5xl font-bold tracking-tight">
              A cafeína da <br />
              <span className="text-accent">inovação ágil.</span>
            </motion.h2>
            
            <motion.div variants={itemVariants} className="font-fira text-sm text-foreground/50 border-l-2 border-accent pl-4 py-1">
              {`/* Diretriz Operacional v1.0 */`}
            </motion.div>

            <motion.p variants={itemVariants} className="font-inter text-foreground/80 text-lg leading-relaxed">
              O modelo tradicional de negócios é lento e caro. O Café Labs funciona como uma incubadora particular: um ambiente seguro para o erro e desenhado para o acerto rápido.
            </motion.p>
            
            <motion.p variants={itemVariants} className="font-inter text-foreground/80 text-lg leading-relaxed">
              Nós não criamos planos de negócios de 50 páginas. Nós criamos código, designs e protótipos físicos. Misturamos a energia acolhedora do café com o rigor técnico de um laboratório para descobrir o que realmente tem valor de mercado.
            </motion.p>
          </div>

          {/* Lado Direito: Os Pilares (Build, Measure, Learn) */}
          <div className="flex flex-col gap-8 lg:pt-8">
            {pilares.map((pilar, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex gap-5 group"
              >
                <div className="flex-shrink-0 mt-1 p-3 rounded-xl bg-background border border-borderUI group-hover:border-accent/50 transition-colors">
                  {pilar.icon}
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-xl mb-2">
                    {pilar.title}
                  </h3>
                  <p className="font-inter text-foreground/70 leading-relaxed">
                    {pilar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}