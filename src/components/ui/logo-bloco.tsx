export function Bloco({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Face Esquerda (Infraestrutura) */}
      <polygon 
        points="50,55 15,35 15,75 50,95" 
        fill="currentColor" 
        opacity="0.8" 
      />
      {/* Face Direita (Infraestrutura - com sombra simulada) */}
      <polygon 
        points="50,55 85,35 85,75 50,95" 
        fill="currentColor" 
        opacity="0.3" 
      />
      {/* Face Superior (O Core / O "Café" / A Energia) */}
      <polygon 
        points="50,15 85,35 50,55 15,35" 
        fill="#FF5411" 
      />
    </svg>
  );
}