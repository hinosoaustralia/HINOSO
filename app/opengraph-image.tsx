import { ImageResponse } from "next/og";

// Social share card (link previews on iMessage, WhatsApp, X, Instagram, etc.)
export const runtime = "edge";
export const alt = "HINOSO — Recovery. Made Simple.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(60% 60% at 50% 45%, #16150F 0%, #0C0C0B 70%)",
          color: "#F8F7F3",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#8D9A88",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 14,
              color: "#9CAE95",
            }}
          >
            WEARABLE RECOVERY
          </div>
        </div>

        <div style={{ fontSize: 132, fontWeight: 700, letterSpacing: 4 }}>
          HINOSO
        </div>

        <div
          style={{
            fontSize: 46,
            color: "rgba(248,247,243,0.72)",
            marginTop: 18,
          }}
        >
          Recovery. Made Simple.
        </div>
      </div>
    ),
    { ...size }
  );
}
