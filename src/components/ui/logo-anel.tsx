export function Anel({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* O Loop de Testes/Desenvolvimento */}
      <circle 
        cx="50" cy="50" r="32" 
        stroke="currentColor" 
        strokeWidth="14" 
        strokeDasharray="160 50" 
        strokeLinecap="round" 
        transform="rotate(-45 50 50)" 
      />
      {/* O Produto Validado / O Ponto de Foco */}
      <circle 
        cx="72" cy="28" r="12" 
        fill="#FF5411" 
      />
    </svg>
  );
}