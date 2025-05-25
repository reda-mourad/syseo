import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/4DACTION": {
        changeOrigin: true,
        target: "http://172.31.144.1/",
      },
    },
  },
});
