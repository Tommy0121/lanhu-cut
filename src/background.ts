import { OPEN_WINDOW_MESSAGE } from './utils/constants';

/*
 * @Date: 2023-12-04 11:07:59
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-12-04 14:02:24
 * @FilePath: /chrome-extension/src/background.ts
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message, 'asdfasdfffff');
  if (message.type === OPEN_WINDOW_MESSAGE) {
    chrome.windows.create({
      url: chrome.runtime.getURL('./dist/index.html?choose=1'),
      type: 'popup',
      width: 300,
      height: 200,
    });
  }
});
