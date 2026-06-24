import { Coffee, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
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
          <a 
            href="mailto:contato@cafelabs.net" 
            className="group flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-poppins font-semibold hover:scale-105 transition-all"
          >
            Iniciar Experimento
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
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