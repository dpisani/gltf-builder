import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';

import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    file: pkg.browser,
    output: {
      file: pkg.browser,
      format: 'umd'
    },
    name: 'gltf-builder',
    plugins: [
      resolve(),
      babel({
        exclude: ['node_modules/**']
      }),
      commonjs({
        namedExports: {
          'node_modules/lodash/lodash.js': [
            'cloneDeep',
            'pickBy',
            'isNil',
            'isArray',
            'isEmpty',
            'mapValues',
            'flatten'
          ]
        }
      })
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // the `targets` option which can specify `dest` and `format`)
  {
    input: 'src/index.js',
    external: ['ms'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      localResolve(),
      babel({
        exclude: ['node_modules/**']
      })
    ]
  }
];
