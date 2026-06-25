export function Grao({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        {/* Máscara: Onde for branco aparece, onde for preto recorta o fundo */}
        <mask id="codigo-cutout">
          <rect width="100" height="100" fill="white" />
          
          {/* Seta Esquerda < */}
          <polyline 
            points="33,38 20,50 33,62" 
            fill="none" 
            stroke="black" 
            strokeWidth="7" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          
          {/* Barra Central / */}
          <line 
            x1="56" y1="26" 
            x2="44" y2="74" 
            stroke="black" 
            strokeWidth="7" 
            strokeLinecap="round" 
          />
          
          {/* Seta Direita > */}
          <polyline 
            points="67,38 80,50 67,62" 
            fill="none" 
            stroke="black" 
            strokeWidth="7" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </mask>
      </defs>

      {/* Base do Grão de Café (Inclinado para dar movimento) */}
      <rect
        x="12"
        y="8"
        width="76"
        height="84"
        rx="38"
        fill="#FF5411"
        mask="url(#codigo-cutout)"
        transform="rotate(15 50 50)"
      />
    </svg>
  );
}