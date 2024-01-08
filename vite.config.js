import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 5173,
  },
  build: {
    chunkSizeWarningLimit: 2000, // set the limit to 2000 kBs
  },
});
