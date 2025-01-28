import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
      "@assets": "/src/assets",
      "@hooks": "/src/hooks",
      "@components": "/src/components",
      "@apis": "/src/apis",
      "@pages": "/src/pages",
      "@utils": "/src/utils",
      "@styles": "/src/styles",
      "@layout": "/src/layout",
      "@contexts": "/src/contexts",
    },
  },
  server: {
    port: 5173,
  },
});
