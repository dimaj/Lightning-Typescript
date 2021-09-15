const path = require('path');
const webpack = require('webpack');
// const { getIfUtils } = require('webpack-config-utils');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const pkg = require('./package.json');

module.exports = (env, args) => {
  if (!env) {
    env = {};
  }

  env = { ...env, version: pkg.version };

  const copyPluginOptions = {
    patterns: [
      {
        from: './node_modules/wpe-lightning-sdk/support/lib/lightning-inspect.js',
        to: 'lib'
      }
    ]
  };
  let config = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
      filename: 'main.bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    performance: {
      maxAssetSize: 1024000
    },
    resolve: {
      alias: {
        core: path.resolve(__dirname, 'src/core'),
        ui: path.resolve(__dirname, 'src/ui')
      },
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          // Run all TS/JS files through ESLint before transpiling, bundling, etc.
          test: /\.(ts|js)$/,
          enforce: 'pre',
          use: {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
              emitError: false
            }
          }
        },
        {
          // Use ts-loader instead of babel-loader to transpile everything.
          test: /\.(ts|js)$/,
          use: [
            'ts-loader',
            {
              loader: 'webpack-preprocessor-loader',
              options: {
                params: {
                  stage: env.stage
                }
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          VERSION: JSON.stringify(env.version)
        }
      }),
      new CopyPlugin(copyPluginOptions),
      new HtmlWebpackPlugin({
        inject: 'head',
        template: 'index.html',
        version: `${pkg.version}`
      })
    ]
  };

  if (env.dev) {
    var devServer = {
      contentBase: path.join(__dirname, `dist`),
      inline: false,
      watchContentBase: true,
      hot: true
    };
    config.plugins.push(
        // Inject lightning-inspect.js into index-d.html.
        new HtmlWebpackPlugin({
          inject: 'head',
          template: 'index.html',
          filename: 'index-d.html',
          useInspector: true
        })
      );
  
      config = {
        ...config,
        devtool: 'source-map-inline',
        devServer
      };  }

  return config;
};
