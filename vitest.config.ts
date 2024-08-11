/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    coverage: {
      include: ["src/**/*.test.{js,ts,jsx,tsx}"],
      exclude: ["node_modules", "dist"],
    },
  },
});
