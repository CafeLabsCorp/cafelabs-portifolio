"use client";

import { motion, Variants } from "framer-motion"; // <-- 1. Adicione o 'Variants' aqui
import { ArrowRight, Terminal } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function Hero() {
  const t = useTranslations("Hero");

  // 2. Adicione ': Variants' na frente das variáveis
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

  return (
    <section className="relative w-full min-h-dvh flex flex-col items-center justify-center pt-20 overflow-hidden">

      {/* Efeito visual de fundo (Glow sutil laranja) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/20 blur-[120px] rounded-full pointer-events-none -z-10 dark:bg-accent/10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center"
      >
        {/* Badge Tech (Status) */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-borderUI bg-foreground/5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sandbox opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sandbox"></span>
            </span>
            <span className="font-fira text-xs text-foreground/80 tracking-wide uppercase">
              {t("badge")}
            </span>
          </div>
        </motion.div>

        {/* Título Principal */}
        <motion.h1 variants={itemVariants} className="font-poppins text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
          {t("titleLine1")}<br className="hidden md:block" />
          <span className="text-accent"> {t("titleLine2")}</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p variants={itemVariants} className="font-inter text-lg md:text-xl text-foreground/70 max-w-2xl mb-10 leading-relaxed">
          {t.rich("subtitle", {
            strong: (chunks) => <strong className="text-foreground font-semibold">{chunks}</strong>,
          })}
        </motion.p>

        {/* Botões de Ação (CTAs) */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="#laboratorio"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-accent text-background rounded-full font-poppins font-semibold hover:opacity-90 hover:scale-105 transition-all"
          >
            {t("ctaPrimary")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="#manifesto"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border border-borderUI bg-transparent rounded-full font-poppins font-semibold hover:bg-foreground/5 transition-all"
          >
            <Terminal className="w-4 h-4 text-foreground/50 group-hover:text-foreground transition-colors" />
            {t("ctaSecondary")}
          </Link>
        </motion.div>
      </motion.div>

      <a
        href="#manifesto"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 font-fira text-xs uppercase tracking-wide text-foreground/50 transition-colors hover:text-foreground/80"
      >
        {t("scrollHint")}
        <ArrowRight
          className="h-4 w-4 rotate-90 motion-safe:animate-bounce"
          aria-hidden="true"
        />
      </a>
    </section>
  );
}
