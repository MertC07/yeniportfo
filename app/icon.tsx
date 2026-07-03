import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Geometric favicon: editorial hairline + the brand's accent period. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0b",
          borderRadius: 14,
          padding: 13,
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 3,
              height: "100%",
              background: "#f2f0ea",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#ff4d00",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
