// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import nodeBuiltins from 'rollup-plugin-node-builtins';
import nodeGlobals from 'rollup-plugin-node-globals';

export default {
  input: 'src/ldflex.js',
  output: {
    file: 'bundle.js',
    format: 'iife',
    name: 'MyModule',
  },
  
  plugins: [ nodeResolve({preferBuiltins:true}),commonjs(), nodePolyfills({browser:true}), nodeBuiltins(), nodeGlobals(),json()]
};



// external: [
//     'stream',
//     'http',
//     'url',
//     'punycode',
//     'https',
//     'zlib',
//     'fs',
//     'path',
//     'child_process',
//     'os',
//     'events',
//     'buffer',
//     'crypto',
//     'util',
//     'assert',
//     'querystring',
//     'v8',
//     'string_decoder/',
//     'cluster',
//     'string_decoder',
//     'tty',
//     'net'
//   ],

//   globals: {
//     'stream': 'Stream',
//     'http' : 'Http',
//     'url': 'Url',
//     'punycode': 'Punycode',
//     'https': 'Https',
//     'zlib': 'Zlib',
//     'fs': 'Fs',
//     'path': 'Path',
//     'child_process': 'ChildProcess',
//     'os':'Os',
//     'events':'Events',
//     'buffer':'Buffer',
//     'crypto':'Crypto',
//     'util':'Util',
//     'assert':'Assert',
//     'querystring':'Querystring',
//     'v8':'V8',
//     'string_decoder/':'StringDecoder/',
//     'cluster':'Cluster',
//     'string_decoder':'StringDecoder',
//     'tty':'Tty',
//     'net':'Net'
//   }