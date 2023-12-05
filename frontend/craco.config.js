/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.path.json');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@common': path.resolve(__dirname, 'src/common'),
      '@theme': path.resolve(__dirname, 'src/theme'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@abi': path.resolve(__dirname, 'src/abi'),
      '@caslConfig': path.resolve(__dirname, 'src/caslConfig'),
      '@mapdata': path.resolve(__dirname, 'src/mapdata'),
      '@models': path.resolve(__dirname, 'src/models'),
    },
  },
  jest: {
    configure: {
      preset: 'ts-jest',
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/src/',
      }),
    },
  },
  // devServer: (devServerConfig) => {
  //   devServerConfig.static = {
  //     // redirect: true,
  //     directory: path.join(__dirname, ""),
  //     publicPath: "",
  //   };

  //   return devServerConfig;
  // },
};
