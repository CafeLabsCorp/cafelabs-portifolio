export function Chemex({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* As Barras de Dados (Líquido Extraído) */}
      <rect x="42" y="62" width="16" height="5" rx="2" fill="#FF5411" />
      <rect x="37" y="70" width="26" height="5" rx="2" fill="#FF5411" />
      <rect x="32" y="78" width="36" height="5" rx="2" fill="#FF5411" />
      
      {/* Uma gota do filtro caindo (Processamento em tempo real) */}
      <circle cx="50" cy="38" r="3.5" fill="#FF5411" />

      {/* O Corpo de Vidro da Chemex */}
      <path 
        d="M 30 20 L 45 47 V 53 L 25 80 A 4 4 0 0 0 28 86 H 72 A 4 4 0 0 0 75 80 L 55 53 V 47 L 70 20" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinejoin="round" 
      />
      
      {/* O Bocal e o Anel Central */}
      <path 
        d="M 24 20 H 76" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round" 
      />
    </svg>
  );
}