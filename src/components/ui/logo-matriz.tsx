export function Matriz({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Camada 1: Estrutura Base */}
      <rect x="22" y="42" width="12" height="38" rx="6" fill="currentColor" />
      
      {/* Camada 2: Processamento Central */}
      <rect x="44" y="24" width="12" height="56" rx="6" fill="currentColor" />
      
      {/* Camada 3: A Faísca do Café (O Salto Exponencial) */}
      <rect x="66" y="34" width="12" height="46" rx="6" fill="#FF5411" />
    </svg>
  );
}