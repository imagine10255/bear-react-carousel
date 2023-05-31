import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import * as path from 'node:path';
import {visualizer} from 'rollup-plugin-visualizer';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        eslint(),
        react({
            plugins: process.env.NODE_ENV !== 'production' ? [[
                "@swc/plugin-styled-components", {
                    "displayName": true,
                    "ssr": false
                }
            ]]: [],
        }),
        dts({
            insertTypesEntry: true,
        }),
        visualizer() as Plugin,
    ],
    build: {
        minify: false,
        sourcemap: process.env.NODE_ENV !== 'production',
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: (format) => `bear-react-carousel.${format}.js`,
        },
        cssTarget: 'chrome61',
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
});
