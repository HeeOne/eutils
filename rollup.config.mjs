// 帮助 Rollup 查找外部模块
import { nodeResolve } from '@rollup/plugin-node-resolve'
// 将 CommonJS 模块转换为 ES6 模块
import commonjs from '@rollup/plugin-commonjs'
// 代码压缩
import terser from '@rollup/plugin-terser'
// Rollup 用于处理 TypeScript 的插件
import typescript from '@rollup/plugin-typescript'

// 公共插件配置
const commonPlugins = [nodeResolve({ extensions: ['.ts', '.js'] }), commonjs()]

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  // ESM 配置
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true,
      entryFileNames: '[name].mjs',
    },
    plugins: [
      ...commonPlugins,
      typescript({
        outDir: 'dist/esm', // 确保在 Rollup 的 dir 内
        declarationDir: 'dist/esm/types', // 声明文件目录
      }),
    ],
  },
  // CJS 配置
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      exports: 'named',
      entryFileNames: '[name].cjs',
    },
    plugins: [
      ...commonPlugins,
      typescript({
        outDir: 'dist/cjs', // 确保在 Rollup 的 dir 内
        declarationDir: 'dist/cjs/types',
      }),
    ],
  },
  // UMD 配置
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/umd', // 修改输出目录为 dist/umd
      format: 'umd',
      name: '$eutils',
      entryFileNames: 'eutils.min.js', // 直接生成在 umd 目录下
    },
    plugins: [
      ...commonPlugins,
      typescript({
        // UMD 无需 preserveModules，直接输出到文件
        declaration: false, // 可选：关闭声明文件生成
      }),
      terser(),
    ],
  },
]
