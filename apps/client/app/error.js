"use client";

import { useEffect } from "react";

export default function Error({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        background: "var(--color-bg)",
        minHeight: "60vh",
        color: "var(--color-text)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px",
      }}
    >
      <h1
        className="display-text"
      >
        Something went wrong
      </h1>

      <p
        style={{
          marginTop: "24px",
          fontSize: "1.25rem",
          color: "var(--color-text-muted)",
          maxWidth: "480px",
        }}
      >
        An unexpected error occurred. Please try again.
      </p>

      <button
        type="button"
        onClick={() => retry()}
        className="btn-primary"
        style={{ marginTop: "40px" }}
      >
        Try again
      </button>
    </div>
  );
}
