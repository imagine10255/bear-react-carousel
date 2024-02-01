import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            plugins: [[
                '@swc/plugin-styled-components', {
                    'displayName': true,
                    'ssr': false
                }
            ]],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
    define: {
        'process.env': {
            PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL),
        },
    },
    server: {
        host: true
    },
});
