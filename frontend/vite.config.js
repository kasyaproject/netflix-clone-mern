import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // untuk alias import agar tidak "../../../"
      "@": path.resolve(__dirname, "src"),
      "@mods": path.resolve(__dirname, "src/components/modules"),
      "@layouts": path.resolve(__dirname, "src/components/layouts"),
    },
  },
});
