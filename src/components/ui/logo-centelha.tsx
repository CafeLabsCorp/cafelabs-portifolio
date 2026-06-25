export function Centelha({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Pilar Estrutural (Base do sistema) */}
      <path 
        d="M 25 15 L 50 40 L 25 65" 
        stroke="currentColor" 
        strokeWidth="16" 
        strokeLinecap="square" 
        strokeLinejoin="miter" 
      />
      {/* A Centelha / O Impulso Laranja */}
      <path 
        d="M 55 35 L 80 60 L 55 85" 
        stroke="#FF5411" 
        strokeWidth="16" 
        strokeLinecap="square" 
        strokeLinejoin="miter" 
      />
    </svg>
  );
}