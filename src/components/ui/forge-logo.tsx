type ForgeLogoProps = {
  className?: string;
};

// Ícone do Forge: hexágono âmbar fixo (cor de marca do orchestrator, igual
// usada em forge.cafelabs.net) cercado de pétalas em currentColor, pra
// herdar a cor do texto do card (e o tema claro/escuro junto) — mesma lógica
// já usada no MindLogo.
export function ForgeLogo({ className }: ForgeLogoProps) {
  return (
    <svg viewBox="0 0 1265 1394" className={className} role="img" aria-label="Forge">
      <path fill="#EFAC39" d="M660.036 253.414L1044.3 475.151V918.626L660.036 1140.36L275.774 918.626L275.774 475.151L660.036 253.414Z" />
      <path fill="#EFAC39" d="M961.782 110.633L1016.85 142.309V205.663L961.782 237.34L906.71 205.663V142.309L961.782 110.633Z" />
      <path fill="#EFAC39" d="M962.012 1156.31L1017.08 1187.99V1251.34L962.012 1283.02L906.94 1251.34V1187.99L962.012 1156.31Z" />
      <path fill="#EFAC39" d="M55.072 633.536L110.144 665.212V728.566L55.072 760.243L1.63513e-06 728.566L0 665.212L55.072 633.536Z" />
      <path fill="currentColor" d="M861.69 1277.63L660.036 1393.78L458.382 1277.63L458.381 1093.27L660.036 1209.64L861.69 1093.27V1277.63Z" />
      <path fill="currentColor" d="M215.774 953.276L416.803 1069.28L256.726 1161.48L55.072 1045.33L55.072 813.037L215.774 720.476V953.276Z" />
      <path fill="currentColor" d="M1265 813.037V1045.33L1063.35 1161.48L903.267 1069.28L1104.3 953.276V720.476L1265 813.037Z" />
      <path fill="currentColor" d="M416.803 324.497L215.774 440.501V673.301L55.072 580.74L55.072 348.444L256.726 232.296L416.803 324.497Z" />
      <path fill="currentColor" d="M1265 348.444V580.74L1104.3 673.301V440.501L903.267 324.496L1063.35 232.296L1265 348.444Z" />
      <path fill="currentColor" d="M861.69 116.148V300.504L660.036 184.141L458.381 300.504L458.382 116.148L660.036 0L861.69 116.148Z" />
    </svg>
  );
}
