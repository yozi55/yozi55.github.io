import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#111114",
          soft: "#2b2b31",
          faint: "#6f6f78",
        },
        paper: "#fafafa",
        mist: "#f2f2f4",
        line: "#e6e6ea",
      },
      fontFamily: {
        display: [
          '"Noto Sans SC"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          "sans-serif",
        ],
        body: [
          '"Noto Sans SC"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          '"IBM Plex Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      letterSpacing: {
        tight2: "-0.035em",
      },
      maxWidth: {
        prose2: "68ch",
      },
      transitionTimingFunction: {
        glide: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
