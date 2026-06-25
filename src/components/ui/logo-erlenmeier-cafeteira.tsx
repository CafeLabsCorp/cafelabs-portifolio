export function ErlenmeierCafeteira({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* O Núcleo de Dados / O "Café" (Losango flutuante) */}
      <rect 
        x="42" y="52" 
        width="16" height="16" 
        rx="2"
        transform="rotate(45 50 60)" 
        fill="#FF5411" 
      />

      {/* O Corpo do Erlenmeyer */}
      <path 
        d="M 40 20 V 35 L 20 75 A 4 4 0 0 0 24 81 H 76 A 4 4 0 0 0 80 75 L 60 35 V 20" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinejoin="round" 
      />
      
      {/* A Borda Superior (Bocal) */}
      <path 
        d="M 34 20 H 66" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round" 
      />

      {/* A Alça da Chaleira de Café (A grande sacada) */}
      <path 
        d="M 65 45 C 88 45, 92 65, 75 65" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round" 
        fill="none" 
      />
    </svg>
  );
}
