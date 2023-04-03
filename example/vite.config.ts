import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': {
            PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL),
        },
    },
});
