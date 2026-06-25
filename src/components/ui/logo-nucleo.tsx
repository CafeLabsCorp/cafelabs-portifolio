export function Nucleo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* O Combustível / O MVP (Esfera de energia central) */}
      <circle cx="50" cy="50" r="16" fill="#FF5411" />
      
      {/* A Infraestrutura (Hexágono delimitador do laboratório) */}
      <polygon 
        points="50,15 80,32 80,68 50,85 20,68 20,32" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinejoin="round" 
      />
      
      {/* A Arquitetura Interna 
        (A opacidade 0.35 cria a ilusão 3D espacial, como se a 
        estrutura estivesse abraçando a esfera de energia)
      */}
      <polyline 
        points="20,32 50,50 80,32" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        opacity="0.35"
      />
      <line 
        x1="50" y1="50" x2="50" y2="85" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round"
        opacity="0.35" 
      />
    </svg>
  );
}