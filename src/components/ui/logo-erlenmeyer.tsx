export function Erlenmeyer({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* 
        Líquido Digital (Os Dados/Servidores): 
        Três blocos empilhados formando o nível do "líquido" na cor da marca
      */}
      <rect x="28" y="72" width="44" height="10" rx="2" fill="#FF5411" />
      <rect x="35" y="58" width="30" height="10" rx="2" fill="#FF5411" />
      <rect x="42" y="44" width="16" height="10" rx="2" fill="#FF5411" />

      {/* 
        Contorno do Erlenmeyer: 
        Desenhado com linhas retas e duras. 
        stroke="currentColor" faz ele se adaptar ao Dark/Light mode automaticamente.
      */}
      <path 
        d="M38 16 h24 M42 16 v24 L16 82 a4 4 0 0 0 3 6 h62 a4 4 0 0 0 3 -6 L58 40 V16" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}