// Ocimum Studio — animated logo scene
// Viewfinder corners draw in like a camera racking focus, the aperture/leaf
// arcs trace themselves, the midrib accent snaps in with a brief focus-lock
// flash, then the wordmark settles in beside the mark.

function clamp01(v){ return Math.max(0, Math.min(1, v)); }
function mapClamp(p, a, b){ return clamp01((p - a) / (b - a)); }

const VARIANTS = {
  'Standard':     { markBox:180, cornerSize:56, wordFont:64, gap:40, showWord:true },
  'Sans texte':   { markBox:240, cornerSize:72, wordFont:0,  gap:0,  showWord:false },
  'Grand format': { markBox:280, cornerSize:84, wordFont:96, gap:56, showWord:true },
};

function OcimumLogoScene({ variant = 'Standard' }){
  const { progress } = window.useScene();
  const { Easing } = window;
  const p = progress;
  const cfg = VARIANTS[variant] || VARIANTS.Standard;
  const { markBox, cornerSize, wordFont, gap, showWord } = cfg;
  const inset = markBox - cornerSize;

  // ---- choreography windows (all in scene-progress space, 0..1) ----
  const cornersP  = Easing.easeOutCubic(mapClamp(p, 0.00, 0.26));
  const apertureP = Easing.easeOutCubic(mapClamp(p, 0.16, 0.44));
  const midribP   = Easing.easeOutCubic(mapClamp(p, 0.40, 0.55));

  // focus-lock flash: quick bell curve just after the midrib lands
  const flashRaw = mapClamp(p, 0.52, 0.60) * (1 - mapClamp(p, 0.60, 0.74));
  const flash = clamp01(flashRaw * 1.5);

  // wordmark: fades + slides in from the left of its resting position
  const wordT = Easing.easeOutCubic(mapClamp(p, 0.50, 0.80));
  const wordOpacity = wordT;
  const wordX = (1 - wordT) * 34;

  // whole lockup: very subtle settle-scale so the entrance reads as one piece
  const lockupT = Easing.easeOutCubic(mapClamp(p, 0.0, 0.30));
  const lockupScale = 0.965 + 0.035 * lockupT;

  const cream = '#F0EDE8';
  const green = '#6BAF8A';

  const corner = (transform) => (
    <div style={{ position:'absolute', width:cornerSize, height:cornerSize, transform }}>
      <svg width={cornerSize} height={cornerSize} viewBox="0 0 20 20" fill="none">
        <path
          d="M2 18 L2 2 L18 2"
          stroke={cream}
          strokeWidth="1.5"
          strokeLinecap="square"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - cornersP}
        />
      </svg>
    </div>
  );

  return (
    <div style={{
      position:'absolute', inset:0,
      display:'flex', alignItems:'center', justifyContent:'center',
      background:'#0D0F0D',
    }}>
      <div style={{
        position:'relative',
        display:'flex', alignItems:'center',
        justifyContent: showWord ? 'flex-start' : 'center',
        gap,
        transform:`scale(${lockupScale})`,
      }}>
        {/* viewfinder frame around the mark */}
        <div style={{ position:'relative', width:markBox, height:markBox, flexShrink:0 }}>
          {corner(`translate(0,0)`)}
          {corner(`translate(${inset}px,0) scaleX(-1)`)}
          {corner(`translate(${inset}px,${inset}px) scale(-1,-1)`)}
          {corner(`translate(0,${inset}px) scaleY(-1)`)}

          {/* aperture / leaf arcs */}
          <svg width={markBox} height={markBox} viewBox="0 0 200 200" fill="none"
               style={{ position:'absolute', top:0, left:0 }}>
            <path d="M 46 100 C 74 63 126 63 154 100"
                  stroke={cream} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
                  pathLength="1" strokeDasharray="1" strokeDashoffset={1 - apertureP} />
            <path d="M 46 100 C 74 137 126 137 154 100"
                  stroke={cream} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
                  pathLength="1" strokeDasharray="1" strokeDashoffset={1 - apertureP} />
            <path d="M 50 100 C 84 97 116 103 150 100"
                  stroke={green} strokeWidth="7" strokeLinecap="round"
                  pathLength="1" strokeDasharray="1" strokeDashoffset={1 - midribP} />
          </svg>

          {/* focus-lock flash */}
          <div style={{
            position:'absolute', inset:0,
            borderRadius:'50%',
            boxShadow: `0 0 ${18 * flash}px ${6 * flash}px rgba(107,175,138,${0.55 * flash})`,
            pointerEvents:'none',
          }} />
        </div>

        {/* wordmark */}
        {showWord && (
          <div style={{
            fontFamily:"'Syne', sans-serif",
            fontWeight:500,
            letterSpacing:'-0.03em',
            fontSize:wordFont,
            color:cream,
            whiteSpace:'nowrap',
            opacity:wordOpacity,
            transform:`translateX(${wordX}px)`,
          }}>
            Ocimum Studio
          </div>
        )}
      </div>
    </div>
  );
}

window.OcimumLogoScene = OcimumLogoScene;
