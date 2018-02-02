module.exports = {
  presets: [
    'es2015',
    'react',
    'stage-3'
  ],
  plugins: [
    ['transform-runtime'],
    'transform-object-rest-spread',
    'transform-object-assign',
    'add-module-exports',
    'transform-decorators-legacy',
    'transform-class-properties',
    ['import', { libraryName: 'antd', style: 'css' }]
  ]
};
