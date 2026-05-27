import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import path from 'path'
import pkg from './package.json' with { type: 'json' }

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    sourcemap: false,
    minify: 'esbuild',
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VConsoleExportLogsPlugin',
      formats: ['es', 'umd'],
      fileName: (format) =>
        format === 'es'
          ? 'vconsole-exportlog-plugin.es.js'
          : 'vconsole-exportlog-plugin.min.js',
    },
    rollupOptions: {
      output: {
        postBanner: [
          '/*!',
          ` * ${pkg.name} v${pkg.version} (${pkg.homepage})`,
          ` * Copyright ${new Date().getFullYear()}, ${pkg.author}`,
          ` * ${pkg.license} license`,
          ' */',
        ].join('\n'),
      },
    },
  },
})
