import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    srcDir: 'src',
    filename: 'sw.js',
    devOptions: {
      enabled: true,
      type: 'module',
    },
    strategies: 'injectManifest',
    injectManifest: {
      injectionPoint: undefined
    }
  }),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
