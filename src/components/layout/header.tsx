"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "../ui/theme-toggle";
import { LanguageSwitcher } from "../ui/language-switcher";
import { Link } from "../../i18n/navigation";
import { useTheme } from "next-themes"; // Importante: adicionado para controlar o tema

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Header");

  // Hooks para controle seguro do tema
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita o erro de "Hydration Mismatch" do Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { name: t("navManifesto"), href: "#manifesto" },
    { name: t("navLaboratorio"), href: "#laboratorio" },
    { name: t("navSetores"), href: "#setores" },
  ];

  // Função para forçar o scroll suave sempre que o botão for clicado
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    setIsOpen(false); // Fecha o menu mobile se estiver aberto

    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);

    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
      // Atualiza a URL de forma silenciosa
      window.history.pushState(null, "", href);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 border-b border-borderUI bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          {/* Logo Condicional à Prova de Falhas */}
          <div className="relative w-15 h-15 flex-shrink-0 flex items-center justify-center">
            {mounted ? (
              <Image
                src={resolvedTheme === "dark" ? "/logo_dark.svg" : "/logo_light.svg"}
                alt={t("logoAlt")}
                width={55}
                height={55}
                priority
                className="object-contain"
              />
            ) : (
              // 3. Altere o placeholder para o mesmo tamanho para a tela não pular
              <div className="w-12 h-12 bg-transparent" />
            )}
          </div>

          <span className="font-poppins font-bold text-xl tracking-tight">Café Labs</span>
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-sm font-inter text-foreground/80 hover:text-accent transition-colors cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Ações Desktop & Toggle Mobile */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />

          <a
            href="#contato"
            onClick={(e) => handleScroll(e, "#contato")}
            className="hidden md:flex bg-foreground text-background font-poppins text-sm font-semibold px-5 py-2 rounded-full hover:scale-105 transition-transform cursor-pointer"
          >
            {t("cta")}
          </a>

          {/* Botão Hambúrguer */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={t("openMenu")}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Dropdown Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-borderUI shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-lg font-inter text-foreground/90 hover:text-accent cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px w-full bg-borderUI my-2" />
              <a
                href="#contato"
                onClick={(e) => handleScroll(e, "#contato")}
                className="flex items-center justify-center w-full bg-foreground text-background font-poppins text-base font-semibold px-5 py-4 rounded-full active:scale-95 transition-transform cursor-pointer"
              >
                {t("cta")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
