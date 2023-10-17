import { defineConfig } from "vite";
import stylelint from "vite-plugin-stylelint";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    react(),
    stylelint({
      fix: true,
    }),
    checker({
      typescript: true,
    }),
  ],
});
