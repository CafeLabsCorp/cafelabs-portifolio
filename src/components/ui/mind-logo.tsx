type MindLogoProps = {
  className?: string;
};

// Wordmark do mind (desenhado pelo Felipe): letras em currentColor pra
// herdar a cor do texto do card (e o tema claro/escuro junto), pontinho e
// detalhes em verde fixo — mesma lógica de cores usada no header do
// mind-landing (CafeLabsDev/mind-landing).
export function MindLogo({ className }: MindLogoProps) {
  return (
    <svg viewBox="0 0 2553 1724" className={className} role="img" aria-label="mind">
      <path
        fill="currentColor"
        d="M250 350.001V1724H0V350.001H250Z"
      />
      <path
        fill="currentColor"
        d="M1321 350.001V1724H1071V350.001H1321Z"
      />
      <path
        fill="currentColor"
        d="M1866 1724H1616L1666 1724V350.001H1866V1724Z"
      />
      <path fill="#3fb950" d="M1071 0H1321V250H1071V0Z" />
      <path
        fill="#3fb950"
        d="M1966 357.3C2297.78 405.933 2552.5 691.719 2552.5 1037C2552.5 1382.28 2297.78 1668.07 1966 1716.7V1462.38C2158.9 1416.98 2302.5 1243.76 2302.5 1037C2302.5 830.237 2158.9 657.015 1966 611.614V357.3Z"
      />
      <path
        fill="#3fb950"
        d="M971 1244.24L775.971 1715.08L775.775 1715H545.002L544.807 1715.08L350 1244.78V591.493L660.389 1340.84L971 590.956V1244.24Z"
      />
      <path
        fill="#3fb950"
        d="M1566 941.554V1594.84L1421 1244.78V591.493L1566 941.554Z"
      />
    </svg>
  );
}
