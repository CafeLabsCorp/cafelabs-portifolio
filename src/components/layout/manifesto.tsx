"use client";

import { motion, Variants } from "framer-motion";
import { Hammer, LineChart, Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";

export function Manifesto() {
  const t = useTranslations("Manifesto");

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
      titleKey: "pilar1Title",
      descKey: "pilar1Desc",
    },
    {
      icon: <LineChart className="w-6 h-6 text-accent" />,
      titleKey: "pilar2Title",
      descKey: "pilar2Desc",
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-accent" />,
      titleKey: "pilar3Title",
      descKey: "pilar3Desc",
    }
  ] as const;

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
              {t("headingLine1")} <br />
              <span className="text-accent">{t("headingLine2")}</span>
            </motion.h2>

            <motion.div variants={itemVariants} className="font-fira text-sm text-foreground/50 border-l-2 border-accent pl-4 py-1">
              {t("directive")}
            </motion.div>

            <motion.p variants={itemVariants} className="font-inter text-foreground/80 text-lg leading-relaxed">
              {t("paragraph1")}
            </motion.p>

            <motion.p variants={itemVariants} className="font-inter text-foreground/80 text-lg leading-relaxed">
              {t("paragraph2")}
            </motion.p>
          </div>

          {/* Lado Direito: Os Pilares (Build, Measure, Learn) */}
          <div className="flex flex-col gap-8 lg:pt-8">
            {pilares.map((pilar) => (
              <motion.div
                key={pilar.titleKey}
                variants={itemVariants}
                className="flex gap-5 group"
              >
                <div className="flex-shrink-0 mt-1 p-3 rounded-xl bg-background border border-borderUI group-hover:border-accent/50 transition-colors">
                  {pilar.icon}
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-xl mb-2">
                    {t(pilar.titleKey)}
                  </h3>
                  <p className="font-inter text-foreground/70 leading-relaxed">
                    {t(pilar.descKey)}
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
