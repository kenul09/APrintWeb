import Link from "next/link";

export default function NotFound() {
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
        404
      </h1>

      <p
        style={{
          marginTop: "24px",
          fontSize: "1.25rem",
          color: "var(--color-text-muted)",
          maxWidth: "480px",
        }}
      >
        We couldn&apos;t find the page you&apos;re looking for.
      </p>

      <Link
        href="/"
        className="btn-primary"
        style={{ marginTop: "40px" }}
      >
        Back to home
      </Link>
    </div>
  );
}
