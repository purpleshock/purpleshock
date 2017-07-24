const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
require('dotenv').config()

function extractEnv (envs) {
  return envs.reduce((ret, name) => {
    const value = process.env[name]
    if (value !== null && value !== undefined) {
      ret[`process.env.${name}`] = JSON.stringify(value)
    }
    return ret
  }, {})
}

module.exports = {
  webpack (config) {
    const definePlugin = new webpack.DefinePlugin(extractEnv([
      'NODE_ENV',
      'PORT',
      'AP',
      'CLIENT_MAX_AGE',
      'SECRET'
    ]))

    return webpackMerge(config, {
      plugins: [
        definePlugin
      ],
      module: {
        rules: [
          {
            test: /\.(css|scss)/,
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext]'
            }
          },
          {
            test: /\.css$/,
            loader: 'babel-loader!raw-loader'
          }
        ]
      }
    })
  }
}
