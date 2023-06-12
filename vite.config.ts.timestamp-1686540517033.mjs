// vite.config.ts
import { defineConfig } from "file:///Users/imagine/project/packages/bear-react-carousel/node_modules/vite/dist/node/index.js";
import react from "file:///Users/imagine/project/packages/bear-react-carousel/node_modules/@vitejs/plugin-react-swc/index.mjs";
import dts from "file:///Users/imagine/project/packages/bear-react-carousel/node_modules/vite-plugin-dts/dist/index.mjs";
import * as path from "node:path";
import { visualizer } from "file:///Users/imagine/project/packages/bear-react-carousel/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import eslint from "file:///Users/imagine/project/packages/bear-react-carousel/node_modules/vite-plugin-eslint/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/imagine/project/packages/bear-react-carousel";
var vite_config_default = defineConfig({
  plugins: [
    eslint(),
    react(),
    dts({
      insertTypesEntry: true
    }),
    visualizer()
  ],
  build: {
    minify: process.env.NODE_ENV === "production",
    sourcemap: process.env.NODE_ENV !== "production",
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      formats: ["es"],
      fileName: (format) => `bear-react-carousel.${format}.js`
    },
    cssTarget: "chrome61",
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaW1hZ2luZS9wcm9qZWN0L3BhY2thZ2VzL2JlYXItcmVhY3QtY2Fyb3VzZWxcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9pbWFnaW5lL3Byb2plY3QvcGFja2FnZXMvYmVhci1yZWFjdC1jYXJvdXNlbC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvaW1hZ2luZS9wcm9qZWN0L3BhY2thZ2VzL2JlYXItcmVhY3QtY2Fyb3VzZWwvdml0ZS5jb25maWcudHNcIjtpbXBvcnQge2RlZmluZUNvbmZpZ30gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7dmlzdWFsaXplcn0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJztcbmltcG9ydCBlc2xpbnQgZnJvbSAndml0ZS1wbHVnaW4tZXNsaW50JztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICBlc2xpbnQoKSxcbiAgICAgICAgcmVhY3QoKSxcbiAgICAgICAgZHRzKHtcbiAgICAgICAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICB2aXN1YWxpemVyKCkgYXMgUGx1Z2luLFxuICAgIF0sXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgbWluaWZ5OiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nLFxuICAgICAgICBzb3VyY2VtYXA6IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsXG4gICAgICAgIGxpYjoge1xuICAgICAgICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgICAgICAgIGZvcm1hdHM6IFsnZXMnXSxcbiAgICAgICAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgYmVhci1yZWFjdC1jYXJvdXNlbC4ke2Zvcm1hdH0uanNgLFxuICAgICAgICB9LFxuICAgICAgICBjc3NUYXJnZXQ6ICdjaHJvbWU2MScsXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICAgIGV4dGVybmFsOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxuICAgICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgICAgICAgICAgICByZWFjdDogJ1JlYWN0JyxcbiAgICAgICAgICAgICAgICAgICAgJ3JlYWN0LWRvbSc6ICdSZWFjdERPTScsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVSxTQUFRLG9CQUFtQjtBQUN0VyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxTQUFTO0FBQ2hCLFlBQVksVUFBVTtBQUN0QixTQUFRLGtCQUFpQjtBQUN6QixPQUFPLFlBQVk7QUFMbkIsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLE1BQ0Esa0JBQWtCO0FBQUEsSUFDdEIsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLEVBQ2Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILFFBQVEsUUFBUSxJQUFJLGFBQWE7QUFBQSxJQUNqQyxXQUFXLFFBQVEsSUFBSSxhQUFhO0FBQUEsSUFDcEMsS0FBSztBQUFBLE1BQ0QsT0FBWSxhQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUM3QyxTQUFTLENBQUMsSUFBSTtBQUFBLE1BQ2QsVUFBVSxDQUFDLFdBQVcsdUJBQXVCO0FBQUEsSUFDakQ7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNYLFVBQVUsQ0FBQyxTQUFTLFdBQVc7QUFBQSxNQUMvQixRQUFRO0FBQUEsUUFDSixTQUFTO0FBQUEsVUFDTCxPQUFPO0FBQUEsVUFDUCxhQUFhO0FBQUEsUUFDakI7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
