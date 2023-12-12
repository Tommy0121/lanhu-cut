import { OPEN_WINDOW_MESSAGE } from './utils/constants';

/*
 * @Date: 2023-12-04 11:07:59
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-12-11 21:04:42
 * @FilePath: /chrome-extension/src/background.ts
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message, 'asdfasdfffff');
  if (message.type === OPEN_WINDOW_MESSAGE) {
    // 尝试通过blob地址fetch文件
    chrome.windows.create({
      url: chrome.runtime.getURL(`./dist/index.html?choose=1&file=${message.file}`),
      type: 'popup',
      width: 600,
      height: 800,
    });
  }
});
