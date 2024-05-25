'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

build.initialize(gulp);
// const proxy = require('http-proxy-middleware');

// const apiProxy = proxy('/_api', {
//   target: 'http://portal/sites/mech',
//   secure: false,
//   changeOrigin: true,
//   headers: {
//     'Authorization': 'Basic ' + Buffer.from('ipr-co\vradmin:پسورد').toString('base64')
//   }
// });

// module.exports = {
//   configureWebpack: function(config) {
//     config.devServer = {
//       proxy: {
//         '/_api': apiProxy
//       }
//     };
//   }
// };
