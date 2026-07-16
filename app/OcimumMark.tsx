/* Ocimum Studio mark — viewfinder brackets framing two basil-leaf/aperture
   curves, with a single basil-green center vein (sole accent). */
export default function OcimumMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <g stroke="#F0EDE8" strokeWidth={7} strokeLinecap="square">
        <path d="M 14 46 L 14 14 L 46 14" />
        <path d="M 154 14 L 186 14 L 186 46" />
        <path d="M 186 154 L 186 186 L 154 186" />
        <path d="M 46 186 L 14 186 L 14 154" />
      </g>
      <g stroke="#F0EDE8" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M 46 100 C 74 63 126 63 154 100" />
        <path d="M 46 100 C 74 137 126 137 154 100" />
      </g>
      <path stroke="#6BAF8A" d="M 50 100 C 84 97 116 103 150 100" strokeWidth={7} strokeLinecap="round" />
    </svg>
  );
}
