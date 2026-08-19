"use client";

import Image from "next/image";
import { useState } from "react";

export default function PartnerLogo({ partner }) {
  const [broken, setBroken] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className="marquee-pill">
      <div className="marquee-logo-wrap">
        {loading && !broken && <div className="shimmer-load" />}
        {!broken && partner.logo ? (
          <Image
            src={partner.logo}
            alt={partner.name}
            fill
            sizes="85px"
            onLoad={() => setLoading(false)}
            onError={() => {
              setBroken(true);
              setLoading(false);
            }}
            style={{
              display: loading ? "none" : "block",
              objectFit: "contain",
              filter: "grayscale(100%) brightness(1.2)",
              transition: "0.4s",
            }}
          />
        ) : (
          <span className="marquee-fallback" style={{ color: partner.color }}>
            {partner.abbr}
          </span>
        )}
      </div>
      <span className="marquee-name">{partner.name}</span>
    </div>
  );
}
