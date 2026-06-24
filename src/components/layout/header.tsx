"use client";

import Link from "next/link";
import { FlaskConical, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "../ui/theme-toggle";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Manifesto", href: "#manifesto" },
    { name: "Laboratório", href: "#laboratorio" },
    { name: "Setores", href: "#setores" },
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
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <FlaskConical className="w-5 h-5 text-accent" />
          <span className="font-poppins font-bold text-lg tracking-tight">Café Labs</span>
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a 
              key={link.name} 
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
          <ThemeToggle />
          
          <a 
            href="#contato"
            onClick={(e) => handleScroll(e, "#contato")}
            className="hidden md:flex bg-foreground text-background font-poppins text-sm font-semibold px-5 py-2 rounded-full hover:scale-105 transition-transform cursor-pointer"
          >
            Tomar um Café
          </a>

          {/* Botão Hambúrguer */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir Menu"
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
                  key={link.name}
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
                Tomar um Café
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}