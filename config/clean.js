/*
 * @Date: 2023-11-14 16:10:59
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-11-14 17:06:13
 * @FilePath: /chrome-extension/config/clean.js
 */
// webpack dev server 有bug 当writeToDisk 为true时，output clean无效，手动在加载配置时删除dist文件夹
// 具体查看如下链接 https://github.com/webpack/webpack-dev-middleware/issues/861
const fs = require('fs')
const path = require('path')
const clean = () => {
    fs.rmSync(path.resolve(__dirname, '../dist'), { recursive: true, force: true })
}
module.exports = clean
