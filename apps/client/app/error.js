"use client";

import { useEffect } from "react";

export default function Error({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        background: "var(--background)",
        minHeight: "60vh",
        color: "var(--foreground)",
        fontFamily: '"DM Sans", sans-serif',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
      `}</style>

      <h1
        className="display-text"
        style={{
          fontFamily: "Oswald, sans-serif",
          fontWeight: 500,
          lineHeight: 0.9,
          margin: 0,
          fontSize: "clamp(3rem, 8vw, 5rem)",
          background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Something went wrong
      </h1>

      <p
        style={{
          marginTop: "24px",
          fontSize: "1.25rem",
          color: "rgba(var(--ink-rgb),0.66)",
          maxWidth: "480px",
        }}
      >
        An unexpected error occurred. Please try again.
      </p>

      <button
        type="button"
        onClick={() => retry()}
        className="btn-primary"
        style={{
          marginTop: "40px",
          background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
          color: "#fff",
          padding: "16px 36px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: "1rem",
          fontFamily: '"DM Sans", sans-serif',
        }}
      >
        Try again
      </button>
    </div>
  );
}
