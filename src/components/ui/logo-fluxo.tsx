export function Fluxo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* A Letra C (A entrada de dados / Hipótese) */}
      <path 
        d="M 70 25 H 30 V 55 H 50" 
        stroke="currentColor" 
        strokeWidth="14" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* A Letra L (O processamento e o Produto Final) */}
      <path 
        d="M 50 55 V 85 H 85" 
        stroke="#FF5411" 
        strokeWidth="14" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}