"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError("Mot de passe incorrect");
      }
    } catch {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center px-4"
      style={{ backgroundColor: "#0D0F0D" }}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl"
        style={{
          backgroundColor: "#11140F",
          border: "1px solid rgba(107,175,138,0.18)",
        }}
      >
        {/* ── Green gradient header ── */}
        <div
          className="relative px-8 pt-10 pb-14"
          style={{
            background:
              "linear-gradient(135deg, #3D7A5F 0%, #52977A 50%, #6BAF8A 100%)",
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -top-10 -right-10 h-40 w-40 rounded-full"
            style={{ background: "rgba(240,237,232,0.08)" }}
          />
          <div
            className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full"
            style={{ background: "rgba(240,237,232,0.06)" }}
          />
          <div
            className="absolute top-6 right-20 h-3 w-3 rounded-full"
            style={{ background: "rgba(240,237,232,0.2)" }}
          />

          {/* Badge */}
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase"
            style={{
              color: "#F0EDE8",
              backgroundColor: "rgba(240,237,232,0.15)",
              backdropFilter: "blur(4px)",
            }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{
                backgroundColor: "#F0EDE8",
                boxShadow: "0 0 6px #F0EDE8",
              }}
            />
            Bientôt disponible
          </div>

          <h2
            className="text-3xl leading-tight"
            style={{
              color: "#F0EDE8",
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
            }}
          >
            Ocimum Studio arrive bientôt
          </h2>
          <p
            className="mt-2 text-base leading-relaxed"
            style={{ color: "rgba(240,237,232,0.85)" }}
          >
            Vos informations prennent vie — une production portée par l&apos;IA.
          </p>
        </div>

        {/* ── Body ── */}
        <div className="relative px-8 pt-8 pb-8">
          {/* Overlap accent icon */}
          <div
            className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-xl shadow-lg"
            style={{ background: "linear-gradient(135deg, #3D7A5F, #6BAF8A)" }}
          >
            <svg
              className="h-5 w-5"
              style={{ color: "#F0EDE8" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>

          <p
            className="mt-4 text-sm leading-relaxed"
            style={{ color: "rgba(240,237,232,0.6)" }}
          >
            Entrez le mot de passe pour accéder à la prévisualisation du site.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full rounded-xl px-4 py-3 text-sm transition focus:outline-none"
              style={{
                border: "1px solid rgba(107,175,138,0.25)",
                color: "#F0EDE8",
                backgroundColor: "#0D0F0D",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#6BAF8A";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(107,175,138,0.15)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(107,175,138,0.25)";
                e.currentTarget.style.boxShadow = "none";
              }}
              autoFocus
            />

            {error && (
              <p className="text-sm font-medium" style={{ color: "#f87171" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
              style={{
                color: "#0D0F0D",
                background: "linear-gradient(135deg, #6BAF8A 0%, #3D7A5F 100%)",
                boxShadow: "0 4px 20px rgba(61,122,95,0.35)",
              }}
            >
              {loading ? (
                "Chargement..."
              ) : (
                <>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75"
                    />
                  </svg>
                  Accéder au site
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
