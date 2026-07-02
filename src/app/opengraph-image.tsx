import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/constants/site";

/**
 * Branded 1200×630 social share card, rendered from the brand's own serif so
 * shared links look composed rather than like a cropped photo. Generated at
 * build time; pages with a photographic OG image (salon/clinic) override it.
 */

export const alt = `${siteConfig.fullName} · ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [serifItalic, serifMedium] = await Promise.all([
    readFile(
      join(process.cwd(), "src/assets/fonts/cormorant-garamond-italic-400.ttf"),
    ),
    readFile(join(process.cwd(), "src/assets/fonts/cormorant-garamond-500.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1A1815 0%, #262019 100%)",
          fontFamily: "Cormorant",
        }}
      >
        {/* hairline frame */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: "1px solid rgba(217, 190, 150, 0.35)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: "#A99A86",
            }}
          >
            {siteConfig.tagline}
          </div>

          <div
            style={{
              marginTop: 26,
              fontSize: 118,
              fontStyle: "italic",
              lineHeight: 1,
              color: "#E8D3AD",
            }}
          >
            The Beauty Room
          </div>

          <div
            style={{
              marginTop: 22,
              fontSize: 40,
              fontStyle: "italic",
              color: "#C9A574",
            }}
          >
            by Nilu
          </div>

          {/* hairline divider */}
          <div
            style={{
              marginTop: 38,
              width: 340,
              height: 1,
              background:
                "linear-gradient(90deg, rgba(217,190,150,0) 0%, rgba(217,190,150,0.7) 50%, rgba(217,190,150,0) 100%)",
              display: "flex",
            }}
          />

          <div
            style={{
              marginTop: 30,
              fontSize: 20,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#9B8E79",
            }}
          >
            Est. 1998 · Ratnapura · Sri Lanka
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Cormorant",
          data: serifMedium,
          style: "normal",
          weight: 500,
        },
        {
          name: "Cormorant",
          data: serifItalic,
          style: "italic",
          weight: 400,
        },
      ],
    },
  );
}
