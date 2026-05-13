import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        conditions: ['import', 'module', 'browser', 'default'],
    },
});
