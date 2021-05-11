
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: { ie: 9, },
      ignoreBrowserslistConfig: true,
      useBuiltIns: false,
      modules: false,
      exclude: ['transform-typeof-symbol'],
    }],
    ['@babel/preset-react', {
      targets: 'last 2 versions, ie 11', modules: false
    }],
    ['@babel/preset-typescript']
  ],
  // plugins: [
  //   ['@babel/plugin-syntax-dynamic-import'],
  //   ['@babel/plugin-proposal-decorators', {legacy: true}],
  //   ['@babel/plugin-proposal-class-properties', {loose: true}]
  // ]
}