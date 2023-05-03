import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import filesize from 'rollup-plugin-filesize';
import autoprefixer from 'autoprefixer';
// import svg from 'rollup-plugin-svg'
import alias from '@rollup/plugin-alias';
import image from '@rollup/plugin-image';
// import css from "rollup-plugin-import-css";
import path from 'path'

import pkg from './package.json';

const INPUT_FILE_PATH = 'src/index.js';
const OUTPUT_NAME = 'Example';

const GLOBALS = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
};

const PLUGINS = [
  postcss({
    extract: true,
    minimize: true,
    plugins: [
      autoprefixer,
    ],
  }),
  babel({
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
  }),
  resolve({
    browser: true,
    resolveOnly: [
      /^(?!react$)/,
      /^(?!react-dom$)/,
      /^(?!prop-types)/,
    ],
  }),
  commonjs(),
  filesize(),
  // svg(),
  // css(),
  image(),
  alias({
    entries: [
      { find:'@', replacement:path.resolve(__dirname, 'src/') }
    ]
  })
];

const EXTERNAL = [
  'react',
  'react-dom',
  'prop-types',
];

// https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
const CJS_AND_ES_EXTERNALS = EXTERNAL.concat(/@babel\/runtime/);

const OUTPUT_DATA = [
  {
    file: pkg.browser,
    format: 'umd',
  },
  {
    file: pkg.main,
    format: 'cjs',
  },
  {
    file: pkg.module,
    format: 'es',
  },
];



// const config = {
//   input: ["src/List/List01/index.jsx", "src/List/List05/index.jsx"],
//   output: [
//     {
//       dir: "lib",
//       format: "es",
//       sourcemap: true
//     }
//   ],
//   preserveModules: true,
//   plugins: PLUGINS,
// };


const config = OUTPUT_DATA.map(({ file, format }) => ({
  input: INPUT_FILE_PATH,
  output: {
    file,
    format,
    name: OUTPUT_NAME,
    globals: GLOBALS,
    exports: "named",
  },
  external: ['cjs', 'es'].includes(format) ? CJS_AND_ES_EXTERNALS : EXTERNAL,
  plugins: PLUGINS,
}));

export default config;
