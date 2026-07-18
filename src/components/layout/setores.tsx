"use client";

import { motion, Variants } from "framer-motion";
import { Code2, ShoppingCart, Shirt, Megaphone } from "lucide-react";
import { useTranslations } from "next-intl";

const setoresData = [
  {
    icon: <Code2 className="w-8 h-8 mb-4 text-sandbox" />,
    titleKey: "devTitle",
    focusKey: "devFocus",
    activityKeys: ["devActivity1", "devActivity2", "devActivity3"],
    isLocked: false
  },
  {
    icon: <ShoppingCart className="w-8 h-8 mb-4 text-accent" />,
    titleKey: "ecommerceTitle",
    focusKey: "ecommerceFocus",
    activityKeys: ["ecommerceActivity1", "ecommerceActivity2", "ecommerceActivity3"],
    isLocked: true
  },
  {
    icon: <Shirt className="w-8 h-8 mb-4 text-foreground/80" />,
    titleKey: "modaTitle",
    focusKey: "modaFocus",
    activityKeys: ["modaActivity1", "modaActivity2", "modaActivity3"],
    isLocked: true
  },
  {
    icon: <Megaphone className="w-8 h-8 mb-4 text-accent" />,
    titleKey: "marketingTitle",
    focusKey: "marketingFocus",
    activityKeys: ["marketingActivity1", "marketingActivity2", "marketingActivity3"],
    isLocked: true
  }
] as const;

// Componente para animar os 3 pontinhos (...)
const AnimatedDots = () => {
  return (
    <span className="inline-flex w-4 ml-1 justify-between">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3, // Cada ponto acende com um pequeno atraso
          }}
        >
          .
        </motion.span>
      ))}
    </span>
  );
};

export function Setores() {
  const t = useTranslations("Setores");

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
            {t("heading")}
          </h2>
          <p className="font-inter text-foreground/70 max-w-2xl mx-auto text-lg">
            {t("description")}
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
              className="relative overflow-hidden p-8 rounded-3xl border border-borderUI bg-background"
            >
              {/* Se estiver bloqueado, aplicamos blur, reduzimos opacidade e travamos o clique */}
              <div className={`transition-all duration-300 ${setor.isLocked ? "blur-[6px] opacity-30 select-none pointer-events-none grayscale" : "hover:border-accent/30"}`}>
                {setor.icon}
                <h3 className="font-poppins text-2xl font-semibold mb-1">
                  {t(setor.titleKey)}
                </h3>
                <p className="font-fira text-sm text-accent mb-6">
                  // {t(setor.focusKey)}
                </p>

                <ul className="space-y-3">
                  {setor.activityKeys.map((activityKey) => (
                    <li key={activityKey} className="flex items-center gap-3 font-inter text-foreground/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-borderUI" />
                      {t(activityKey)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Overlay Flutuante (Aparece apenas nos cards bloqueados) */}
              {setor.isLocked && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-background/5">
                  <div className="flex items-center font-fira text-sm font-medium text-foreground bg-background border border-borderUI px-4 py-2 rounded-full shadow-xl">
                    <span className="text-accent mr-2">{"[ "}</span>
                    {t("inTest")} <AnimatedDots />
                    <span className="text-accent ml-2">{" ]"}</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
