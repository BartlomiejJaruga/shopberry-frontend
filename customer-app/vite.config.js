import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    server: {
        port: 7681,
    },
    resolve: {
        alias: {
            "@common": path.resolve(__dirname, "src/common"),
            "@enums": path.resolve(__dirname, "src/common/enums.js"),
            "@components": path.resolve(__dirname, "src/components"),
            "@pages": path.resolve(__dirname, "src/Pages"),
            "@slices": path.resolve(__dirname, "src/store/slices"),
            "@icons": path.resolve(__dirname, "src/assets/icons"),
            "@services": path.resolve(__dirname, "src/services"),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@common/variables" as *;`,
            },
        },
    },
});
