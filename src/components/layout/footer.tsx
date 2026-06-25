"use client";

import { Coffee, Copy, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const email = "contato@cafelabs.net";

  // Detecção de dispositivo rodando apenas no client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent || navigator.vendor;
      const mobileRegex = /android|ipad|iphone|ipod|windows phone/i;
      
      setIsMobile(mobileRegex.test(userAgent));
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Links dinâmicos
  const linkMobile = `mailto:${email}`;
  const linkDesktop = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

  return (
    <footer id="contato" className="w-full border-t border-borderUI bg-background pt-24 pb-8">
      <div className="max-w-6xl mx-auto px-6">

        {/* Call to Action Central */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="p-4 rounded-full bg-foreground/5 mb-6">
            <Coffee className="w-8 h-8 text-foreground" />
          </div>
          <h2 className="font-poppins text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Tem uma hipótese?
          </h2>
          <p className="font-inter text-foreground/70 text-lg max-w-xl mb-8">
            Vamos tomar um café, desenhar a arquitetura e construir o seu próximo MVP. A nossa máquina de testes nunca desliga.
          </p>

          {/* Botão Primário: Redirecionamento Dinâmico */}
          <a
            href={isMobile ? linkMobile : linkDesktop}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-poppins font-semibold hover:scale-105 transition-all"
          >
            {/* Imagem do SVG local carregada pelo Next.js */}
            <Image
              src="/gmail.svg"
              alt="Logo do Gmail"
              width={32}
              height={32}
              className="object-contain"
            />
            Iniciar Experimento
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Botão Secundário: Copiar para Área de Transferência */}
          <button
            onClick={handleCopyEmail}
            className="mt-6 flex items-center gap-2 text-sm font-inter text-foreground/60 hover:text-foreground transition-colors group"
          >
            {copied ? (
              <Check className="w-4 h-4 text-sandbox" />
            ) : (
              <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
            )}
            {copied ? (
              <span className="text-sandbox font-medium">E-mail copiado com sucesso!</span>
            ) : (
              "Usa outro provedor? Copiar e-mail"
            )}
          </button>
        </div>

        {/* Informações Finais e Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-borderUI gap-4">
          <div className="flex items-center gap-2 font-poppins font-semibold text-lg">
            Café Labs <span className="text-accent">.</span>
          </div>

          <div className="flex items-center gap-4 text-sm font-fira text-foreground/50">
            <Link href="https://cafelabs.net" className="hover:text-accent transition-colors">cafelabs.net</Link>
            <span>|</span>
            <Link href="https://cafelabs.net.br" className="hover:text-accent transition-colors">cafelabs.net.br</Link>
          </div>

          <div className="font-fira text-xs text-foreground/40 text-center md:text-right">
            © {new Date().getFullYear()} Desenvolvido no Café Labs. <br />
            Hospedado na Vercel.
          </div>
        </div>

      </div>
    </footer>
  );
}