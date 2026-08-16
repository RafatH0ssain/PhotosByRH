import { ImageResponse } from "next/og";

/* Generated at build time, so there is no binary asset to keep in sync and no
   risk of the OG URL 404ing the way the old favicon reference did. */
export const alt         = "PhotosByRH — photography by Rafat Hossain";
export const size        = { width: 1200, height: 630 };
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
          justifyContent: "space-between",
          backgroundColor: "#000000",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "rgba(245,245,247,0.42)" }}>
          Wildlife · Sports · Brands · Pets · Film
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 800,
              letterSpacing: "-0.045em",
              color: "#f5f5f7",
              lineHeight: 1,
            }}
          >
            PHOTOSBYRH
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 30, color: "rgba(245,245,247,0.62)" }}>
            Chasing good light and honest moments.
          </div>
        </div>

        <div style={{ display: "flex", height: 3, width: 160, backgroundColor: "#0a84ff" }} />
      </div>
    ),
    size,
  );
}
