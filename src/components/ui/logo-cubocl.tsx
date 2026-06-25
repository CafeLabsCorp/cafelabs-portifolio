export function CuboCL({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* A Letra C em perspectiva 3D Isométrica (Parede Esquerda do Cubo) */}
      <path 
        d="M 50 18 L 22 34 V 66 L 50 82" 
        stroke="currentColor" 
        strokeWidth="12" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* A Letra L em perspectiva 3D Isométrica (Eixo Central e Chão) */}
      <path 
        d="M 50 45 V 82 L 78 66" 
        stroke="#FF5411" 
        strokeWidth="12" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Ponto focal para equilibrar e formar a última "quina" imaginária do cubo */}
      <circle 
        cx="78" cy="34" r="6" 
        fill="#FF5411" 
      />
    </svg>
  );
}