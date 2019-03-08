import babel from 'rollup-plugin-babel'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      module: true,
      jsnext: true,
      main: true,
    }),
    commonjs(),
  ],
}
