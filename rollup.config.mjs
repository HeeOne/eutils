import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

const createConfig = (format) => ({
  input: 'src/index.ts',
  output: {
    file: `dist/${format}/index.js`, // 修复路径配置
    format,
    sourcemap: true,
    name: format === 'umd' ? '$eutils' : undefined,
    exports: 'named', // 推荐添加的配置
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      outputToFilesystem: true,
      compilerOptions: {
        declaration: false,
        // 关键修复：覆盖tsconfig中的declarationDir
        declarationDir: undefined,
        outDir: `dist/${format}`,
      },
    }),
    terser(),
  ],
})

export default [createConfig('cjs'), createConfig('esm'), createConfig('umd')]
