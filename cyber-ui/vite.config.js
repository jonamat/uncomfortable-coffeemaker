import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ jsxRuntime: "classic" })],
  build: {
    target: "es2015",
    rollupOptions: {
      output: {
        chunkFileNames: "c-[name].[hash].js",
        entryFileNames: "e-[name].[hash].js",
        inlineDynamicImports: false,
        sourcemap: false,
        manualChunks: {
          "aw-a": ["@arwes/animation"],
          "aw-c": ["@arwes/core"],
          "aw-d": ["@arwes/design"],
          "aw-s": ["@arwes/sounds"],
          "em-c": ["@emotion/css"],
          "em-r": ["@emotion/react"],
          "anim": ["animejs"],
          "howl": ["howler"],
          "poli": ["polished"],
          "prty": ["prop-types"],
          "r": ["react"],
          "rdom": ["react-dom"],
        },
      },
    },
  },
});
