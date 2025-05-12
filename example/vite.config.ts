import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            plugins: process.env.NODE_ENV !== 'production' ? [[
                '@swc/plugin-styled-components', {
                    'displayName': true,
                    'ssr': false
                }
            ]]: [],
        }),
        svgr(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
    build: {
        sourcemap: true,
    }
});
