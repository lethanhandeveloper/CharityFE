/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.path.json');

module.exports = {
  webpack: {
    alias: {
      '@services': path.resolve(__dirname, 'src/services')
    }
  },
  jest: {
    configure: {
      preset: 'ts-jest',
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/src/'
      })
    }
  }
  // devServer: (devServerConfig) => {
  //   devServerConfig.static = {
  //     // redirect: true,
  //     directory: path.join(__dirname, ""),
  //     publicPath: "",
  //   };

  //   return devServerConfig;
  // },
};
