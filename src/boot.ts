import { OPEN_WINDOW_MESSAGE } from './utils/constants';

/*
 * @Date: 2023-10-27 16:30:56
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-12-04 11:30:09
 * @FilePath: /chrome-extension/src/boot.ts
 */
const script = document.createElement('script');
const src = chrome.runtime.getURL('./dist/inject.js');
script.src = src;
(document.head || document.documentElement).appendChild(script);

// 监听来自injected script的消息
window.addEventListener('message', (e) => {
  if (e.data.type === 'intercept file') {
    console.log(e, e.data, 'asdf');
    // content script 无法打开新窗口
    // 通知background 打开
    chrome.runtime.sendMessage({
      type: OPEN_WINDOW_MESSAGE,
      file: e.data.file,
    });
  }
});
