import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  sourcemap: false,
  bundle: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  noExternal: [],
})
