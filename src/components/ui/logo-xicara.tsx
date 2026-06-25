export function Xicara({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* 
        A "Fumaça" Tech:
        Forma o clássico Prompt e Cursor de um terminal (>_) 
        Usamos o Laranja Accent para mostrar onde está a "energia"
      */}
      <path 
        d="M31 16 L41 24 L31 32" 
        stroke="#FF5411" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <line 
        x1="45" y1="32" 
        x2="57" y2="32" 
        stroke="#FF5411" 
        strokeWidth="6" 
        strokeLinecap="round" 
      />

      {/* 
        Base da Xícara de Café:
        Design geométrico e minimalista.
        stroke="currentColor" adapta automaticamente ao Modo Claro/Escuro.
      */}
      <path 
        d="M19 46 v14 c0 14 10 24 22 24 c12 0 22 -10 22 -24 v-14 Z" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Alça da Xícara */}
      <path 
        d="M63 54 h8 c5.5 0 10 4.5 10 10 c0 5.5 -4.5 10 -10 10 h-8" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}
