export function Orbital({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* A Letra C (A órbita estrutural) */}
      <path 
        d="M 65 25 A 35 35 0 1 0 65 75" 
        stroke="currentColor" 
        strokeWidth="12" 
        strokeLinecap="round" 
      />
      
      {/* A Letra L (A execução saindo do laboratório) */}
      <path 
        d="M 45 40 V 75 H 85" 
        stroke="#FF5411" 
        strokeWidth="12" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}