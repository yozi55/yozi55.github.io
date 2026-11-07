import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 使用相对路径，这样构建产物可以放在 GitHub Pages 的任意子目录下
  // （例如 https://username.github.io/repo-name/）而不会 404。
  base: "./",
});
