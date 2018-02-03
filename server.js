/**
 * @author zhuyaqin thea.zhu@foxmail.com
 */

const path = require('path');
const webpack = require('webpack'); // webpack核心
const express = require('express'); //
const proxyMiddleware = require('http-proxy-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware'); // 处理静态资源的middleware
const webpackHotMiddleware = require('webpack-hot-middleware'); // 实现浏览器的无刷新更新
// const open = require('open');
const config = require('./webpack.config.js'); // webpack的配置文件
const proxyOptions = require('./proxyOptions');

const port = 3200;
const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  noInfo: true,
  stats: 'errors-only'
}));

app.use(webpackHotMiddleware(compiler, {
  log: false,
  heartbeat: 2000
}));

app.use('/cddh/config', proxyMiddleware(proxyOptions.config));
app.use('/cddh/user', proxyMiddleware(proxyOptions.user));
app.use('/cddh/msg', proxyMiddleware(proxyOptions.msg));
app.use('/cddh/answer', proxyMiddleware(proxyOptions.answer));

app.get(/\.(png|jpg|gif)$/, (req, res) => {
  res.sendFile(path.join(__dirname, req.url));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// 启动服务
app.listen(port, () => {
  console.log(`启动服务：http://localhost:${port}`);
  // open('http://localhost:' + port);
});
