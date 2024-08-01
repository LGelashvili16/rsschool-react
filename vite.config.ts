/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    coverage: {
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: ["node_modules", "dist"],
      // thresholds: {
      //   statements: 80,
      //   branches: 80,
      //   functions: 70,
      //   lines: 80,
      // },
    },
  },
});
