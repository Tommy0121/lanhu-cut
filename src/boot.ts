/*
 * @Date: 2023-10-27 16:30:56
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-11-14 16:10:48
 * @FilePath: /chrome-extension/src/boot.ts
 */
const script = document.createElement('script')
const src = chrome.runtime.getURL('./dist/inject.js')
script.src = src;
(document.head || document.documentElement).appendChild(script)
