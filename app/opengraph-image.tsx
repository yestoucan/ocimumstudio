import { ImageResponse } from "next/og";

export const alt = "Ocimum Studio — Votre expertise en image, source de performance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#12201A",
          backgroundImage:
            "radial-gradient(ellipse 65% 60% at 18% 22%, rgba(61,122,95,0.40), transparent 62%)",
          color: "#F0EDE8",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top — mark + label */}
        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          <svg width="66" height="66" viewBox="0 0 200 200" fill="none">
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
            <path d="M 50 100 C 84 97 116 103 150 100" stroke="#6BAF8A" strokeWidth={7} strokeLinecap="round" />
          </svg>
          <span
            style={{
              fontSize: "22px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(240,237,232,0.60)",
            }}
          >
            Studio · Conseil &amp; Production
          </span>
        </div>

        {/* Center — headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "104px", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.02 }}>
            Ocimum Studio
          </span>
          <span
            style={{
              fontSize: "38px",
              color: "rgba(240,237,232,0.58)",
              marginTop: "26px",
              maxWidth: "860px",
              lineHeight: 1.25,
            }}
          >
            Votre expertise en image, source de performance.
          </span>
        </div>

        {/* Bottom — accent bar + domain */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ height: "4px", width: "132px", background: "#6BAF8A" }} />
          <span style={{ fontSize: "26px", color: "rgba(240,237,232,0.50)" }}>ocimumstudio.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
