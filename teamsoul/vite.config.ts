import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
      src: "/src",
    },
  },
  server: {
    host: "0.0.0.0",
    port: 4000,
  },
});
