export const levelThemes = [
  {
    name: "Sentinel",
    // Deep teal cyber background
    bg: "radial-gradient(circle at top, #022c22 0%, #020617 55%, #020617 100%)",
    card: "#021b1b",
    accent: "#22c55e",
    text: "#e5f9f0",
    correct: "#4ade80",
    wrong: "#f97373",
    border: "rgba(34, 197, 94, 0.4)",
    colors: {
      bgLeft: "#021312",
      bgRight: "#020817",
      cardBg: "#021b1b",
      text: "#e5f9f0",
      accent: "#22c55e",
      accentAlt: "#34d399"
    }
  },

  // keep others if you want later levels
  {
    name: "Intermediate",
    bg: "radial-gradient(circle at top, #0f172a 0%, #020617 60%, #020617 100%)",
    card: "#0b1220",
    accent: "#0ea5e9",
    text: "#e5e7eb",
    correct: "#16a34a",
    wrong: "#dc2626",
    border: "rgba(148, 163, 184, 0.35)",
    colors: {
      bgLeft: "#020617",
      bgRight: "#020617",
      cardBg: "#0b1220",
      text: "#e5e7eb",
      accent: "#0ea5e9",
      accentAlt: "#38bdf8"
    }
  },
  {
    name: "Expert",
    bg: "radial-gradient(circle at top, #020617 0%, #020617 100%)",
    card: "#020617",
    accent: "#ec4899",
    text: "#e5e7eb",
    correct: "#16a34a",
    wrong: "#dc2626",
    border: "rgba(148, 163, 184, 0.35)",
    colors: {
      bgLeft: "#020617",
      bgRight: "#020617",
      cardBg: "#020617",
      text: "#e5e7eb",
      accent: "#ec4899",
      accentAlt: "#f472b6"
    }
  }
];

export const lightTheme = {
  name: "Light",
  bg: "linear-gradient(135deg, #fce7f3 0%, #ddd6fe 100%)",
  card: "rgba(255, 255, 255, 0.9)",
  accent: "#8b5cf6",
  text: "#1f2937",
  correct: "#10b981",
  wrong: "#ef4444",
  border: "rgba(139, 92, 246, 0.2)"
};
